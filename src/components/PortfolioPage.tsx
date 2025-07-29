'use client';

import { useState } from 'react';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import PasswordDialog from '@/components/admin/PasswordDialog';
import AdminPanel from '@/components/admin/AdminPanel';
import type { ContactSubmission } from '@/lib/types';

export default function PortfolioPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);

  const handleAddSubmission = (submission: Omit<ContactSubmission, 'submittedAt'>) => {
    setContactSubmissions(prev => [...prev, { ...submission, submittedAt: new Date() }]);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection onFormSubmit={handleAddSubmission} />
      </main>
      <Footer onAdminClick={() => setIsPasswordDialogOpen(true)} />
      
      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        onSuccess={() => {
          setIsAdminAuthenticated(true);
          setIsPasswordDialogOpen(false);
        }}
      />
      
      {isAdminAuthenticated && <AdminPanel contactSubmissions={contactSubmissions} />}
    </div>
  );
}
