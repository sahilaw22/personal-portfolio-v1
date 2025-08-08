'use client';
import { useEffect } from 'react';
import { useAppState } from '@/components/AppStateProvider';
import { gradientTextAnimations } from '@/lib/gradient-text-utils';

export default function GradientTextStyles() {
  const { portfolioData } = useAppState();

  useEffect(() => {
    const settings = portfolioData.theme.gradientText;
    
    // Only inject styles if gradient text is enabled
    if (!settings?.enabled) {
      // Remove existing gradient text styles
      const existingStyle = document.getElementById('gradient-text-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      return;
    }

    // Remove existing styles first
    const existingStyle = document.getElementById('gradient-text-styles');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create and inject new styles
    const style = document.createElement('style');
    style.id = 'gradient-text-styles';
    style.textContent = gradientTextAnimations;
    document.head.appendChild(style);

    return () => {
      // Cleanup on unmount
      const styleElement = document.getElementById('gradient-text-styles');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [portfolioData.theme.gradientText]);

  return null; // This component doesn't render anything
}
