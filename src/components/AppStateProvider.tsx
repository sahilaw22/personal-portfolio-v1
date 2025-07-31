
'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { ContactSubmission, PortfolioData, Experience, Project, SkillCategory, AboutContent, HeroContent, Education, ContactContent } from '@/lib/types';
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
  updateAllExperience: (experiences: Experience[]) => void;
  updateAllEducation: (educationItems: Education[]) => void;
  updateAllProjects: (projects: Project[]) => void;
  updateProject: (project: Project) => void;
  updateSkills: (skills: SkillCategory[]) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

const UNLOCK_PASSWORD = 'IamNerd';
const DATA_VERSION = 'v4'; // Increment this to force a reset

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
                setPortfolioData(JSON.parse(item));
            }
        }
    } catch (error) {
        console.error("Error reading from localStorage", error);
        setPortfolioData(initialData); // Fallback to initial data on error
    } finally {
        setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
        try {
          window.localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
        } catch (error) {
          console.error("Error writing to localStorage", error);
        }
    }
  }, [portfolioData, isHydrated]);

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
    updateAllExperience,
    updateAllEducation,
    updateAllProjects,
    updateProject,
    updateSkills,
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
