import Ajv from "ajv";
import { parseQuery as luParseQuery } from "loader-utils";

import debug from "./debug";

export interface IQueryString {
  format?: string;
  quality?: number;

  resize?: string;

  gamma?: number | boolean;
}

const schema = {
  type: "object",
  additionalProperties: false,

  properties: {
    format: { type: "string", enum: ["png", "jpeg", "tiff", "webp"] },
    quality: { type: "number", minimum: 1, maximum: 100 },

    resize: { type: "string", pattern: "^\\d*x\\d*$" },

    gamma: {
      anyOf: [
        { const: true },
        { type: "number", minimum: 1.0, maximum: 3.0 },
      ],
    },
  },

  dependencies: {
    quality: {
      properties: {
        format: {
          oneOf: [
            { const: "jpeg" },
            { const: "webp" },
          ],
        },
      },
    },
  },
};

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
