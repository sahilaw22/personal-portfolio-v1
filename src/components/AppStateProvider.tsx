'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { ContactSubmission, PortfolioData, Experience, Project, SkillCategory, AboutContent, HeroContent, Education } from '@/lib/types';
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
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (experience: Experience) => void;
  deleteExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (education: Education) => void;
  deleteEducation: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateSkills: (skills: SkillCategory[]) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

const UNLOCK_PASSWORD = 'IamNerd';

export default function AppStateProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialData);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // On initial load, check if we should be authenticated from session storage
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
    setContactSubmissions(prev => [...prev, { ...submission, submittedAt: new Date() }]);
  };
  
  const updateHeroContent = (hero: HeroContent) => {
    setPortfolioData(prev => ({ ...prev, hero }));
  }

  const updateAboutContent = (about: AboutContent) => {
    setPortfolioData(prev => ({ ...prev, about }));
  };

  const addExperience = (experience: Omit<Experience, 'id'>) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: [{ ...experience, id: new Date().toISOString() }, ...prev.experience]
    }));
  };

  const updateExperience = (updatedExperience: Experience) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === updatedExperience.id ? updatedExperience : exp)
    }));
  };

  const deleteExperience = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };
  
  const addEducation = (education: Omit<Education, 'id'>) => {
    setPortfolioData(prev => ({
      ...prev,
      education: [{ ...education, id: new Date().toISOString() }, ...prev.education]
    }));
  };

  const updateEducation = (updatedEducation: Education) => {
    setPortfolioData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === updatedEducation.id ? updatedEducation : edu)
    }));
  };

  const deleteEducation = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: new Date().toISOString() }]
    }));
  };

  const updateProject = (updatedProject: Project) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === updatedProject.id ? updatedProject : p)
    }));
  };

  const deleteProject = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };
  
  const updateSkills = (skills: SkillCategory[]) => {
    setPortfolioData(prev => ({ ...prev, skills }));
  };


  const value = {
    isAdminAuthenticated,
    contactSubmissions,
    portfolioData,
    login,
    logout,
    handleAddSubmission,
    updateHeroContent,
    updateAboutContent,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addProject,
    updateProject,
    deleteProject,
    updateSkills,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
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
