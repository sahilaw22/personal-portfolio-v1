'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import PasswordDialog from '@/components/admin/PasswordDialog';
import AdminPanel from '@/components/admin/AdminPanel';
import type { ContactSubmission } from '@/lib/types';

interface AppState {
  isAdminAuthenticated: boolean;
  isPasswordDialogOpen: boolean;
  contactSubmissions: ContactSubmission[];
  setIsAdminAuthenticated: (value: boolean) => void;
  setIsPasswordDialogOpen: (value: boolean) => void;
  handleAddSubmission: (submission: Omit<ContactSubmission, 'submittedAt'>) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export default function AppStateProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);

  const handleAddSubmission = (submission: Omit<ContactSubmission, 'submittedAt'>) => {
    setContactSubmissions(prev => [...prev, { ...submission, submittedAt: new Date() }]);
  };

  const value = {
    isAdminAuthenticated,
    isPasswordDialogOpen,
    contactSubmissions,
    setIsAdminAuthenticated,
    setIsPasswordDialogOpen,
    handleAddSubmission,
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
