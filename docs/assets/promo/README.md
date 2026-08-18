# Promo band sources

The originals behind `public/promo/`. **Nothing in this folder is served** — it sits under `docs/` precisely so it does not reach the build. Between them these two PNGs are 7.4 MB; the JPEG the site actually ships is 327 KB.

| File | | |
| --- | --- | --- |
| `small-forest.png` | 2878×961 | The original photograph. Source of the shipped image. |
| `small-forest-deer.png` | 1725×539 | A pre-cropped banner version of the same scene. Not used — kept because its deer is noticeably larger, which is the better starting point if the band ever gets shorter. |

## How `public/promo/small-forest.jpg` was derived

From `small-forest.png`, in three steps:

1. **Cut to the left 1650 columns** of 2878. This is the framing decision, and it is a property of the file rather than of any CSS: the band is far wider than it is tall, so `object-fit: cover` scales the photo to the band's *width* and crops it vertically only — the horizontal half of `object-position` does nothing at any viewport the block is used at. Cutting the right side is therefore the only way to move the subject rightward. 1650 is the column where the composition ends on lit foliage instead of on a trunk, and it puts the deer at about 87% of what remains.
2. **Brightness lift**, `output = input × 1.14 + 0.05` on each channel. The original is a dark, moody frame; the band is supposed to read bright.
3. **JPEG at quality 80.** Lossless is the wrong format for a photograph — the untouched PNG is thirteen times the size for no visible gain, and `test/promo.test.ts` fails the build on any promo image that is lossless or over 600 KB.

Vertical framing is *not* baked in: `object-position: center 88%` in `AppPromoBanner.vue` picks the horizontal slice, so the full 961px of height stays available and the band can change height without a re-export.

Steps 1 and 2 were done with .NET's `System.Drawing` through PowerShell, because this machine has no ImageMagick. Any editor does the same job — the numbers above are the whole recipe.
