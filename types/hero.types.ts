export type HeroContentConfig = {
  label: string;
  heading: string;
  headingHighlight: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
  };
};

export interface HeroContentAnimatedProps {
  label: string;
  heading: string;
  headingHighlight: string;
  description: string;
  cta: { href: string; label: string };
}

export interface HeroImageAnimatedProps {
  image: {
    src: string;
    alt: string;
  };
}
