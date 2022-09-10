export function round(value, precision) {
  /**
 .. usage ...
 round(12345.6789, 2) // 12345.68
 round(12345.6789, 1) // 12345.7
 * 
 */

  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export function formatNutritionalValues(value) {
  return round(value, 1);
}
