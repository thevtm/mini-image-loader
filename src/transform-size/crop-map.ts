
import { strategy, gravity } from "sharp";

import { QSCrop } from "../query-string";

export const CROP_MAP = (() => {
  const m: { [key: string]: string | number } = {};

  m[QSCrop.Attention] = strategy.attention;
  m[QSCrop.Entropy] = strategy.entropy;

  m[QSCrop.Center] = gravity.center;
  m[QSCrop.Centre] = gravity.centre;
  m[QSCrop.North] = gravity.north;
  m[QSCrop.Northeast] = gravity.northeast;
  m[QSCrop.Northwest] = gravity.northwest;
  m[QSCrop.South] = gravity.south;
  m[QSCrop.Southeast] = gravity.southeast;
  m[QSCrop.Southwest] = gravity.southwest;
  m[QSCrop.East] = gravity.east;
  m[QSCrop.West] = gravity.west;

  return m;
})();
