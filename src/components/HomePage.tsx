'use client';

import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import { useAppState } from '@/components/AppStateProvider';

export default function HomePage() {
  const { handleAddSubmission } = useAppState();
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection onFormSubmit={handleAddSubmission} />
    </>
  );
}
