# recolor-img

Recolor an image (useful for coloring toolbar icon)

## Installation

```sh
yarn add recolor-img
```

## Usage

### Node.js

```js
import { recolorSVGString, recolorPNGImage } from 'recolor-img';
```

### Browser

```html
<script src="./node_modules/recolor-img/dist/main.js"></script>
<script>
  const { recolorPNGImage, recolorSVGString } = window.recolorImg;
</script>
```

### Example

```html
<script>
  const { recolorPNGImage, recolorSVGString } = window.recolorImg;
  // recolorPNGImage recolors image of the given <img> element with the specified color.
  recolorPNGImage(document.getElementById('png'), '#83c400');

  // recolorSVGString recolors the given SVG string with the specified color.
  const svg1 = `<svg>...</svg>`;
  document
    .getElementById('svg1')
    .setAttribute('src', recolorSVGString(svg1, '#83c400', true));
</script>
```
