import { type ClassValue, clsx } from "clsx";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

extend([a11yPlugin]);

export const handleColorTextClass = (color: string) => {
  const luminance = colord(color).luminance();

  return luminance < 0.3 ? "white" : "black";
};
