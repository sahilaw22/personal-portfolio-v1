
'use client';
import { useEffect, useRef, lazy, Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import { useAppState } from '@/components/AppStateProvider';
import { cn } from '@/lib/utils';
import { SectionSkeleton, OptimizedSuspense } from '@/components/LoadingComponents';

// Lazy load non-critical sections
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const SkillsSection = lazy(() => import('@/components/sections/SkillsSection'));
const ExperienceSection = lazy(() => import('@/components/sections/ExperienceSection'));
const EducationSection = lazy(() => import('@/components/sections/EducationSection'));
const ProjectsSection = lazy(() => import('@/components/sections/ProjectsSection'));
const ContactSection = lazy(() => import('@/components/sections/ContactSection'));

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
  const order = portfolioData.settings.layout?.sectionOrder || ['hero','about','skills','experience','education','projects','contact'];
  const spacing = portfolioData.settings.layout?.spacingScale || 'comfortable';
  const sectionGap = spacing === 'compact' ? 'space-y-6' : spacing === 'cozy' ? 'space-y-10' : 'space-y-16';
  
  return (
    <div className={cn('px-4 md:px-6', sectionGap)}>
      {order.map((section) => {
        switch (section) {
          case 'hero':
            return <HeroSection key="hero" content={portfolioData.hero} background={portfolioData.theme.heroBackground} />;
          case 'about':
            return (
              <AnimatedSection id="about" key="about">
                <OptimizedSuspense fallback={<SectionSkeleton />}>
                  <AboutSection content={portfolioData.about} />
                </OptimizedSuspense>
              </AnimatedSection>
            );
          case 'skills':
            return (
              <AnimatedSection id="skills" key="skills">
                <OptimizedSuspense fallback={<SectionSkeleton />}>
                  <SkillsSection skillsData={portfolioData.skills} />
                </OptimizedSuspense>
              </AnimatedSection>
            );
          case 'experience':
            return (
              <AnimatedSection id="experience" key="experience">
                <OptimizedSuspense fallback={<SectionSkeleton />}>
                  <ExperienceSection experiences={portfolioData.experience} />
                </OptimizedSuspense>
              </AnimatedSection>
            );
          case 'education':
            return (
              <AnimatedSection id="education" key="education">
                <OptimizedSuspense fallback={<SectionSkeleton />}>
                  <EducationSection education={portfolioData.education} />
                </OptimizedSuspense>
              </AnimatedSection>
            );
          case 'projects':
            return (
              <AnimatedSection id="projects" key="projects">
                <OptimizedSuspense fallback={<SectionSkeleton />}>
                  <ProjectsSection projects={portfolioData.projects} />
                </OptimizedSuspense>
              </AnimatedSection>
            );
          case 'contact':
            return (
              <AnimatedSection id="contact" key="contact">
                <OptimizedSuspense fallback={<SectionSkeleton />}>
                  <ContactSection onFormSubmit={handleAddSubmission} />
                </OptimizedSuspense>
              </AnimatedSection>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
