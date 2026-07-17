export type ChooseUsConfig = {
  paragraph?: string;
  heading: string;

  cta: {
    label: string;
    href: string;
  };

  image: {
    src: string;
    alt: string;
  };

  benefits: string[];

  stats: {
    value: string;
    label: string;
  }[];
};