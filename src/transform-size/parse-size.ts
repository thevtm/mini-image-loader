
export function parseSize(size: string): [number?, number?] {
  const PATTERN = /^(\d*)x(\d*)$/;

  const match = PATTERN.exec(size);

  const parsedWidth = parseInt(match![1], 10);
  const width = isNaN(parsedWidth) ? undefined : parsedWidth;

  const parsedHeight = parseInt(match![2], 10);
  const height = isNaN(parsedHeight) ? undefined : parsedHeight;

  return [width, height];
}
