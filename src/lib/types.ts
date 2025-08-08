

export type PageView = {
  timestamp: number;
};

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  submittedAt: Date;
  isRead: boolean;
};

export type HeroContent = {
  greeting: string;
  name: string;
  title: string;
  availability: string;
  bio: string;
  image: string;
  nameFont?: string;
  backgroundVideo?: string;
};

export type HeroBackground = {
  type: 'solid' | 'gradient' | 'radial' | 'conic' | 'mesh';
  from: string;
  to: string;
  via?: string;
  fromSize: number;
  toSize: number;
  viaSize?: number;
  fromOpacity: number;
  toOpacity: number;
  viaOpacity?: number;
  rotation?: number;
  animationType?: 'none' | 'pulse' | 'rotate' | 'float' | 'wave';
  animationSpeed?: number;
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light';
  shape?: 'circle' | 'ellipse' | 'square' | 'polygon';
  intensity?: number;
};

export type ColorTheme = {
  background: string;
  foreground: string;
  primary: string;
  accent: string;
}

export type GradientTextSettings = {
  enabled: boolean;
  type: 'linear' | 'radial' | 'conic';
  direction: number; // degrees for linear, ignored for radial/conic
  colors: string[]; // array of colors for the gradient
  positions?: number[]; // optional positions for each color (0-100)
  animationType?: 'none' | 'pulse' | 'wave' | 'rotate' | 'slide';
  animationSpeed?: number; // 1-10 scale
  applyTo: Array<'hero-name' | 'hero-title' | 'section-headings' | 'project-titles' | 'nav-links' | 'buttons'>;
};

export type PatternSettings = {
  enabled: boolean;
  type: 'none' | 'dots' | 'grid' | 'waves' | 'diagonal-lines' | 'hexagon' | 'circuit' | 'geometric' | 'stars' | 'crosses' | 'mesh' | 'bubbles';
  opacity: number; // 0-1
  size: number; // 10-200
  color: string;
  spacing: number; // 10-100
  rotation: number; // 0-360 degrees
  animationType?: 'none' | 'pulse' | 'rotate' | 'float' | 'scale';
  animationSpeed?: number; // 1-10
};

export type ThemeSettings = {
  heroBackground: HeroBackground;
  colors: ColorTheme;
  gradientText?: GradientTextSettings;
  backgroundImage?: string;
  backgroundImageOpacity?: number;
  backgroundImageBlur?: number;
  backgroundPattern?: PatternSettings;
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
  backgroundVideo?: string;
};

export type ContactContent = {
  image: string;
  backgroundVideo?: string;
};

export type Skill = {
  name: string;
  // Store icon as a string key that maps to an icon in iconMap
  icon: string;
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
  // Optional looped cover video; when present, UI prefers video over image
  coverVideoUrl?: string;
  coverVideoPoster?: string;
  tags: string[];
  github: string;
  live: string;
  aiHint: string;
};

export type AppSettings = {
    adminPassword: string;
    themeMode: 'light' | 'dark';
    securityQuestion?: string;
    securityAnswer?: string;
  layout?: LayoutSettings;
  uiStyle?: UIStyleSettings;
}

export type PortfolioData = {
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
  theme: ThemeSettings;
  settings: AppSettings;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  pageViews: PageView[];
  contactSubmissions?: ContactSubmission[];
};

// Layout types (added)
export type LayoutSettings = {
  id: string; // layout preset id
  title?: string;
  sectionOrder: Array<'hero' | 'about' | 'skills' | 'experience' | 'education' | 'projects' | 'contact'>;
  container: 'narrow' | 'normal' | 'wide' | 'full';
  navStyle: 'top' | 'sidebar' | 'sticky';
  cardStyle: 'solid' | 'glass' | 'bordered';
  radius: 'sm' | 'md' | 'lg' | 'xl';
  shadow: 'none' | 'soft' | 'elevated';
  projectLayout: 'grid' | 'masonry' | 'carousel';
  imageShape: 'rounded' | 'circle' | 'squircle';
  sectionSeparators: 'none' | 'angled' | 'wave';
  spacingScale: 'compact' | 'cozy' | 'comfortable';
  typographyScale: 'normal' | 'larger' | 'editorial';
};

// UI Style types (component aesthetics)
export type UIStyleSettings = {
  id: string; // ui style preset id
  title?: string;
  buttonVariantDefault: 'default' | 'outline' | 'secondary' | 'accent' | 'ghost' | 'link';
  buttonShape: 'rounded' | 'pill' | 'sharp';
  cardBorder: 'none' | 'thin' | 'thick';
  headingStyle: 'clean' | 'underline' | 'all-caps';
  animationLevel: 'none' | 'subtle' | 'playful';
  accentGradient: boolean;
};


