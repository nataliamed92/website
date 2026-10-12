#!/usr/bin/env python3
"""
Turn the client's logo into the brand assets the site uses.

Needs Pillow and numpy. On this machine the Homebrew python3 (3.14) has
neither; `/usr/bin/python3` has both:

    /usr/bin/python3 tools/prepare-logo.py

The artwork has arrived both ways round - light beige on black (Sept 2026),
then dark beige on white (Oct 2026, the cut that also adds «ΧΕΙΡΟΥΡΓΟΣ» to the
wordmark). Two things follow:

  * The alpha channel is recovered from luminance alone, which keeps every
    anti-aliased edge that a threshold or a colour key would destroy. Which
    end of the scale is the ground is read off the corners, so either cut of
    the artwork keys correctly without a flag.
  * Colour is re-applied rather than preserved, because neither supplied ink
    reads where it has to: the beige on black scored 1.08:1 against white, and
    the white-ground cut is a soft tan that washes out at navbar size. The hue
    is the logo's own throughout.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "tools" / "logo-source.jpg"
OUT = ROOT / "public" / "brand"

# How far from the ground a pixel must sit before it counts as ink at all.
NOISE_FLOOR = 0.12

# Both cuts share the logo's own hue (29.3 degrees).
#
# The mark was #704C29 (7.7:1 on white) until 2026-10-12, when the client asked
# for «μια πιο μπεζ απόχρωση στο καφέ». It now carries brand-500, the ramp's
# own decoration step - a real step beiger, and still 3.7:1 on white, which is
# the floor for a drawing this size. It is NOT a text colour and the ramp's
# darker steps still carry every word on the page.
INK_ON_LIGHT = (0xAE, 0x79, 0x47)  # 3.73:1 on white
INK_ON_DARK = (0xED, 0xDA, 0xC8)   # for use over dark photography


def key_out_ground(img: Image.Image) -> np.ndarray:
    """
    Line work on a flat ground becomes a coverage map.

    The ground is whichever end of the scale the four corners sit at, so this
    keys the light-on-black and the dark-on-white artwork alike. Inverting by
    hand each time the client sends a new cut is how a silently blank PNG ships.
    """
    lum = np.asarray(img.convert("RGB"), dtype=np.float32).mean(axis=2)
    corners = np.array([lum[0, 0], lum[0, -1], lum[-1, 0], lum[-1, -1]])
    ground = float(corners.mean())

    if ground > 127:  # dark line work on a light ground
        alpha = np.clip((ground - lum) / ground, 0, 1)
    else:
        alpha = np.clip((lum - ground) / (255.0 - ground), 0, 1)

    alpha[alpha < NOISE_FLOOR] = 0.0
    alpha = np.clip((alpha - NOISE_FLOOR) / (1.0 - NOISE_FLOOR), 0, 1)

    # Normalise so the densest stroke reaches full opacity. The white-ground
    # artwork is drawn in a soft tan that only ever gets two thirds of the way
    # to the ground, so without this every asset renders a third transparent
    # and the re-applied ink never achieves the contrast it was chosen for.
    # A high percentile rather than the max, so one stray dark pixel cannot
    # set the scale.
    peak = float(np.percentile(alpha[alpha > 0], 99.5))
    return np.clip(alpha / peak, 0, 1) if peak > 0 else alpha


def mark_bottom(alpha: np.ndarray) -> int:
    """
    The row that separates the face from the wordmark below it.

    Hard-coding it meant the type block silently kept a slice of the chin the
    first time the artwork changed size. Nor is it the widest empty band: in
    the 2026-10 artwork the air under the wordmark is within two pixels of the
    air under the face. What is unambiguous is the shape of the blocks - the
    mark is one tall drawing, every line of type is short - so the split is the
    first gap after a block taller than a fifth of the whole.
    """
    rows = alpha.sum(axis=1) > 1.5
    (filled,) = np.nonzero(rows)
    top, bottom = int(filled[0]), int(filled[-1])

    blocks, start = [], None
    for y in range(top, bottom + 2):
        filled_here = y <= bottom and rows[y]
        if filled_here and start is None:
            start = y
        elif not filled_here and start is not None:
            blocks.append((start, y))
            start = None

    tall = (bottom - top) // 5
    for (lo, hi), (next_lo, _) in zip(blocks, blocks[1:]):
        if hi - lo > tall:
            return (hi + next_lo) // 2

    raise SystemExit("no tall mark above the type - check the artwork")


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
    split = mark_bottom(alpha)
    print(f"mark/type split at y={split}")

    for suffix, ink in (("", INK_ON_LIGHT), ("-on-dark", INK_ON_DARK)):
        full = tint(alpha, ink)
        trim(full).save(OUT / f"logo-lockup{suffix}.png")
        mark = trim(full.crop((0, 0, full.width, split)))
        mark.save(OUT / f"logo-mark{suffix}.png")

        # The type block is emitted here rather than re-derived downstream:
        # the video used to crop it at a hard-coded y and silently kept a
        # fragment of the mark when the artwork changed.
        trim(full.crop((0, split, full.width, full.height))).save(
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
