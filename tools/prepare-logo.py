#!/usr/bin/env python3
"""
Turn the client's logo sheet into the brand assets the site uses.

The client sent one JPEG holding six logo concepts in a 3x2 grid. The chosen
concept is the bottom-middle tile: white line art on a flat #202020 ground.

Because the artwork is pure white line work on a flat dark ground, the alpha
channel can be recovered from luminance alone. That keeps every anti-aliased
edge, which a threshold or a colour key would destroy.

    python3 tools/prepare-logo.py
"""

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SHEET = ROOT / "tools" / "logo-source-sheet.jpg"
OUT = ROOT / "public" / "brand"

# The flat ground measured off the tile, and the floor below which everything
# is JPEG ringing rather than line work.
GROUND = 32.0
NOISE_FLOOR = 0.10

# Row analysis of the tile: the face mark sits above y=294, the type block
# below y=319.
MARK_BOTTOM = 300


def tile(sheet: Image.Image, col: int, row: int) -> Image.Image:
    w, h = sheet.width // 3, sheet.height // 2
    return sheet.crop((col * w, row * h, (col + 1) * w, (row + 1) * h))


def key_out_ground(img: Image.Image) -> Image.Image:
    """White line art on a flat dark ground becomes white on transparent."""
    lum = np.asarray(img.convert("RGB"), dtype=np.float32).mean(axis=2)
    alpha = np.clip((lum - GROUND) / (255.0 - GROUND), 0, 1)
    alpha[alpha < NOISE_FLOOR] = 0.0
    alpha = np.clip((alpha - NOISE_FLOOR) / (1.0 - NOISE_FLOOR), 0, 1)

    rgba = np.zeros((*lum.shape, 4), dtype=np.uint8)
    rgba[..., 0:3] = 255
    rgba[..., 3] = (alpha * 255).round().astype(np.uint8)
    return Image.fromarray(rgba)


def trim(img: Image.Image, pad: int = 8) -> Image.Image:
    box = img.split()[3].getbbox()
    if not box:
        return img
    return img.crop(
        (
            max(box[0] - pad, 0),
            max(box[1] - pad, 0),
            min(box[2] + pad, img.width),
            min(box[3] + pad, img.height),
        )
    )


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    sheet = Image.open(SHEET)

    chosen = tile(sheet, col=1, row=1)  # bottom middle
    keyed = key_out_ground(chosen)

    lockup = trim(keyed)
    mark = trim(keyed.crop((0, 0, keyed.width, MARK_BOTTOM)))

    lockup.save(OUT / "logo-lockup.png")
    mark.save(OUT / "logo-mark.png")

    # The favicon crops to the head so the profile fills the box. The mark is
    # hairline work and disappears at 32px if it keeps the lockup's margins.
    face = mark.crop(mark.split()[3].getbbox())
    inner = round(512 * 0.86)
    scale = inner / max(face.width, face.height)
    face = face.resize(
        (max(round(face.width * scale), 1), max(round(face.height * scale), 1)),
        Image.LANCZOS,
    )

    grounded = Image.new("RGBA", (512, 512), (8, 9, 10, 255))
    grounded.alpha_composite(
        face, ((512 - face.width) // 2, (512 - face.height) // 2)
    )
    grounded.convert("RGB").save(OUT / "icon.png")

    print(f"lockup {lockup.size}  mark {mark.size}  icon 512x512")


if __name__ == "__main__":
    main()
