import { type ClassValue, clsx } from "clsx";
import { type NextRouter } from "next/router";
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
