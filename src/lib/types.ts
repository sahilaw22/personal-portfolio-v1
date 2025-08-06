

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  submittedAt: Date;
};

export type HeroContent = {
  greeting: string;
  name: string;
  title: string;
  availability: string;
  bio: string;
  image: string;
};

export type HeroBackground = {
  type: 'solid' | 'gradient';
  from: string;
  to: string;
  fromSize: number;
  toSize: number;
  fromOpacity: number;
  toOpacity: number;
};

export type ColorTheme = {
  background: string;
  foreground: string;
  primary: string;
  accent: string;
}

export type ThemeSettings = {
  heroBackground: HeroBackground;
  colors: ColorTheme;
  backgroundImage?: string;
  backgroundImageOpacity?: number;
  backgroundImageBlur?: number;
  resumeUrl?: string;
}

export type Service = {
  id: string;
  icon: string;
  title: string;
  color: string;
};

export type Stat = {
  id:string;
  value: string;
  label: string;
};

export type AboutContent = {
  bio: string;
  services: Service[];
  stats: Stat[];
  image: string;
};

export type ContactContent = {
  image: string;
};

export type Skill = {
  name:string;
  icon: any; // LucideIcon can't be serialized easily
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
  aiHint: string;
};

export type PortfolioData = {
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
  theme: ThemeSettings;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  contactSubmissions?: ContactSubmission[];
};
