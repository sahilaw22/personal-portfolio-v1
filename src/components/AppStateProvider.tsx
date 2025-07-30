'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import PasswordDialog from '@/components/admin/PasswordDialog';
import AdminPanel from '@/components/admin/AdminPanel';
import type { ContactSubmission, PortfolioData, Experience, Project, SkillCategory } from '@/lib/types';
import { initialData } from '@/lib/initial-data';


interface AppState {
  isAdminAuthenticated: boolean;
  isPasswordDialogOpen: boolean;
  contactSubmissions: ContactSubmission[];
  portfolioData: PortfolioData;
  setIsAdminAuthenticated: (value: boolean) => void;
  setIsPasswordDialogOpen: (value: boolean) => void;
  handleAddSubmission: (submission: Omit<ContactSubmission, 'submittedAt'>) => void;
  updatePortfolioData: (data: PortfolioData) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (experience: Experience) => void;
  deleteExperience: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateSkills: (skills: SkillCategory[]) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export default function AppStateProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialData);

  const handleAddSubmission = (submission: Omit<ContactSubmission, 'submittedAt'>) => {
    setContactSubmissions(prev => [...prev, { ...submission, submittedAt: new Date() }]);
  };

  const updatePortfolioData = (data: PortfolioData) => {
    setPortfolioData(data);
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
    isPasswordDialogOpen,
    contactSubmissions,
    portfolioData,
    setIsAdminAuthenticated,
    setIsPasswordDialogOpen,
    handleAddSubmission,
    updatePortfolioData,
    addExperience,
    updateExperience,
    deleteExperience,
    addProject,
    updateProject,
    deleteProject,
    updateSkills,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        onSuccess={() => {
          setIsAdminAuthenticated(true);
          setIsPasswordDialogOpen(false);
        }}
      />
      {isAdminAuthenticated && <AdminPanel contactSubmissions={contactSubmissions} />}
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
