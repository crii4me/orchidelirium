# Orchidelirium — a diary of orchids

A static, hand-built website about orchids, laid out like a ring-bound scrapbook. Each page is one diary entry on one topic.

## Pages

| File | Entry | About |
| --- | --- | --- |
| `index.html` | Cover | Contents, numbers, a card of facts you can flip |
| `anatomy.html` | 01 | The orchid blueprint — sepals, petals, lip, column, resupination, roots, growth habits, seed |
| `species.html` | 02 | Twelve genera to know by sight, the record-holders, and a genus comparison table |
| `care.html` | 03 | Light, water, humidity, feeding, potting, reblooming, and a troubleshooting table |
| `propagation.html` | 04 | Keikis, division, the fungus problem, flasking, cloning, and why not to collect from the wild |
| `history.html` | 05 | The name, salep, Victorian orchidelirium, Darwin's moth, vanilla and Edmond Albius |
| `glossary.html` | 06 | Searchable glossary of ~44 terms, reading list, places to visit |

## Look

Taken from the mood boards:

| Token | Value | Used for |
| --- | --- | --- |
| Cherry Blossom | `#f7cfe1` | Pantone 13-3207 — petals, tape, note cards |
| Laurel Green | `#97a97c` | Pantone 15-6313 — leaves, rules, accents |
| Paper | `#fbf7f1` | The sheet every page is printed on |
| Plum | `#a4577a` | Links, handwriting, callout numbers |

Typefaces are Google Fonts: **Cormorant Garamond** (display), **Karla** (body), **Caveat** (handwriting), **Courier Prime** (labels and margin text).

Collage furniture lives in the stylesheet as reusable pieces: `.tape`, `.photo`, `.swatch`, `.note`, `.torn`, `.margin-note`, `.rings`, `.plates`.

`.plates` holds two images side by side inside one taped frame — used for anatomy figure 1, which pairs the dissected photograph with the numbered diagram. It stacks below 700px, and below 430px the SVG's callout numbers are scaled up in user units so they stay legible on a phone.

## Running it

It is plain HTML, CSS and JavaScript — no build step, no dependencies. Double-clicking `index.html` works fine.

If you'd rather have it on `http://localhost:8123` (no Node or Python needed):

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File serve.ps1
```

## Structure

```
orchid/
  index.html … glossary.html    seven pages, flat, relative links
  serve.ps1                     optional local static server
  assets/
    css/style.css               all styling, tokens at the top
    js/main.js                  menu, scroll reveal, glossary filter, fact card
    img/*.svg                   hand-built vector orchids
    img/phal-*.jpg              photographs (supplied)
    img/cattleya_*.jpg
```

### Photographs

Photographs replace the drawn moth orchid and cattleya:

| File | Photo | Where | Treatment |
| --- | --- | --- | --- |
| `phal-pink.jpg` | deep pink on white | cover collage | cutout |
| `phal-blush.jpg` | pale blush on white | species field-guide card | cutout |
| `phal-green.jpg` | green on white | care page | cutout |
| `phal-blue.jpg` | blue on black | glossary | full-bleed |
| `cattleya_1.jpg` | pale rose on white | cover collage | cutout |
| `cattleya_2.jpg` | coral on black | history page | full-bleed |
| `cattleya_3.jpg` | magenta on white | species field-guide card | cutout |
| `cattleya_4.jpg` | rainbow on white | propagation page | cutout |
| `paphiopedilum_1.jpg` | pink slipper on black | cover collage | full-bleed |
| `paphiopedilum_2.jpg` | slipper on a windowsill | anatomy page | full-bleed |
| `paphiopedilum_3.jpg` | pink slipper on black | species field-guide card | full-bleed |
| `oncidium_1.jpg` | purple-edged star | cover collage | full-bleed |
| `oncidium_3.jpg` | magenta and cream | species field-guide card | full-bleed |
| `orchid_anatomy.jpg` | dissected moth orchid | anatomy figure 1, left plate | cutout |
| `vanilla_1.jpg` | the packaging vanilla flower | history page, paired with the drawing | cutout |
| `empty_2.jpg` | moth orchid spike with buds | propagation page, paired with the drawing | cutout |
| `oncidium_2.jpg` | spotted cattleya relative | species page, "A word about alliances" | cutout |

Tall photos in `--fill` frames carry an inline `object-position` so the crop
loses petal tips rather than the flower head.

"Cutout" uses `mix-blend-mode: multiply` (class `.photo__img--cutout` / `.card__fig--cutout`) so a white studio background drops away and the bloom sits directly on the paper. "Full-bleed" (`.photo__img--fill`) fills the frame with `object-fit: cover`, for shots whose background can't be dropped.

`phalaenopsis.svg` is kept as a spare and is no longer referenced.

## Notes

- The SVG illustrations are original drawings, so there are no licences to worry about. The supplied photographs are a different matter — check you have the right to publish them before the site goes anywhere public.
- **`empty_1.jpg` and `vanilla_2.jpg` are not used: both are watermarked stock previews** (Vecteezy and Adobe Stock respectively). They need licensed, unwatermarked copies before they can go on the site.
- Genus identification of the supplied photos is a best guess from the images. The `paphiopedilum_*` files look like *Phragmipedium*, and `oncidium_1/3` look like large-flowered Oncidium-alliance hybrids rather than true dancing ladies — the species page has been broadened to cover both rather than mislabelling them. `oncidium_2.jpg` looks like a *Cattleya* relative, so it illustrates the alliances section instead of the Oncidium card.
- `phalaenopsis.svg`, `cattleya.svg` and `oncidium.svg` are retained as spares. `oncidium.svg` is still in use on the propagation page because it draws pseudobulbs, which the caption there depends on and none of the photos show.
- Everything works without JavaScript; the JS only adds the mobile menu, reveal animation, glossary search and the flip-card.
- `prefers-reduced-motion` is respected throughout.
- The only external requests are the Google Fonts stylesheet and font files.
