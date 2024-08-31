import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstLetters(name: string) {
  return name
    .split(" ") // Split the string into an array of words
    .map((word) => word[0]) // Map each word to its first letter
    .join(""); // Join the first letters into a single string
}
