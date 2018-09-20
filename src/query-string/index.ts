import Ajv from "ajv";
import { parseQuery as luParseQuery } from "loader-utils";

import debug from "../debug";

import { schema } from "./schema";

export { QSCrop } from "./qs-crop";

export interface IQueryString {
  format?: string;
  quality?: number;
  lossless?: boolean;
  nearLossless?: boolean;

  resize?: string;
  crop?: string | boolean;

  tint?: string;
  greyscale?: boolean;
  grayscale?: boolean;

  blur?: number | boolean;
  gamma?: number | boolean;
  flip?: boolean;
  flop?: boolean;
}

const ajv = new Ajv({ allErrors: true, coerceTypes: true });
const validate = ajv.compile(schema);

export function parseQueryString(resourceQuery: string): IQueryString | Error {

  if (resourceQuery === "") {
    resourceQuery = "?";
  }

  const parsedQuery = luParseQuery(resourceQuery);
  debug("Parsed query string. %o", parsedQuery);

  const valid = validate(parsedQuery);

  if (!valid) {
    debug("Invalid query string %O", { parsedQuery, errors: validate.errors });
    return new Error(ajv.errorsText(validate.errors!, { dataVar: "QueryString" }));
  }

  debug("Valid query string %O", { parsedQuery });
  return parsedQuery as IQueryString;

}
