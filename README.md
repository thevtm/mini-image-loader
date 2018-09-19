# mini-image-loader ![npm](https://img.shields.io/npm/v/mini-image-loader.svg?style=flat-square) ![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?longCache=true&style=flat-square)

Small image processing loader for Webpack.

## Usage

```javascript
const imagePath = require("./duck.png?resize=900x&format=jpeg&quality=80");
```

Webpack config:

```javascript
{
  module: {
    rules: [{
      test: /\.(png|jpe?g|tiff|webp)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]",
            outputPath: "img/"
          }
        },
        { loader: "mini-image-loader" },
      ]
    }]
  }
}
```

## Debugging

`DEBUG=mini-image-loader` enables verbose mode.

## API

### format

Force output to a given format.

Adjust the lossless compression quality with the `quality` property.

**Param**: `enum`, one of `png`, `jpeg`, `tiff`, `webp`.

```javascript
require("./duck.jpg?format=png");
require("./frog.png?format=webp");
```

### quality

Set quality for lossless compression (`jpeg` and `webp`).

**Param**: `integer`, between `1` and `100`.

```javascript
require("./frog.png?format=jpeg&quality=90");
```

### resize

Resize image to `width` x `height`.

**Param**: `string`, following the `WIDTHxHEIGHT` pattern.

Examples:

```javascript
require("./duck.png?resize=120x240");
require("./cats.jpg?resize=900x");
require("./frog.png?resize=x300");
```

### crop

Crop the resized image to the exact size specified by `resize`.

The experimental strategy-based approach resizes so one dimension is at its target length then repeatedly ranks edge regions, discarding the edge with the lowest score based on the selected strategy.

- **entropy**: focus on the region with the highest Shannon entropy.
- **attention**: focus on the region with the highest luminance frequency, colour saturation and presence of skin tones.

**Param**: `string`, `north`, `northeast`, `east`, `southeast`, `south`, `southwest`, `west`, `northwest`, `center`, `centre`, `entropy` or `attention`.

### gravity

Possible attributes of the optional sharp.gravity are north, northeast, east, southeast, south, southwest, west, northwest, center and centre.

### tint

Tint the image using the provided chroma while preserving the image luminance. An alpha channel may be present and will be unchanged by the operation.

**Param**: `string`, following the `rgb hex` format `#RRGGBB`.

Examples:

```javascript
require("./duck.png?tint=#BABACA");
```

### greyscale

Convert to 8-bit greyscale; 256 shades of grey. This is a linear operation. If the input image is in a non-linear colour space such as sRGB, use gamma with greyscale for the best results. By default the output image will be web-friendly sRGB and contain three (identical) color channels.

Examples:

```javascript
require("./duck.png?greyscale");
```

### grayscale

Alternative spelling of greyscale.

### blur

Blur the image.
When used without parameters, performs a fast, mild blur of the output image.
When a sigma is provided, performs a slower, more accurate Gaussian blur.

**Param**: `number?` a value between 0.3 and 1000 representing the sigma of the Gaussian mask, where sigma = 1 + radius / 2.

Examples:

```javascript
require("./duck.png?blur");
require("./cats.jpg?blur=1.2");
require("./frog.png?blur=200");
```

### gamma

Apply a gamma correction by reducing the encoding (darken) pre-resize at a factor of 1/gamma then increasing the encoding (brighten) post-resize at a factor of gamma. This can improve the perceived brightness of a resized image in non-linear colour spaces. JPEG and WebP input images will not take advantage of the shrink-on-load performance optimisation when applying a gamma correction.

**Param**: `number?`, between `1.0` and `3.0` (optional, default 2.2)

Examples:

```javascript
require("./duck.png?gamma");
require("./cats.jpg?gamma=1.2");
require("./frog.png?gamma=2.4");
```

### flip

Flip the image about the vertical Y axis.
The use of flip implies the removal of the EXIF Orientation tag, if any.

Examples:

```javascript
require("./duck.png?flip");
```

### flop

Flop the image about the horizontal X axis.
The use of flop implies the removal of the EXIF Orientation tag, if any.

Examples:

```javascript
require("./duck.png?flop");
```
