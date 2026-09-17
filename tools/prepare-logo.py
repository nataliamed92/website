#!/usr/bin/env python3
"""
Turn the client's logo into the brand assets the site uses.

Needs Pillow and numpy. On this machine the Homebrew python3 (3.14) has
neither; `/usr/bin/python3` has both:

    /usr/bin/python3 tools/prepare-logo.py

The supplied artwork is light beige line work on black. Two things follow:

  * The alpha channel can be recovered from luminance alone, which keeps every
    anti-aliased edge that a threshold or a colour key would destroy.
  * At #F5E0CC the artwork scores 1.08:1 against white, so it is invisible on
    the light theme. Colour is therefore re-applied rather than preserved: the
    same hue, darkened until it reads. That is a standard light-background
    logo variant, not a change to the mark.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "tools" / "logo-source.jpg"
OUT = ROOT / "public" / "brand"

# Measured off the source: a flat black ground, line work peaking at #F5E0CC.
GROUND = 6.0
NOISE_FLOOR = 0.12

# Row analysis of the source: the face sits above y=771, the type below y=821.
MARK_BOTTOM = 800

# Both cuts share the logo's own hue (29.3 degrees).
INK_ON_LIGHT = (0x70, 0x4C, 0x29)  # 7.7:1 on white
INK_ON_DARK = (0xED, 0xDA, 0xC8)   # for use over dark photography


def key_out_ground(img: Image.Image) -> np.ndarray:
    """Line work on a flat dark ground becomes a coverage map."""
    lum = np.asarray(img.convert("RGB"), dtype=np.float32).mean(axis=2)
    alpha = np.clip((lum - GROUND) / (255.0 - GROUND), 0, 1)
    alpha[alpha < NOISE_FLOOR] = 0.0
    return np.clip((alpha - NOISE_FLOOR) / (1.0 - NOISE_FLOOR), 0, 1)


def tint(alpha: np.ndarray, rgb: tuple[int, int, int]) -> Image.Image:
    out = np.zeros((*alpha.shape, 4), dtype=np.uint8)
    out[..., 0], out[..., 1], out[..., 2] = rgb
    out[..., 3] = (alpha * 255).round().astype(np.uint8)
    return Image.fromarray(out)


def tight_box(img: Image.Image, threshold: int = 25) -> tuple[int, int, int, int]:
    """
    Bounding box of the real line work.

    `Image.getbbox()` is useless here: the key leaves a few near-zero stray
    pixels at the edges, so it always returns the full frame.
    """
    a = np.asarray(img.split()[3])
    ys, xs = np.nonzero(a > threshold)
    if not len(xs):
        return (0, 0, img.width, img.height)
    return (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1)


def trim(img: Image.Image, pad: int = 10) -> Image.Image:
    x0, y0, x1, y1 = tight_box(img)
    return img.crop((max(x0 - pad, 0), max(y0 - pad, 0),
                     min(x1 + pad, img.width), min(y1 + pad, img.height)))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    alpha = key_out_ground(Image.open(SOURCE))

    for suffix, ink in (("", INK_ON_LIGHT), ("-on-dark", INK_ON_DARK)):
        full = tint(alpha, ink)
        trim(full).save(OUT / f"logo-lockup{suffix}.png")
        mark = trim(full.crop((0, 0, full.width, MARK_BOTTOM)))
        mark.save(OUT / f"logo-mark{suffix}.png")

        # The type block is emitted here rather than re-derived downstream:
        # the video used to crop it at a hard-coded y and silently kept a
        # fragment of the mark when the artwork changed.
        trim(full.crop((0, MARK_BOTTOM, full.width, full.height))).save(
            OUT / f"logo-type{suffix}.png"
        )

        # A navbar-sized cut.
        #
        # This mark is a tall hairline drawing. Handed to the browser at full
        # size and scaled down eight-fold into a header it disappears entirely:
        # the strokes land on a third of a pixel and average away to white.
        # So the reduction happens here instead, where it can be controlled -
        # thicken, resample with Lanczos, then pull the alpha curve up so the
        # surviving edges stay opaque rather than washing out.
        face = mark.crop(tight_box(mark))
        thick = Image.merge(
            "RGBA", (*face.split()[:3], face.split()[3].filter(ImageFilter.MaxFilter(5)))
        )
        h = 156  # 3x the largest size it is used at
        small = thick.resize(
            (max(round(face.width * h / face.height), 1), h), Image.LANCZOS
        )
        a = np.asarray(small.split()[3], dtype=np.float32) / 255.0
        a = np.clip(a ** 0.62 * 1.12, 0, 1)
        boosted = np.dstack([np.asarray(c) for c in small.split()[:3]]
                            + [(a * 255).round().astype(np.uint8)])
        Image.fromarray(boosted).save(OUT / f"logo-mark-sm{suffix}.png")

    # Favicon: the head cropped to fill its box, on the site's own white.
    mark = Image.open(OUT / "logo-mark.png")
    face = mark.crop(tight_box(mark))
    inner = round(512 * 0.86)
    scale = inner / max(face.width, face.height)
    face = face.resize((max(round(face.width * scale), 1),
                        max(round(face.height * scale), 1)), Image.LANCZOS)
    icon = Image.new("RGBA", (512, 512), (255, 255, 255, 255))
    icon.alpha_composite(face, ((512 - face.width) // 2, (512 - face.height) // 2))
    icon.convert("RGB").save(OUT / "icon.png")

    # Share card: the lockup centred on the site's own white.
    lockup = Image.open(OUT / "logo-lockup.png")
    og = Image.new("RGBA", (1200, 630), (255, 255, 255, 255))
    lh = 400
    lw = round(lockup.width * lh / lockup.height)
    og.alpha_composite(
        lockup.resize((lw, lh), Image.LANCZOS), ((1200 - lw) // 2, (630 - lh) // 2)
    )
    og.convert("RGB").save(OUT / "og.png")

    print("wrote:", ", ".join(sorted(p.name for p in OUT.glob("*.png"))))


if __name__ == "__main__":
    main()
