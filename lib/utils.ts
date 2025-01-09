import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
