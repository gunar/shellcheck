export function Narrow<T extends R, R = unknown>(
  value: R
): asserts value is T {}
