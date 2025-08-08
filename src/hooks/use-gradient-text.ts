'use client';
import { useAppState } from '@/components/AppStateProvider';
import { shouldApplyGradient, getGradientTextStyle } from '@/lib/gradient-text-utils';

export function useGradientText() {
  const { portfolioData } = useAppState();
  const gradientSettings = portfolioData.theme.gradientText;

  const getGradientProps = (elementType: 'hero-name' | 'hero-title' | 'section-headings' | 'project-titles' | 'nav-links' | 'buttons') => {
    if (!gradientSettings || !shouldApplyGradient(gradientSettings, elementType)) {
      return {};
    }

    return {
      style: getGradientTextStyle(gradientSettings)
    };
  };

  return {
    isEnabled: gradientSettings?.enabled || false,
    settings: gradientSettings,
    getGradientProps,
    shouldApplyGradient: (elementType: string) => 
      gradientSettings ? shouldApplyGradient(gradientSettings, elementType) : false
  };
}
