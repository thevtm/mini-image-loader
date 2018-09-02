import { SharpInstance } from "sharp";
import replaceExt from "replace-ext";

import debug from "./debug";
import { IQueryString } from "./query-string";

export default function(context: any, image: SharpInstance, parsedQuery: IQueryString) {

  // Format & Quality
  if (parsedQuery.format !== undefined) {
    debug("Changing the format. %o", { format: parsedQuery.format , quality: parsedQuery.quality});
    image.toFormat(parsedQuery.format, { quality: parsedQuery.quality });
    context.resourcePath = replaceExt(context.resourcePath, `.${parsedQuery.format}`);
  }
}
