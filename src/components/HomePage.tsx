
'use client';
import { useEffect, useRef } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import { useAppState } from '@/components/AppStateProvider';
import { cn } from '@/lib/utils';

const AnimatedSection = ({ id, className, children }: { id: string, className?: string, children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={ref} id={id} className={cn('opacity-0', className)}>
      {children}
    </div>
  );
};

export default function HomePage() {
  const { handleAddSubmission, portfolioData } = useAppState();
  return (
    <>
      <HeroSection content={portfolioData.hero} background={portfolioData.theme.heroBackground} />
      <AnimatedSection id="about">
        <AboutSection content={portfolioData.about} />
      </AnimatedSection>
      <AnimatedSection id="skills">
        <SkillsSection skillsData={portfolioData.skills} />
      </AnimatedSection>
      <AnimatedSection id="experience">
        <ExperienceSection experiences={portfolioData.experience} />
      </AnimatedSection>
       <AnimatedSection id="education">
        <EducationSection education={portfolioData.education} />
      </AnimatedSection>
      <AnimatedSection id="projects">
        <ProjectsSection projects={portfolioData.projects} />
      </AnimatedSection>
      <AnimatedSection id="contact">
        <ContactSection onFormSubmit={handleAddSubmission} />
      </AnimatedSection>
    </>
  );
}
