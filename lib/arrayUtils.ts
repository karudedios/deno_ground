/**
 * Array.prototype.find with a fallback for default values.
 *
 * @param array - source array
 * @param predicate - predicate function
 * @param defaultValue - fallback default value
 */
export function findOrElse<T>(array: Array<T>, predicate: (x: T) => boolean, defaultValue: T) {
  return array.find(predicate) || defaultValue;
}
