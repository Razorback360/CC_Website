export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  links: {
    whatsapp: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    github: string;
    email: string;
  };
};

export type Member = {
  id: number;
  name: string;
  img: string;
  position: string;
  major: string;
  team: string;
  status: boolean;
};
