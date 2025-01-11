import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  const today = new Date();
  if (date.getDate() === today.getDate()) {
    return "TODAY";
  }

  const formatted_date = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formatted_date;
};

export const formatNumber = (num: number) => {
  // format numbers to string as 1k, 1m, 1b
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const elapsedTimeInMilliseconds = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (elapsedTimeInMilliseconds < minute) {
    const seconds = Math.floor(elapsedTimeInMilliseconds / 1000);
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (elapsedTimeInMilliseconds < hour) {
    const minutes = Math.floor(elapsedTimeInMilliseconds / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (elapsedTimeInMilliseconds < day) {
    const hours = Math.floor(elapsedTimeInMilliseconds / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (elapsedTimeInMilliseconds < week) {
    const days = Math.floor(elapsedTimeInMilliseconds / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (elapsedTimeInMilliseconds < month) {
    const weeks = Math.floor(elapsedTimeInMilliseconds / week);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (elapsedTimeInMilliseconds < year) {
    const months = Math.floor(elapsedTimeInMilliseconds / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(elapsedTimeInMilliseconds / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
