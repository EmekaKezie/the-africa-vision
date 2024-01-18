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

export function convertToCurrency(amount: number, currencyCode: string) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export function convertToReadableDate(date: string) {
  return new Date(date).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function convertToReadableTime(date: string) {
  return new Date(date).toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "numeric",
    //second: "2-digit",
    hour12: true,
  });
}

export function convertToPercentage(totalAmount: number, givenAmount: number) {
  const percentage = (totalAmount / givenAmount) * 100;
  return percentage;
}

export function getDateDifference(oldDate: string, newDate: string) {
  const toDateOldDate: any = new Date(oldDate);
  const toDateNewDate: any = new Date(newDate);

  const diff = toDateNewDate - toDateOldDate;

  const diffInMilliSeconds = diff;
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diff / (1000 * 60);
  const diffInHours = diff / (1000 * 60 * 60);
  const diffInDays = diff / (1000 * 60 * 60 * 24);

  return {
    diffInMilliSeconds,
    diffInSeconds,
    diffInMinutes,
    diffInHours,
    diffInDays,
  };
}

export const previewImage = (file: Blob) => {
  const url = URL.createObjectURL(file)
  return url
}
