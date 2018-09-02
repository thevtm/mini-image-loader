import { SharpInstance } from "sharp";

import debug from "./debug";
import { IQueryString } from "./query-string";

export default function(image: SharpInstance, parsedQS: IQueryString) {

  // Tint
  if (parsedQS.tint !== undefined) {
    debug("Setting tint. %o", { tint: parsedQS.tint });
    // @ts-ignore
    image.tint(parsedQS.tint);
  }

}
