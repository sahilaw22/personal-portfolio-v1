'use client';

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import { useAppState } from '@/components/AppStateProvider';

export default function HomePage() {
  const { handleAddSubmission, portfolioData } = useAppState();
  return (
    <>
      <HeroSection content={portfolioData.hero} />
      <AboutSection content={portfolioData.about} />
      <SkillsSection skillsData={portfolioData.skills} />
      <ExperienceSection experiences={portfolioData.experience} />
      <ProjectsSection projects={portfolioData.projects} />
      <ContactSection onFormSubmit={handleAddSubmission} />
    </>
  );
}
