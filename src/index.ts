import sharp from "sharp";

import debug from "./debug";
import { parseQueryString } from "./query-string";
import transformSize from "./transform-size";
import transformFormat from "./transform-format";

// Read target file as a buffer instead of string
export const raw = true;

export default function(this: any, source: Buffer): void {
  // Flag as async
  const callback = this.async();

  // Flag as cacheable.
  if (this.cacheable !== undefined) {
    this.cacheable();
  }

  debug("Resource path: %o", this.resourcePath);
  debug("Resource query: %o", this.resourceQuery);

  const parsedQueryString = parseQueryString(this.resourceQuery);

  if (parsedQueryString instanceof Error) {
    return callback(parsedQueryString);
  }

  const img = sharp(source);

  transformSize(img, parsedQueryString);
  transformFormat(this, img, parsedQueryString);

  img.toBuffer()
    .then((buf) => {
      debug("Image loaded successfully.");
      callback(null, buf);
    })
    .catch((err) => {
      debug("Unable to load image!");
      callback(err);
    });
}
