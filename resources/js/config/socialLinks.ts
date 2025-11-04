import { Github, Linkedin } from 'lucide-react';

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  ariaLabel: string;
  external?: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/AlbinXXX',
    icon: Github,
    ariaLabel: 'Visit my GitHub profile',
    external: true
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/albin-rushiti/',
    icon: Linkedin,
    ariaLabel: 'Connect with me on LinkedIn',
    external: true
  }
];

export default socialLinks;