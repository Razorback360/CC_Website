import { clsx, type ClassValue } from "clsx";
import { type NextRouter } from "next/router";
import { type CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleLocaleChange = async (
  router: NextRouter,
  locale: string,
) => {
  // console.log("handleLocaleChange", locale)
  await router.push(router.asPath, router.asPath, { locale });
  document.body.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
};

export const getNameInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean) // Filter out empty strings (in case of extra spaces)
    .map((word, index, arr) => {
      if (index === 0 || index === arr.length - 1) {
        return word.charAt(0).toUpperCase(); // Capitalize initials
      }
      return null;
    })
    .filter(Boolean) // Remove null values (non-initials)
    .join("");
};

export const rtlSafetyProps = (value: string) => {
  return {
    // set to rtl if the text contains ANY arabic chars (range: 0600-06FF)
    dir: value.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr",
    style: {
      textAlign: value.match(/[\u0600-\u06FF]/) ? "right" : "left",
    } as CSSProperties,
  };
};

// this function is used to format the bytes to a human readable format
export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal",
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}
