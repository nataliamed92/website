#!/usr/bin/env python3
"""
Render the logo films.

The mark draws itself on. Rather than a wipe, the reveal follows a geodesic
distance measured *along the line work itself*: a breadth-first walk that starts
at the top of each stroke and spreads through the ink only. Revealing by that
distance makes the line appear to be drawn, and a brighter band at the leading
edge reads as the tip of the pen.

Both films start and end on black, so they loop seamlessly as a hero backdrop.
No photography is used: the frame holds the logo and nothing else.

    python3 tools/make-logo-video.py            # full resolution, all outputs
    python3 tools/make-logo-video.py --fast     # half resolution preview
"""

from __future__ import annotations

import argparse
import math
import subprocess
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "public" / "brand"
OUT = ROOT / "public" / "video"

FPS = 30
INK = np.array([8, 9, 10], dtype=np.float32) / 255.0
BONE = np.array([244, 241, 236], dtype=np.float32) / 255.0
SAND = np.array([201, 183, 149], dtype=np.float32) / 255.0


# ---------------------------------------------------------------- easing ----

def smoothstep(a: float, b: float, t: float) -> float:
    if b <= a:
        return 1.0 if t >= b else 0.0
    x = min(max((t - a) / (b - a), 0.0), 1.0)
    return x * x * (3 - 2 * x)


# ------------------------------------------------------- geodesic reveal ----

def stroke_distance(alpha: np.ndarray, threshold: int = 40) -> np.ndarray:
    """
    Distance travelled *through the ink* from the top of each stroke.

    A plain distance transform would leap across the gaps between strokes and
    reveal the drawing as a wipe. Walking only over ink keeps each stroke
    growing from its own starting point, the way a pen would lay it down.
    """
    mask = alpha > threshold
    h, w = mask.shape
    dist = np.full((h, w), -1.0, dtype=np.float32)

    seen = np.zeros((h, w), dtype=bool)
    neighbours = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
    diag = math.sqrt(2.0)

    ys, xs = np.nonzero(mask)
    order = np.argsort(ys, kind="stable")  # topmost pixels first
    for idx in order:
        sy, sx = int(ys[idx]), int(xs[idx])
        if seen[sy, sx]:
            continue

        # New stroke: this pixel is its highest point, so start the pen here.
        queue = deque([(sy, sx)])
        seen[sy, sx] = True
        dist[sy, sx] = 0.0
        while queue:
            y, x = queue.popleft()
            d = dist[y, x]
            for dy, dx in neighbours:
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True
                    dist[ny, nx] = d + (diag if dy and dx else 1.0)
                    queue.append((ny, nx))

    return dist


def build_reveal(mark: Image.Image, target_w: int) -> tuple[np.ndarray, np.ndarray]:
    """Return (alpha, normalised stroke distance) at the render size."""
    small_w = min(mark.width, 900)
    small = mark.resize(
        (small_w, max(round(mark.height * small_w / mark.width), 1)), Image.LANCZOS
    )
    d = stroke_distance(np.asarray(small.split()[3]))
    finite = d[d >= 0]
    d = np.where(d < 0, finite.max() if finite.size else 1.0, d)
    d = d / (finite.max() if finite.size else 1.0)

    target_h = max(round(mark.height * target_w / mark.width), 1)
    dist = np.asarray(
        Image.fromarray((d * 255).astype(np.uint8)).resize((target_w, target_h), Image.BILINEAR),
        dtype=np.float32,
    ) / 255.0
    alpha = np.asarray(
        mark.resize((target_w, target_h), Image.LANCZOS).split()[3], dtype=np.float32
    ) / 255.0
    return alpha, dist


# ------------------------------------------------------------ ingredients ----

def glow(w: int, h: int, cx: float, cy: float, rx: float, ry: float) -> np.ndarray:
    ys, xs = np.mgrid[0:h, 0:w]
    r = np.sqrt(((xs - cx) / rx) ** 2 + ((ys - cy) / ry) ** 2)
    return np.exp(-(r ** 2) * 1.6).astype(np.float32)[..., None]


def paste(canvas: np.ndarray, layer: np.ndarray, x: int, y: int) -> None:
    """Additive composite of an (h, w, 3) light layer at (x, y), clipped."""
    H, W = canvas.shape[:2]
    lh, lw = layer.shape[:2]
    x0, y0 = max(x, 0), max(y, 0)
    x1, y1 = min(x + lw, W), min(y + lh, H)
    if x1 <= x0 or y1 <= y0:
        return
    canvas[y0:y1, x0:x1] += layer[y0 - y:y1 - y, x0 - x:x1 - x]


# ------------------------------------------------------------------ render ---

def render(
    out_path: Path,
    w: int,
    h: int,
    duration: float,
    mark_frac: float,
    centre: tuple[float, float],
    with_type: bool,
    fast: bool,
) -> None:
    mark = Image.open(BRAND / "logo-mark.png").convert("RGBA")
    mark_w = max(int(w * mark_frac), 8)
    alpha, dist = build_reveal(mark, mark_w)
    mh, mw = alpha.shape

    type_img = None
    if with_type:
        lockup = Image.open(BRAND / "logo-lockup.png").convert("RGBA")
        block = lockup.crop((0, 305, lockup.width, lockup.height))
        block = block.crop(block.split()[3].getbbox())
        tw = max(int(w * mark_frac * 1.18), 8)
        type_img = block.resize((tw, max(round(block.height * tw / block.width), 1)), Image.LANCZOS)
        type_a = np.asarray(type_img.split()[3], dtype=np.float32) / 255.0

    gap = int(h * 0.05)
    total_h = mh + (gap + type_img.height if type_img else 0)
    mx = int(w * centre[0] - mw / 2)
    my = int(h * centre[1] - total_h / 2)

    # Timings. The pen finishes well before the hold so the frame can settle.
    DRAW_A, DRAW_B = 0.45, duration * 0.42
    TYPE_A, TYPE_B = DRAW_B - 0.35, DRAW_B + 0.95
    FADE_A, FADE_B = duration - 1.9, duration - 0.35

    ambient = glow(w, h, w * centre[0], h * centre[1], w * 0.55, h * 0.75)

    # A *static* dither, not moving grain. It breaks the banding that 8-bit
    # H.264 shows on these dark gradients, but because every frame carries the
    # identical pattern the encoder stores it once instead of re-encoding noise
    # 300 times. The site paints its own moving grain over the top anyway.
    dither = np.random.default_rng(11).normal(0.0, 1.0, (h, w, 1)).astype(np.float32) * 0.006

    frames = int(duration * FPS)
    proc = subprocess.Popen(
        [
            "ffmpeg", "-y", "-loglevel", "error",
            "-f", "rawvideo", "-pix_fmt", "rgb24",
            "-s", f"{w}x{h}", "-framerate", str(FPS),
            "-i", "pipe:0",
            "-c:v", "libx264", "-preset", "veryfast" if fast else "slow",
            "-crf", "23" if fast else "21",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart",
            str(out_path),
        ],
        stdin=subprocess.PIPE,
    )

    for i in range(frames):
        t = i / FPS
        canvas = np.tile(INK, (h, w, 1)).astype(np.float32)

        # The room light breathes very slightly through the whole loop.
        breathe = 0.5 + 0.5 * math.sin(2 * math.pi * t / duration - math.pi / 2)
        canvas += ambient * (0.055 + 0.02 * breathe) * SAND

        p = smoothstep(DRAW_A, DRAW_B, t)
        out_a = 1.0 - smoothstep(FADE_A, FADE_B, t)

        if p > 0.0 and out_a > 0.0:
            # Ink already laid down, with a soft leading edge.
            edge = 0.045
            drawn = np.clip((p - dist) / edge, 0.0, 1.0)
            lit = alpha * drawn * out_a
            layer = lit[..., None] * BONE

            # The pen tip: a brighter band riding the front of the stroke.
            if p < 1.0:
                tip = np.exp(-(((dist - p) / 0.03) ** 2))
                layer += (alpha * tip * out_a * 0.85)[..., None] * SAND

            paste(canvas, layer, mx, my)

        if type_img is not None:
            ta = smoothstep(TYPE_A, TYPE_B, t) * out_a
            if ta > 0.002:
                # The type arrives as a soft left-to-right wipe.
                wipe = np.clip(
                    (smoothstep(TYPE_A, TYPE_B, t) * 1.25
                     - np.linspace(0.0, 1.0, type_img.width, dtype=np.float32)[None, :]) / 0.22,
                    0.0, 1.0,
                )
                layer = (type_a * wipe * ta)[..., None] * BONE
                paste(canvas, layer, int(w * centre[0] - type_img.width / 2), my + mh + gap)

        canvas += dither
        canvas *= smoothstep(0.0, 0.4, t)

        proc.stdin.write((np.clip(canvas, 0, 1) * 255).astype(np.uint8).tobytes())

    proc.stdin.close()
    proc.wait()
    print(f"{out_path.name}  {w}x{h}  {frames}f  {out_path.stat().st_size/1024:.0f} KB")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--fast", action="store_true")
    args = ap.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    d = 2 if args.fast else 1

    # Hero backdrop: the mark only, held right of centre so the headline keeps
    # the left of the frame. Loops on black.
    render(OUT / "hero-16x9.mp4", 1920 // d, 1080 // d, 10.0, 0.34, (0.66, 0.50), False, args.fast)
    render(OUT / "hero-9x16.mp4", 1080 // d, 1920 // d, 10.0, 0.66, (0.50, 0.33), False, args.fast)

    # Standalone films, with the wordmark, for social.
    render(OUT / "logo-16x9.mp4", 1920 // d, 1080 // d, 8.0, 0.22, (0.50, 0.46), True, args.fast)
    render(OUT / "logo-9x16.mp4", 1080 // d, 1920 // d, 8.0, 0.46, (0.50, 0.44), True, args.fast)


if __name__ == "__main__":
    main()
