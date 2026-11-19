import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-KZ", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(price);
}

export function normalizeSearch(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replaceAll("ё", "е")
    .replaceAll("алое", "алоэ");
}
