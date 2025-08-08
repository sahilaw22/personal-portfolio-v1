
'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { ContactSubmission, PortfolioData, Experience, Project, SkillCategory, AboutContent, HeroContent, Education, ContactContent, ThemeSettings, ColorTheme, HeroBackground, AppSettings, PageView } from '@/lib/types';
import { initialData } from '@/lib/initial-data';
import { useToast } from '@/hooks/use-toast';


interface AppState {
  isAdminAuthenticated: boolean;
  contactSubmissions: ContactSubmission[];
  portfolioData: PortfolioData; // active data (draft on admin routes, persisted on public)
  // Draft workflow
  commitAllChanges: () => void;
  discardAllChanges: () => void;
  draftDirty: boolean;
  // Transient preview of draft on public routes (not persisted; resets on refresh)
  previewMode: boolean;
  startPreview: () => void;
  stopPreview: () => void;
  login: (password: string) => boolean;
  logout: () => void;
  bypassAuth: () => void;
  recoverPassword: (securityAnswer: string) => { success: boolean; password?: string };
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
  updateAppSettings: (settings: Partial<AppSettings>) => void;
  changeAdminPassword: (password: string) => void;
  markAllMessagesAsRead: () => void;
  addPageView: () => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

const DATA_VERSION = 'v16'; // Increment this to force a reset

export function AppStateSync() {
  const { portfolioData } = useAppState();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(portfolioData.settings.themeMode);
  }, [portfolioData.settings.themeMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const theme = portfolioData.theme;
  const ui = portfolioData.settings.uiStyle;
      const layout = portfolioData.settings.layout;

      // Always set custom properties so selected designs reflect in both modes
      const colors = theme.colors;
      root.style.setProperty('--primary', colors.primary);
      root.style.setProperty('--accent', colors.accent);
      root.style.setProperty('--background', colors.background);
      root.style.setProperty('--foreground', colors.foreground);

      const bgHsl = colors.background.split(' ').map(s => parseFloat(s.replace('%','')));
      if (bgHsl.length === 3) {
        // Derive card/muted/border/input based on background lightness
        const bgL = bgHsl[2];
        const isLight = portfolioData.settings.themeMode === 'light';
        const cardLightness = isLight ? Math.min(bgL + 2, 98) : Math.min(bgL + 3, 98);
        const mutedLightness = isLight ? Math.max(bgL - 8, 6) : (bgL > 50 ? bgL - 10 : bgL + 12);
        root.style.setProperty('--card', `${bgHsl[0]} ${bgHsl[1]}% ${cardLightness}%`);
        root.style.setProperty('--muted', `${bgHsl[0]} ${bgHsl[1]}% ${mutedLightness}%`);
        root.style.setProperty('--border', `${bgHsl[0]} ${bgHsl[1]}% ${mutedLightness}%`);
        root.style.setProperty('--input', `${bgHsl[0]} ${bgHsl[1]}% ${mutedLightness}%`);
      }

      const fgHsl = colors.foreground.split(' ').map(s => parseFloat(s.replace('%','')));
      if (fgHsl.length === 3) {
        root.style.setProperty('--card-foreground', `${fgHsl[0]} ${fgHsl[1]}% ${fgHsl[2]}%`);
        root.style.setProperty('--popover-foreground', `${fgHsl[0]} ${fgHsl[1]}% ${fgHsl[2]}%`);
        root.style.setProperty('--secondary-foreground', `${fgHsl[0]} ${fgHsl[1]}% ${fgHsl[2]}%`);
        // ensure muted-foreground has adequate contrast
        const mutedFgL = Math.max(Math.min(fgHsl[2] - 30, 96), 8);
        root.style.setProperty('--muted-foreground', `${fgHsl[0]} ${fgHsl[1]}% ${mutedFgL}%`);
        root.style.setProperty('--accent-foreground', `${fgHsl[0]} ${fgHsl[1]}% ${fgHsl[2]}%`);
        root.style.setProperty('--destructive-foreground', `${fgHsl[0]} ${fgHsl[1]}% ${fgHsl[2]}%`);
        // derive legible foreground for primary/accent based on luminance
        const chooseText = (l:number) => (l > 55 ? '0 0% 10%' : '0 0% 98%');
        root.style.setProperty('--primary-foreground', chooseText(parseFloat(colors.primary.split(' ')[2])));
        root.style.setProperty('--accent-foreground', chooseText(parseFloat(colors.accent.split(' ')[2])));
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

  // Layout radius controls base radius token used by many components
  const layoutRadius = layout?.radius || 'lg';
  const radiusPx = layoutRadius === 'sm' ? '0.375rem' : layoutRadius === 'md' ? '0.5rem' : layoutRadius === 'lg' ? '0.75rem' : '1rem';
  root.style.setProperty('--radius', radiusPx);

  // UI style switches via CSS variables and utility classes on :root
  // Border thickness for cards
  const cardBorderWidth = ui?.cardBorder === 'none' ? '0px' : ui?.cardBorder === 'thick' ? '2px' : '1px';
  root.style.setProperty('--card-border-width', cardBorderWidth);
  // Button radius style
  const btnRadius = ui?.buttonShape === 'pill' ? '9999px' : ui?.buttonShape === 'sharp' ? '0px' : '0.5rem';
  root.style.setProperty('--button-radius', btnRadius);
  // Headings style flags
  root.dataset.headingStyle = ui?.headingStyle || 'clean';
  // Accent gradient flag
  root.dataset.accentGradient = ui?.accentGradient ? 'true' : 'false';
  // Animation level
  root.dataset.animLevel = ui?.animationLevel || 'subtle';
    }
  }, [
    portfolioData.theme,
    portfolioData.settings.themeMode,
    portfolioData.settings.uiStyle,
    portfolioData.settings.layout,
  ]);

  return null;
}

export default function AppStateProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  // persistedData reflects what is saved permanently (localStorage)
  const [persistedData, setPersistedData] = useState<PortfolioData>(initialData);
  // draftData holds in-memory edits made in admin until committed
  const [draftData, setDraftData] = useState<PortfolioData>(initialData);
  const [isHydrated, setIsHydrated] = useState(false);
  const { toast } = useToast();
  // Transient preview state (memory only)
  const [previewMode, setPreviewMode] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const inAdmin = pathname?.startsWith('/admin') ?? false;
  
  useEffect(() => {
    try {
        const storedVersion = window.localStorage.getItem('dataVersion');
        if (storedVersion !== DATA_VERSION) {
             console.log('Data version mismatch, resetting portfolio data.');
             window.localStorage.removeItem('portfolioData');
             window.localStorage.setItem('dataVersion', DATA_VERSION);
             setPersistedData(initialData);
             setDraftData(initialData);
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
                    },
                    settings: {
                        ...initialData.settings,
                        ...(parsedData.settings || {}),
                    },
                    pageViews: parsedData.pageViews || [],
                };
                setPersistedData(mergedData);
                setDraftData(mergedData);
            }
        }
    } catch (error) {
        console.error("Error reading from localStorage", error);
        setPersistedData(initialData);
        setDraftData(initialData);
    } finally {
        setIsHydrated(true);
    }
  }, []);

  // Route-aware update helper: update draft on admin routes (no persistence),
  // update persisted (and save) on public routes.
  const updateAndSave = (updater: (prev: PortfolioData) => PortfolioData) => {
    if (inAdmin) {
      setDraftData(prev => updater(prev));
    } else {
      setPersistedData(prev => {
        const newData = updater(prev);
        if (isHydrated) {
          try {
            window.localStorage.setItem('portfolioData', JSON.stringify(newData));
          } catch (error) {
            console.error("Error writing to localStorage", error);
          }
        }
        return newData;
      });
    }
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
  const source = persistedData; // authenticate against persisted settings
  if (password === source.settings.adminPassword) {
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

  const bypassAuth = () => {
    // Enable authentication bypass for development
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('isAdminAuthenticated', 'true');
    toast({
      title: 'Authentication Bypassed',
      description: 'You have been authenticated via bypass.',
    });
  };

  // Commit/discard draft workflow
  const commitAllChanges = () => {
    // copy draft -> persisted and save
    setPersistedData(draftData);
    try {
      if (isHydrated) {
        window.localStorage.setItem('portfolioData', JSON.stringify(draftData));
      }
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
    toast({ title: 'All changes saved', description: 'Your customization is now permanent.' });
  // exit preview after save
  setPreviewMode(false);
  };

  const discardAllChanges = () => {
    setDraftData(persistedData);
    toast({ title: 'Changes discarded', description: 'Draft changes have been reverted.' });
  };

  const recoverPassword = (securityAnswer: string) => {
    // Check if security answer matches (you should implement proper security logic)
    const correctAnswer = persistedData.settings.securityAnswer || 'defaultanswer';
    const currentPassword = persistedData.settings.adminPassword || 'admin';
    
    if (securityAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
      toast({
        title: 'Password Recovered',
        description: 'Your password has been recovered successfully.',
      });
      return { success: true, password: currentPassword };
    } else {
      return { success: false };
    }
  };

  const handleAddSubmission = (submission: Omit<ContactSubmission, 'submittedAt'>) => {
  updateAndSave(prev => ({
      ...prev,
      contactSubmissions: [...(prev.contactSubmissions || []), { ...submission, submittedAt: new Date(), isRead: false }]
    }));
     toast({
        title: 'New Message Received!',
        description: `From: ${submission.name}`,
      });
  };
  
  const updateHeroContent = (hero: HeroContent) => {
    updateAndSave(prev => ({ ...prev, hero }));
  }

  const updateAboutContent = (about: AboutContent) => {
    updateAndSave(prev => ({ ...prev, about }));
  };

  const updateContactContent = (contact: ContactContent) => {
    updateAndSave(prev => ({ ...prev, contact }));
  }

  const updateThemeSettings = (theme: ThemeSettings) => {
    updateAndSave(prev => ({...prev, theme}));
  };
  
  const updateColorTheme = (colors: ColorTheme) => {
    updateAndSave(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        colors: colors,
      }
    }));
  };
  
  const updateHeroBackground = (heroBackground: HeroBackground) => {
      updateAndSave(prev => ({
          ...prev,
          theme: {
              ...prev.theme,
              heroBackground,
          }
      }));
  }

  const updateAllExperience = (experience: Experience[]) => {
    updateAndSave(prev => ({...prev, experience }));
  };

  const updateAllEducation = (education: Education[]) => {
    updateAndSave(prev => ({...prev, education }));
  };
  
  const updateAllProjects = (projects: Project[]) => {
    updateAndSave(prev => ({...prev, projects }));
  };

  const updateProject = (updatedProject: Project) => {
    updateAndSave(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === updatedProject.id ? updatedProject : p)
    }));
  };
  
  const updateSkills = (skills: SkillCategory[]) => {
    updateAndSave(prev => ({ ...prev, skills }));
  };

  const updateAppSettings = (settings: Partial<AppSettings>) => {
    updateAndSave(prev => ({
        ...prev,
        settings: {
            ...prev.settings,
            ...settings,
        }
    }))
  };

  const changeAdminPassword = (password: string) => {
    updateAndSave(prev => ({
        ...prev,
        settings: {
            ...prev.settings,
            adminPassword: password,
        }
    }))
  }

  const markAllMessagesAsRead = () => {
    updateAndSave(prev => ({
      ...prev,
      contactSubmissions: prev.contactSubmissions?.map(s => ({ ...s, isRead: true })) || [],
    }));
  }
  
  const addPageView = () => {
    updateAndSave(prev => ({
      ...prev,
      pageViews: [...(prev.pageViews || []), { timestamp: Date.now() }]
    }));
  }

  const value = {
    isAdminAuthenticated,
  contactSubmissions: ((previewMode || inAdmin) ? draftData : persistedData).contactSubmissions || [],
  portfolioData: (previewMode || inAdmin) ? draftData : persistedData,
  commitAllChanges,
  discardAllChanges,
  draftDirty: JSON.stringify(draftData) !== JSON.stringify(persistedData),
  previewMode,
  startPreview: () => setPreviewMode(true),
  stopPreview: () => setPreviewMode(false),
    login,
    logout,
    bypassAuth,
    recoverPassword,
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
    updateAppSettings,
    changeAdminPassword,
    markAllMessagesAsRead,
    addPageView,
  };

  return (
    <AppStateContext.Provider value={value}>
      {isHydrated ? (
        <>
          {children}
          {/* Preview banner visible on public routes while previewing */}
          {previewMode && !inAdmin && (
            <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 rounded-md border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg px-4 py-2 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Previewing draft — not saved</span>
              <button className="text-sm underline" onClick={() => setPreviewMode(false)}>Exit preview</button>
            </div>
          )}
        </>
      ) : null}
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

    