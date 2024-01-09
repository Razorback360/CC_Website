/* eslint-disable import/no-anonymous-default-export */
// @ts-check

/**
 * @type {import('next-i18next').UserConfig}
 */
export default {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar"],
  },
  localePath: "./locales",

  reloadOnPrerender: process.env.NODE_ENV === "development",

  // https://www.i18next.com/overview/configuration-options#logging
  debug: process.env.NODE_ENV === "development",

  /**
   * @link https://github.com/i18next/next-i18next#6-advanced-configuration
   */
  // saveMissing: false,
  // strictMode: true,
  // serializeConfig: false,
  // react: {
  //   useSuspense: true,
  // },
};
