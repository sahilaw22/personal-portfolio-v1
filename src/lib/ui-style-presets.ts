import type { UIStyleSettings } from '@/lib/types';

export type UIStylePreset = UIStyleSettings & { description: string; tags: string[] };

export const uiStylePresets: UIStylePreset[] = [
  {
    id: 'clean-minimal',
    title: 'Clean Minimal',
    description: 'Crisp borders, balanced spacing, subtle animations.',
    tags: ['minimal','clean'],
    buttonVariantDefault: 'default',
    buttonShape: 'rounded',
    cardBorder: 'thin',
    headingStyle: 'clean',
    animationLevel: 'subtle',
    accentGradient: false,
  },
  {
    id: 'glass-soft',
    title: 'Glass Soft',
    description: 'Glassmorphism with soft blurs and accent gradient.',
    tags: ['glass','modern'],
    buttonVariantDefault: 'outline',
    buttonShape: 'pill',
    cardBorder: 'none',
    headingStyle: 'clean',
    animationLevel: 'subtle',
    accentGradient: true,
  },
  {
    id: 'bold-brutalist',
    title: 'Bold Brutalist',
    description: 'Hard edges, thick borders, big type.',
    tags: ['brutalist','bold'],
    buttonVariantDefault: 'secondary',
    buttonShape: 'sharp',
    cardBorder: 'thick',
    headingStyle: 'all-caps',
    animationLevel: 'none',
    accentGradient: false,
  },
  {
    id: 'playful-accent',
    title: 'Playful Accent',
    description: 'Rounded pills, playful animations, gradient accents.',
    tags: ['playful','accent'],
    buttonVariantDefault: 'accent',
    buttonShape: 'pill',
    cardBorder: 'thin',
    headingStyle: 'underline',
    animationLevel: 'playful',
    accentGradient: true,
  },
];

export default uiStylePresets;
