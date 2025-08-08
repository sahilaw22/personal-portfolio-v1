import React from 'react';
import { GradientTextSettings } from '@/lib/types';

export function generateGradientTextCSS(settings: GradientTextSettings): string {
  if (!settings.enabled) return '';

  const { type, direction, colors, positions } = settings;
  const colorStops = colors.map((color, i) => {
    const pos = positions?.[i] ?? (i / (colors.length - 1)) * 100;
    return `${color} ${pos}%`;
  }).join(', ');

  switch (type) {
    case 'linear':
      return `linear-gradient(${direction}deg, ${colorStops})`;
    case 'radial':
      return `radial-gradient(circle, ${colorStops})`;
    case 'conic':
      return `conic-gradient(from ${direction}deg, ${colorStops})`;
    default:
      return `linear-gradient(${direction}deg, ${colorStops})`;
  }
}

export function getGradientTextClasses(settings: GradientTextSettings): string {
  if (!settings.enabled) return '';
  
  const baseClasses = 'bg-clip-text text-transparent';
  
  if (settings.animationType && settings.animationType !== 'none') {
    const speed = 10 - (settings.animationSpeed || 3); // Convert to duration (higher speed = lower duration)
    return `${baseClasses} gradient-text-animated gradient-${settings.animationType} animate-duration-${speed}s`;
  }
  
  return baseClasses;
}

export function shouldApplyGradient(settings: GradientTextSettings, element: string): boolean {
  return settings.enabled && settings.applyTo.includes(element as any);
}

export function getGradientTextStyle(settings: GradientTextSettings): React.CSSProperties {
  if (!settings.enabled) return {};
  
  const backgroundImage = generateGradientTextCSS(settings);
  
  const baseStyle: any = {
    backgroundImage,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  };

  if (settings.animationType && settings.animationType !== 'none') {
    const speed = 10 - (settings.animationSpeed || 3);
    baseStyle.animation = `gradient-${settings.animationType} ${speed}s infinite`;
  }

  return baseStyle as React.CSSProperties;
}

// CSS animations as a string to inject into the document head
export const gradientTextAnimations = `
@keyframes gradient-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes gradient-wave {
  0%, 100% { 
    background-position: 0% 50%;
    background-size: 200% 200%;
  }
  50% { 
    background-position: 100% 50%;
    background-size: 200% 200%;
  }
}

@keyframes gradient-rotate {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

@keyframes gradient-slide {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.gradient-text-animated {
  background-size: 200% 200%;
}

.gradient-wave {
  animation: gradient-wave var(--animation-duration, 3s) ease-in-out infinite;
}

.gradient-pulse {
  animation: gradient-pulse var(--animation-duration, 3s) ease-in-out infinite;
}

.gradient-rotate {
  animation: gradient-rotate var(--animation-duration, 3s) linear infinite;
}

.gradient-slide {
  animation: gradient-slide var(--animation-duration, 3s) linear infinite;
  background-size: 200% auto;
}
`;
