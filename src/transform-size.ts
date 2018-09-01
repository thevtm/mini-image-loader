import { SharpInstance } from "sharp";

import debug from "./debug";
import { IQueryString } from "./query-string";

export default function(image: SharpInstance, parsedQuery: IQueryString): void {
  if (parsedQuery.resize !== undefined) {
    const [width, height] = parseSize(parsedQuery.resize);
    debug("Resizing image. %o", { query: parsedQuery.resize, width, height });
    image.resize(width, height);
  }
}

function parseSize(size: string): [number?, number?] {
  const PATTERN = /^(\d*)x(\d*)$/;

  const match = PATTERN.exec(size);

  const parsedWidth = parseInt(match![1], 10);
  const width = isNaN(parsedWidth) ? undefined : parsedWidth;

  const parsedHeight = parseInt(match![2], 10);
  const height = isNaN(parsedHeight) ? undefined : parsedHeight;

  return [width, height];
}
