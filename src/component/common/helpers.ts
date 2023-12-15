export function formatNumberWithSuffix(amount: number) {
  const billion = 1e9;
  const million = 1e6;
  const thousand = 1e3;

  if (Math.abs(amount) >= billion) {
    return (amount / billion).toFixed(1) + "B";
  } else if (Math.abs(amount) >= million) {
    return (amount / million).toFixed(1) + "M";
  } else if (Math.abs(amount) >= thousand) {
    return (amount / thousand).toFixed(1) + "K";
  } else {
    return amount.toString();
  }
}

export function convertToCurrencyShort(amount: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}
