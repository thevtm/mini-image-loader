import { SharpInstance } from "sharp";

import debug from "../debug";
import { IQueryString } from "../query-string";

import { CROP_MAP } from "./crop-map";
import { parseSize } from "./parse-size";

export default function(image: SharpInstance, parsedQS: IQueryString): void {

  // Resize
  if (parsedQS.resize !== undefined) {
    const [width, height] = parseSize(parsedQS.resize);
    debug("Resizing image. %o", { query: parsedQS.resize, width, height });
    image.resize(width, height);
  }

  // Crop
  if (parsedQS.crop !== undefined) {
    debug("Cropping. %o", { crop: parsedQS.crop });

    if (typeof parsedQS.crop === "string") {
      image.crop(CROP_MAP[parsedQS.crop]);

    } else if (parsedQS.crop === true) {
      image.crop();
    }
  }

}
