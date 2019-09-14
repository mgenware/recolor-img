import imgLoaded from 'imagesloaded';
import hex2rgb from 'hex-rgb';
import svgToMiniDataURI from 'mini-svg-data-uri';

function setColors(data: Uint8ClampedArray, rgba: number[]) {
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] || data[i + 1] || data[i + 2] || data[i + 3]) {
      data[i] = rgba[0];
      data[i + 1] = rgba[1];
      data[i + 2] = rgba[2];
      data[i + 3] = rgba[3];
    }
  }
}

export function recolorPNGImage(img: HTMLImageElement, colorHex: string) {
  if (!img || !colorHex) {
    return;
  }
  imgLoaded(img, () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    if (!context) {
      return;
    }
    context.drawImage(img, 0, 0);
    const imgData = context.getImageData(0, 0, img.width, img.height);

    const rgba = hex2rgb(colorHex, { format: 'array' });
    // Convert 0-1 alpha to 0-255 alpha
    rgba[3] *= 255;
    if (rgba[3] > 255) {
      rgba[2] = 255;
    }
    setColors(imgData.data, rgba);

    context.putImageData(imgData, 0, 0);
    img.src = canvas.toDataURL('image/png');
  });
}

export function recolorSVGString(
  svgSource: string,
  colorHex: string,
  toDataURI: boolean,
): string {
  if (!svgSource || !colorHex) {
    return '';
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgSource, 'image/svg+xml');

  const elements = doc.documentElement.getElementsByTagName('*');
  for (const element of [...elements]) {
    // fill defaults to black
    const fillValue = element.getAttribute('fill');
    if (fillValue !== 'none') {
      element.setAttribute('fill', colorHex);
    }
    // stroke defaults to none
    const strokeValue = element.getAttribute('stroke');
    if (strokeValue && strokeValue !== 'none') {
      element.setAttribute('fill', colorHex);
    }
  }
  if (!toDataURI) {
    return doc.documentElement.outerHTML;
  }

  return svgToMiniDataURI(doc.documentElement.outerHTML);
}
