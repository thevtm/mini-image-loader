
import { QSCrop } from "./qs-crop";

export const schema = {
  type: "object",
  additionalProperties: false,

  properties: {
    format: { type: "string", enum: ["png", "jpeg", "tiff", "webp"] },
    quality: { type: "number", minimum: 1, maximum: 100 },
    lossless: { const: true },
    nearLossless: { const: true },

    resize: { type: "string", pattern: "^\\d*x\\d*$" },
    crop: {
      anyOf: [
        { const: true },
        {
          type: "string",

          // @ts-ignore
          enum: Object.keys(QSCrop).map((k: string) => QSCrop[k]),
        },
      ],
    },

    tint: { type: "string", pattern: "^#[a-fA-F0-9]{6}$" },
    greyscale: { const: true },
    grayscale: { const: true },

    blur: {
      anyOf: [
        { const: true },
        { type: "number", minimum: 0.3, maximum: 1000 },
      ],
    },
    gamma: {
      anyOf: [
        { const: true },
        { type: "number", minimum: 1.0, maximum: 3.0 },
      ],
    },
    flip: { const: true },
    flop: { const: true },
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

    lossless: {
      properties: {
        format: { const: "webp" },
      },
    },

    nearLossless: {
      properties: {
        format: { const: "webp" },
      },
    },

    crop: {
      properties: {
        resize: { $ref: "#/properties/resize" },
      },
    },
  },
};
