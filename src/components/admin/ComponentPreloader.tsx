'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { preloadComponents } from './ComponentRegistry';

// Map routes to components that should be preloaded
const routeComponentMap = {
  '/admin/theme': ['ModernThemeEditor', 'ModernBackgroundEditor', 'HeroBackgroundEditor'],
  '/admin/portfolio-designs': ['PortfolioDesignsManager', 'LayoutsManager', 'OptionalLayoutSettings', 'UIStylesManager'],
  '/admin/layouts': ['LayoutsManager'],
  '/admin/about': ['AboutEditor', 'ImageUploader'],
  '/admin/experience': ['ExperienceEditor'],
  '/admin/education': ['EducationEditor'],
  '/admin/projects': ['ProjectsEditor', 'ImageUploader'],
  '/admin/messages': ['ContactSubmissions'],
  '/admin/export': ['DataExporter'],
  '/admin/ai-tools': ['HeadlineGenerator'],
} as const;

type ComponentName = keyof typeof import('./ComponentRegistry').default;

// Preload components for better performance
export function useComponentPreloader() {
  const pathname = usePathname();

  useEffect(() => {
    const componentsToPreload = routeComponentMap[pathname as keyof typeof routeComponentMap];
    
    if (componentsToPreload) {
      // Preload components for current route
      preloadComponents([...componentsToPreload] as ComponentName[]);
      
      // Also preload commonly used components
      preloadComponents(['ImageUploader']);
    }
  }, [pathname]);
}// Component to add to admin layout for automatic preloading
export function AdminComponentPreloader() {
  useComponentPreloader();
  return null; // This component doesn't render anything
}

export default AdminComponentPreloader;
