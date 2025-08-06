
'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { ContactSubmission, PortfolioData, Experience, Project, SkillCategory, AboutContent, HeroContent, Education, ContactContent, ThemeSettings, ColorTheme, HeroBackground } from '@/lib/types';
import { initialData } from '@/lib/initial-data';


interface AppState {
  isAdminAuthenticated: boolean;
  contactSubmissions: ContactSubmission[];
  portfolioData: PortfolioData;
  login: (password: string) => boolean;
  logout: () => void;
  handleAddSubmission: (submission: Omit<ContactSubmission, 'submittedAt'>) => void;
  updateHeroContent: (hero: HeroContent) => void;
  updateAboutContent: (about: AboutContent) => void;
  updateContactContent: (contact: ContactContent) => void;
  updateThemeSettings: (theme: ThemeSettings) => void;
  updateColorTheme: (colors: ColorTheme) => void;
  updateHeroBackground: (heroBackground: HeroBackground) => void;
  updateAllExperience: (experiences: Experience[]) => void;
  updateAllEducation: (educationItems: Education[]) => void;
  updateAllProjects: (projects: Project[]) => void;
  updateProject: (project: Project) => void;
  updateSkills: (skillCategories: SkillCategory[]) => void;
  saveData: () => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

const UNLOCK_PASSWORD = 'IamNerd';
const DATA_VERSION = 'v10'; // Increment this to force a reset

export function AppStateSync() {
  const { portfolioData } = useAppState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const theme = portfolioData.theme;

      const colors = theme.colors;
      root.style.setProperty('--background', colors.background);
      root.style.setProperty('--foreground', colors.foreground);
      root.style.setProperty('--primary', colors.primary);
      root.style.setProperty('--accent', colors.accent);

      const bgHsl = colors.background.split(' ').map(s => parseFloat(s.replace('%','')));
      const fgHsl = colors.foreground.split(' ').map(s => parseFloat(s.replace('%','')));
      
      if (bgHsl.length === 3) {
        root.style.setProperty('--card', `${bgHsl[0]} ${bgHsl[1]}% ${bgHsl[2] + 3}%`);
        const mutedLightness = bgHsl[2] > 50 ? bgHsl[2] - 10 : bgHsl[2] + 12;
        root.style.setProperty('--muted', `${bgHsl[0]} ${bgHsl[1]}% ${mutedLightness}%`);
        root.style.setProperty('--border', `${bgHsl[0]} ${bgHsl[1]}% ${mutedLightness}%`);
        root.style.setProperty('--input', `${bgHsl[0]} ${bgHsl[1]}% ${mutedLightness}%`);
      }
       if (fgHsl.length === 3) {
        root.style.setProperty('--card-foreground', `${fgHsl[0]} ${fgHsl[1]}% ${fgHsl[2]}%`);
        root.style.setProperty('--popover-foreground', `${fgHsl[0]} ${fgHsl[1]}% ${fgHsl[2]}%`);
        root.style.setProperty('--secondary-foreground', `${fgHsl[0]} ${fgHsl[1]}% ${fgHsl[2]}%`);
        root.style.setProperty('--muted-foreground', `${fgHsl[0]} ${fgHsl[1]}% ${fgHsl[2] - 30}%`);
        root.style.setProperty('--accent-foreground', `${fgHsl[0]} ${fgHsl[1]}% ${fgHsl[2]}%`);
        root.style.setProperty('--destructive-foreground', `${fgHsl[0]} ${fgHsl[1]}% ${fgHsl[2]}%`);
      }

      const body = document.body;
      if (theme.backgroundImage) {
        body.style.setProperty('--background-image', `url(${theme.backgroundImage})`);
        body.style.setProperty('--background-image-opacity', String(theme.backgroundImageOpacity || 0.1));
        body.style.setProperty('--background-image-blur', `${theme.backgroundImageBlur || 5}px`);
        body.classList.add('with-background-image');
      } else {
        body.style.removeProperty('--background-image');
        body.style.removeProperty('--background-image-opacity');
        body.style.removeProperty('--background-image-blur');
        body.classList.remove('with-background-image');
      }
    }
  }, [portfolioData.theme]);

  return null;
}

export default function AppStateProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialData);
  const [isHydrated, setIsHydrated] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    try {
        const storedVersion = window.localStorage.getItem('dataVersion');
        if (storedVersion !== DATA_VERSION) {
             console.log('Data version mismatch, resetting portfolio data.');
             window.localStorage.removeItem('portfolioData');
             window.localStorage.setItem('dataVersion', DATA_VERSION);
             setPortfolioData(initialData);
        } else {
            const item = window.localStorage.getItem('portfolioData');
            if (item) {
                const parsedData = JSON.parse(item);
                const mergedData = { 
                    ...initialData, 
                    ...parsedData, 
                    theme: { 
                        ...initialData.theme, 
                        ...(parsedData.theme || {}),
                        colors: {
                            ...initialData.theme.colors,
                            ...(parsedData.theme?.colors || {})
                        },
                        heroBackground: {
                           ...initialData.theme.heroBackground,
                           ...(parsedData.theme?.heroBackground || {})
                        }
                    } 
                };
                setPortfolioData(mergedData);
            }
        }
    } catch (error) {
        console.error("Error reading from localStorage", error);
        setPortfolioData(initialData);
    } finally {
        setIsHydrated(true);
    }
  }, []);

  const saveData = () => {
    if (isHydrated) {
        try {
          window.localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
          return true;
        } catch (error) {
          console.error("Error writing to localStorage", error);
          return false;
        }
    }
    return false;
  };

  useEffect(() => {
    if (sessionStorage.getItem('isAdminAuthenticated') === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !isAdminAuthenticated) {
      router.replace('/admin/login');
    }
  }, [pathname, isAdminAuthenticated, router]);
  
  const login = (password: string) => {
    if (password === UNLOCK_PASSWORD) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      router.push('/admin');
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('isAdminAuthenticated');
    router.push('/admin/login');
  };

  const handleAddSubmission = (submission: Omit<ContactSubmission, 'submittedAt'>) => {
     setPortfolioData(prev => ({
      ...prev,
      contactSubmissions: [...(prev.contactSubmissions || []), { ...submission, submittedAt: new Date() }]
    }));
  };
  
  const updateHeroContent = (hero: HeroContent) => {
    setPortfolioData(prev => ({ ...prev, hero }));
  }

  const updateAboutContent = (about: AboutContent) => {
    setPortfolioData(prev => ({ ...prev, about }));
  };

  const updateContactContent = (contact: ContactContent) => {
    setPortfolioData(prev => ({ ...prev, contact }));
  }

  const updateThemeSettings = (theme: ThemeSettings) => {
    setPortfolioData(prev => ({...prev, theme}));
  };
  
  const updateColorTheme = (colors: ColorTheme) => {
    setPortfolioData(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        colors: colors,
      }
    }));
  };
  
  const updateHeroBackground = (heroBackground: HeroBackground) => {
      setPortfolioData(prev => ({
          ...prev,
          theme: {
              ...prev.theme,
              heroBackground,
          }
      }));
  }

  const updateAllExperience = (experience: Experience[]) => {
    setPortfolioData(prev => ({...prev, experience }));
  };

  const updateAllEducation = (education: Education[]) => {
    setPortfolioData(prev => ({...prev, education }));
  };
  
  const updateAllProjects = (projects: Project[]) => {
    setPortfolioData(prev => ({...prev, projects }));
  };

  const updateProject = (updatedProject: Project) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === updatedProject.id ? updatedProject : p)
    }));
  };
  
  const updateSkills = (skills: SkillCategory[]) => {
    setPortfolioData(prev => ({ ...prev, skills }));
  };


  const value = {
    isAdminAuthenticated,
    contactSubmissions: portfolioData.contactSubmissions || [],
    portfolioData,
    login,
    logout,
    handleAddSubmission,
    updateHeroContent,
    updateAboutContent,
    updateContactContent,
    updateThemeSettings,
    updateColorTheme,
    updateHeroBackground,
    updateAllExperience,
    updateAllEducation,
    updateAllProjects,
    updateProject,
    updateSkills,
    saveData,
  };

  return (
    <AppStateContext.Provider value={value}>
      {isHydrated ? children : null}
    </AppStateContext.Provider>
  );
}

export const useAppState = (): AppState => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
