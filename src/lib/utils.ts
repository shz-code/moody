import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const authCallbackLink = (link: string) => {
  return `auth-callback?origin=${link}`;
};
