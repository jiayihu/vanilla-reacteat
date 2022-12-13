export function toCurrency(value) {
  return value.toLocaleString(undefined, { style: 'currency', currency: 'EUR' });
}
