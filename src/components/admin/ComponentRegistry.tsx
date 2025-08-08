'use client';

import { lazy } from 'react';

// Create a registry of all heavy admin components
const componentRegistry = {
  // Theme components
  ModernThemeEditor: lazy(() => import('@/components/admin/theme/ModernThemeEditor').then(m => ({
    default: m.default
  }))),
  
  ModernBackgroundEditor: lazy(() => import('@/components/admin/theme/ModernBackgroundEditor').then(m => ({
    default: m.default
  }))),
  
  HeroBackgroundEditor: lazy(() => import('@/components/admin/theme/HeroBackgroundEditor').then(m => ({
    default: m.default
  }))),

  // Other admin components
  HeadlineGenerator: lazy(() => import('@/components/admin/HeadlineGenerator').then(m => ({
    default: m.default
  }))),
  
  ImageUploader: lazy(() => import('@/components/admin/ImageUploader').then(m => ({
    default: m.default
  }))),
  
  AboutEditor: lazy(() => import('@/components/admin/AboutEditor').then(m => ({
    default: m.default
  }))),
  
  ExperienceEditor: lazy(() => import('@/components/admin/ExperienceEditor').then(m => ({
    default: m.default
  }))),
  
  EducationEditor: lazy(() => import('@/components/admin/EducationEditor').then(m => ({
    default: m.default
  }))),
  
  ProjectsEditor: lazy(() => import('@/components/admin/ProjectsEditor').then(m => ({
    default: m.default
  }))),

  // Analytics and data components
  ContactSubmissions: lazy(() => import('@/components/admin/ContactSubmissions').then(m => ({
    default: m.default
  }))),
  
  DataExporter: lazy(() => import('@/components/admin/DataExporter').then(m => ({
    default: m.default
  }))),

  // New: Designs Manager
  PortfolioDesignsManager: lazy(() => import('@/components/admin/PortfolioDesignsManager').then(m => ({
    default: m.default
  })) ),

  // New: Layouts Manager
  LayoutsManager: lazy(() => import('@/components/admin/LayoutsManager').then(m => ({
    default: m.default
  })) ),

  // New: Optional Layout Settings
  OptionalLayoutSettings: lazy(() => import('@/components/admin/OptionalLayoutSettings').then(m => ({
    default: m.default
  })) ),

  // New: UI Styles Manager
  UIStylesManager: lazy(() => import('@/components/admin/UIStylesManager').then(m => ({
    default: m.default
  })) ),
};

// Performance optimization: Only load what's needed
export const getComponent = (name: keyof typeof componentRegistry) => {
  if (!componentRegistry[name]) {
    throw new Error(`Component ${name} not found in registry`);
  }
  return componentRegistry[name];
};

// Preload critical components for better UX
export const preloadComponents = async (names: (keyof typeof componentRegistry)[]) => {
  const promises = names.map(name => {
    if (componentRegistry[name]) {
      // Trigger the lazy import
      switch (name) {
        case 'ModernThemeEditor':
          return import('@/components/admin/theme/ModernThemeEditor');
        case 'ModernBackgroundEditor':
          return import('@/components/admin/theme/ModernBackgroundEditor');
        case 'HeroBackgroundEditor':
          return import('@/components/admin/theme/HeroBackgroundEditor');
        case 'HeadlineGenerator':
          return import('@/components/admin/HeadlineGenerator');
        case 'ImageUploader':
          return import('@/components/admin/ImageUploader');
        case 'AboutEditor':
          return import('@/components/admin/AboutEditor');
        case 'ExperienceEditor':
          return import('@/components/admin/ExperienceEditor');
        case 'EducationEditor':
          return import('@/components/admin/EducationEditor');
        case 'ProjectsEditor':
          return import('@/components/admin/ProjectsEditor');
        case 'ContactSubmissions':
          return import('@/components/admin/ContactSubmissions');
        case 'DataExporter':
          return import('@/components/admin/DataExporter');
        case 'PortfolioDesignsManager':
          return import('@/components/admin/PortfolioDesignsManager');
        case 'LayoutsManager':
          return import('@/components/admin/LayoutsManager');
        case 'OptionalLayoutSettings':
          return import('@/components/admin/OptionalLayoutSettings');
        case 'UIStylesManager':
          return import('@/components/admin/UIStylesManager');
        default:
          return Promise.resolve();
      }
    }
    return Promise.resolve();
  });
  
  try {
    await Promise.all(promises);
  } catch (error) {
    // Silently ignore preload errors
    console.warn('Some components failed to preload:', error);
  }
};

// Export individual components for easier importing
export const {
  ModernThemeEditor,
  ModernBackgroundEditor,
  HeroBackgroundEditor,
  HeadlineGenerator,
  ImageUploader,
  AboutEditor,
  ExperienceEditor,
  EducationEditor,
  ProjectsEditor,
  ContactSubmissions,
  DataExporter,
} = componentRegistry;

export default componentRegistry;
