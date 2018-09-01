import { SharpInstance } from "sharp";

import debug from "./debug";
import { IQueryString } from "./query-string";

export default function(image: SharpInstance, parsedQS: IQueryString): void {
  if (parsedQS.gamma !== undefined) {
    debug("Applying gamma corretion. %o", { gamma: parsedQS.gamma });

    if (typeof(parsedQS.gamma) === "number") {
      image.gamma(parsedQS.gamma);
    } else {
      image.gamma();
    }
  }

  if (parsedQS.flip !== undefined) {
    debug("Flipping. %o", { flip: parsedQS.flip });
    image.flip();
  }

  if (parsedQS.flop !== undefined) {
    debug("Flopping. %o", { flop: parsedQS.flop });
    image.flop();
  }

}
