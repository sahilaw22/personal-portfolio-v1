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
  bio: string;
};

export type Skill = {
  name: string;
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
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
};
