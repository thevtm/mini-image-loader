import { SharpInstance } from "sharp";

import debug from "./debug";
import { IQueryString } from "./query-string";

export default function(image: SharpInstance, parsedQS: IQueryString) {

  // Tint
  if (parsedQS.tint !== undefined) {
    debug("Setting tint. %o", { tint: parsedQS.tint });

    // @ts-ignore Type definitions are outdated
    image.tint(parsedQS.tint);
  }

  // Greyscale / Grayscale
  if (parsedQS.greyscale !== undefined || parsedQS.grayscale) {
    debug("Greyscaling. %o", { greyscale: parsedQS.greyscale, grayscale: parsedQS.greyscale });
    image.greyscale();
  }

}
