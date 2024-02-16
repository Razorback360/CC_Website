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
