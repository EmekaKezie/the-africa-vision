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
    return amount?.toString();
  }
}

export function convertToCurrency(amount: number, currencyCode: string) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export function convertToReadableDate(date: string) {
  if (date) {
    return new Date(date).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else {
    return "";
  }
}

export function convertToReadableTime(date: string) {
  return new Date(date).toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "numeric",
    //second: "2-digit",
    hour12: true,
  });
}

export function convertToPercentage(
  targetAmount: number,
  recievedAmount: number
) {
  if (targetAmount === 0 && recievedAmount === 0) {
    return 0;
  } else {
    const percentage = (recievedAmount /   targetAmount) * 100;
    return Number(percentage.toFixed(2));
  }
}

export function getCurrentDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  return formattedDate;
}

export function getDateDifference(lowerDate: string, higerDate: string) {
  const toDateLowerDate: any = new Date(lowerDate);
  const toDateHigerDate: any = new Date(higerDate);

  const diff = toDateHigerDate.getTime() - toDateLowerDate.getTime();

  const diffInMilliSeconds = Math.round(diff);
  const diffInSeconds = Math.round(diff / 1000);
  const diffInMinutes = Math.round(diff / (1000 * 60));
  const diffInHours = Math.round(diff / (1000 * 60 * 60));
  const diffInDays = Math.round(diff / (1000 * 60 * 60 * 24));

  return {
    diffInMilliSeconds,
    diffInSeconds,
    diffInMinutes,
    diffInHours,
    diffInDays,
  };
}

export const previewImage = (file: Blob) => {
  const url = URL.createObjectURL(file);
  return url;
};

export const getFileBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
};

export const statusHandler = (status: string) => {
  let backgroundColor = "";
  let color = "";

  switch (status) {
    case "approved":
      backgroundColor = "#4FBF26";
      color = "#FFFFFF";
      break;
    case "completed":
      backgroundColor = "#4FBF26";
      color = "#FFFFFF";
      break;
    case "paid":
      backgroundColor = "#4FBF26";
      color = "#FFFFFF";
      break;
    case "declined":
      backgroundColor = "#ed5249";
      color = "#FFFFFF";
      break;
    case "failed":
      backgroundColor = "#ed5249";
      color = "#FFFFFF";
      break;
    case "notfound":
      backgroundColor = "#ed5249";
      color = "#FFFFFF";
      break;
    case "pending":
      backgroundColor = "#FFBF00";
      color = "#000000";
      break;
  }

  return { backgroundColor, color };
};

export const generateRandomNumber = (length: number) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
