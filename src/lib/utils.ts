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
