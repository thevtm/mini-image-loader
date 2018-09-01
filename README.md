# mini-image-loader

Image processing loader for Webpack.

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

Adjust the lossless quality with the `quality` property.

**Param**: `enum`, one of `png`, `jpeg`, `tiff`, `webp`.

**Default**: keep original format.

```javascript
require("./duck.jpg?format=png");
require("./frog.png?format=webp");
```

### quality

Set quality for lossless compression (`jpeg` and `webp`).

**Param**: `integer`, between `1` and `100`.

**Default**: original or 80.

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
