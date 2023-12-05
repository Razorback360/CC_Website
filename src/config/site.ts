import { type SiteConfig } from "types";

export const siteConfig: SiteConfig = {
  name: "CC KFUPM",
  description:
    "A informative website for the Computer Club at King Fahd University of Petroleum and Minerals",
  url: "https://cc-kfupm.netlify.app/", // TODO change this to the actual url
  links: {
    whatsapp: "https://chat.whatsapp.com/ELV7zQL14wL6ItapCKOL8b",
    twitter: "https://twitter.com/kfupm_cc",
    linkedin: "https://linkedin.com/company/kfupmcclub/",
    youtube: "https://www.youtube.com/channel/UC53CPMNo35_d3q3QV7Hzu8w",
    github: "https://github.com/CCKFUPM/",
    email: "",
  },
};

// routes that should not have the header or footer
export const HeaderFooterExclusionRoutes = [
  "/auth/login",
  "/auth/register",
  "/dashboard",
  "/linktree",
];
