import { type FileWithPath } from "react-dropzone";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  links: {
    whatsapp: string;
    telegram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    github: string;
    email: string;
  };
};

export type FileWithPreview = FileWithPath & {
  preview: string;
};
