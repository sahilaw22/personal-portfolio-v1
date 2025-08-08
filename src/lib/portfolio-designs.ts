import { PortfolioDesign } from '@/lib/portfolio-design-types';

// 10 curated pairs (light & dark) with modern aesthetics
export const portfolioDesigns: PortfolioDesign[] = [
  {
    id: 'neo-minimal',
    title: 'Neo Minimal',
    description: 'Clean, typography-first, generous whitespace.',
    tags: ['minimal', 'modern', 'typography'],
    light: {
      colors: {
        background: '210 40% 98%',
        foreground: '222 84% 5%',
        primary: '222 89% 55%',
        accent: '3 98% 58%',
      },
      heroBackground: {
        type: 'radial', from: '222 89% 55%', to: '210 40% 98%', fromSize: 40, toSize: 80, fromOpacity: 0.35, toOpacity: 0.1, animationType: 'pulse', animationSpeed: 0.6, shape: 'circle', intensity: 50,
      },
      nameFont: 'font-inter',
    },
    dark: {
      colors: {
        background: '222 84% 5%',
        foreground: '210 40% 98%',
        primary: '210 90% 60%',
        accent: '346 77% 50%',
      },
      heroBackground: {
        type: 'radial', from: '210 90% 60%', to: '222 84% 5%', fromSize: 55, toSize: 85, fromOpacity: 0.45, toOpacity: 0.15, animationType: 'float', animationSpeed: 0.5, shape: 'circle', intensity: 65,
      },
      nameFont: 'font-headline',
    },
  },
  {
    id: 'sunset-glow',
    title: 'Sunset Glow',
    description: 'Warm oranges and pinks with soft radiant glows.',
    tags: ['warm', 'vibrant', 'glow'],
    light: {
      colors: { background: '18 100% 98%', foreground: '20 30% 10%', primary: '14 90% 55%', accent: '340 80% 60%' },
      heroBackground: { type: 'conic', from: '14 90% 55%', to: '340 80% 60%', fromSize: 45, toSize: 80, fromOpacity: 0.4, toOpacity: 0.15, rotation: 25, animationType: 'rotate', animationSpeed: 0.7, shape: 'ellipse', intensity: 60 },
      nameFont: 'font-lora',
    },
    dark: {
      colors: { background: '20 30% 10%', foreground: '18 100% 98%', primary: '18 91% 60%', accent: '330 92% 66%' },
      heroBackground: { type: 'conic', from: '18 91% 60%', to: '330 92% 66%', fromSize: 50, toSize: 85, fromOpacity: 0.5, toOpacity: 0.2, rotation: 20, animationType: 'rotate', animationSpeed: 0.5, shape: 'ellipse', intensity: 70 },
      nameFont: 'font-libre-baskerville',
    },
  },
  {
    id: 'cyberpunk',
    title: 'Cyberpunk Neon',
    description: 'High contrast with neon accents and dark surfaces.',
    tags: ['neon', 'dark', 'tech'],
    light: {
      colors: { background: '240 33% 98%', foreground: '240 25% 10%', primary: '310 95% 55%', accent: '180 90% 45%' },
      heroBackground: { type: 'mesh', from: '310 95% 55%', to: '180 90% 45%', via: '250 95% 60%', fromSize: 40, toSize: 40, viaSize: 40, fromOpacity: 0.35, toOpacity: 0.35, viaOpacity: 0.35, animationType: 'wave', animationSpeed: 0.8, blendMode: 'screen', shape: 'polygon', intensity: 60 },
      nameFont: 'font-anton',
    },
    dark: {
      colors: { background: '240 20% 8%', foreground: '210 40% 96%', primary: '300 95% 60%', accent: '170 85% 55%' },
      heroBackground: { type: 'mesh', from: '300 95% 60%', to: '170 85% 55%', via: '260 90% 60%', fromSize: 50, toSize: 50, viaSize: 50, fromOpacity: 0.5, toOpacity: 0.5, viaOpacity: 0.5, animationType: 'wave', animationSpeed: 0.6, blendMode: 'screen', shape: 'polygon', intensity: 75 },
      nameFont: 'font-anton',
    },
  },
  {
    id: 'pastel-dream',
    title: 'Pastel Dream',
    description: 'Soft pastels with airy gradients and gentle contrast.',
    tags: ['pastel', 'soft', 'calm'],
    light: {
      colors: { background: '220 40% 99%', foreground: '222 25% 12%', primary: '260 95% 70%', accent: '180 70% 60%' },
      heroBackground: { type: 'gradient', from: '260 95% 70%', to: '180 70% 60%', fromSize: 60, toSize: 80, fromOpacity: 0.25, toOpacity: 0.15, animationType: 'pulse', animationSpeed: 0.6, shape: 'ellipse', intensity: 40 },
      nameFont: 'font-eb-garamond',
    },
    dark: {
      colors: { background: '230 30% 12%', foreground: '210 40% 96%', primary: '250 90% 70%', accent: '170 70% 65%' },
      heroBackground: { type: 'gradient', from: '250 90% 70%', to: '170 70% 65%', fromSize: 70, toSize: 85, fromOpacity: 0.35, toOpacity: 0.2, animationType: 'float', animationSpeed: 0.5, shape: 'ellipse', intensity: 55 },
      nameFont: 'font-lora',
    },
  },
  {
    id: 'mono-pro',
    title: 'Monochrome Pro',
    description: 'Elegant grayscale with a single accent color.',
    tags: ['monochrome', 'elegant', 'pro'],
    light: {
      colors: { background: '0 0% 99%', foreground: '225 10% 10%', primary: '210 80% 45%', accent: '225 8% 40%' },
      heroBackground: { type: 'radial', from: '210 80% 45%', to: '0 0% 99%', fromSize: 35, toSize: 85, fromOpacity: 0.25, toOpacity: 0.08, animationType: 'none', shape: 'circle', intensity: 35 },
      nameFont: 'font-inter',
    },
    dark: {
      colors: { background: '225 12% 8%', foreground: '0 0% 98%', primary: '210 90% 60%', accent: '225 6% 30%' },
      heroBackground: { type: 'radial', from: '210 90% 60%', to: '225 12% 8%', fromSize: 50, toSize: 85, fromOpacity: 0.4, toOpacity: 0.12, animationType: 'none', shape: 'circle', intensity: 50 },
      nameFont: 'font-inter',
    },
  },
  {
    id: 'forest-mist',
    title: 'Forest Mist',
    description: 'Nature-inspired greens and earthy neutrals.',
    tags: ['nature', 'calm', 'organic'],
    light: {
      colors: { background: '140 30% 98%', foreground: '140 25% 12%', primary: '150 45% 35%', accent: '30 70% 45%' },
      heroBackground: { type: 'radial', from: '150 45% 35%', to: '140 30% 98%', fromSize: 45, toSize: 85, fromOpacity: 0.25, toOpacity: 0.1, animationType: 'pulse', animationSpeed: 0.6, shape: 'ellipse', intensity: 45 },
      nameFont: 'font-lora',
    },
    dark: {
      colors: { background: '150 25% 10%', foreground: '140 30% 92%', primary: '150 40% 45%', accent: '28 70% 55%' },
      heroBackground: { type: 'radial', from: '150 40% 45%', to: '150 25% 10%', fromSize: 55, toSize: 90, fromOpacity: 0.45, toOpacity: 0.15, animationType: 'float', animationSpeed: 0.5, shape: 'ellipse', intensity: 60 },
      nameFont: 'font-libre-baskerville',
    },
  },
  {
    id: 'ocean-breeze',
    title: 'Ocean Breeze',
    description: 'Cool blues with airy gradients and crisp contrast.',
    tags: ['cool', 'calm', 'professional'],
    light: {
      colors: { background: '208 100% 99%', foreground: '222 55% 10%', primary: '205 90% 50%', accent: '188 80% 45%' },
      heroBackground: { type: 'gradient', from: '205 90% 50%', to: '188 80% 45%', fromSize: 55, toSize: 85, fromOpacity: 0.3, toOpacity: 0.12, animationType: 'pulse', animationSpeed: 0.6, shape: 'ellipse', intensity: 50 },
      nameFont: 'font-inter',
    },
    dark: {
      colors: { background: '220 40% 8%', foreground: '208 100% 98%', primary: '200 92% 55%', accent: '185 75% 55%' },
      heroBackground: { type: 'gradient', from: '200 92% 55%', to: '185 75% 55%', fromSize: 65, toSize: 90, fromOpacity: 0.45, toOpacity: 0.2, animationType: 'float', animationSpeed: 0.5, shape: 'ellipse', intensity: 65 },
      nameFont: 'font-inter',
    },
  },
  {
    id: 'retro-vibes',
    title: 'Retro Vibes',
    description: 'Playful retro palette with bold shapes.',
    tags: ['retro', 'playful', 'bold'],
    light: {
      colors: { background: '48 100% 98%', foreground: '36 40% 12%', primary: '12 85% 55%', accent: '200 75% 45%' },
      heroBackground: { type: 'mesh', from: '12 85% 55%', to: '200 75% 45%', via: '50 90% 60%', fromSize: 40, toSize: 40, viaSize: 40, fromOpacity: 0.3, toOpacity: 0.3, viaOpacity: 0.3, animationType: 'wave', animationSpeed: 0.8, shape: 'polygon', intensity: 55 },
      nameFont: 'font-pacifico',
    },
    dark: {
      colors: { background: '36 40% 12%', foreground: '48 100% 98%', primary: '15 90% 60%', accent: '195 80% 50%' },
      heroBackground: { type: 'mesh', from: '15 90% 60%', to: '195 80% 50%', via: '55 85% 55%', fromSize: 50, toSize: 50, viaSize: 50, fromOpacity: 0.45, toOpacity: 0.45, viaOpacity: 0.45, animationType: 'wave', animationSpeed: 0.6, shape: 'polygon', intensity: 70 },
      nameFont: 'font-pacifico',
    },
  },
  {
    id: 'brutalist-edge',
    title: 'Brutalist Edge',
    description: 'Strong grids, high contrast, assertive accent.',
    tags: ['brutalist', 'grid', 'bold'],
    light: {
      colors: { background: '0 0% 99%', foreground: '220 10% 10%', primary: '0 80% 40%', accent: '220 8% 45%' },
      heroBackground: { type: 'conic', from: '0 80% 40%', to: '220 8% 45%', fromSize: 35, toSize: 80, fromOpacity: 0.35, toOpacity: 0.12, rotation: 15, animationType: 'none', shape: 'square', intensity: 45 },
      nameFont: 'font-anton',
    },
    dark: {
      colors: { background: '220 10% 8%', foreground: '0 0% 98%', primary: '0 85% 55%', accent: '220 6% 35%' },
      heroBackground: { type: 'conic', from: '0 85% 55%', to: '220 6% 35%', fromSize: 45, toSize: 85, fromOpacity: 0.5, toOpacity: 0.18, rotation: 10, animationType: 'none', shape: 'square', intensity: 65 },
      nameFont: 'font-anton',
    },
  },
  {
    id: 'glassmorphic',
    title: 'Glassmorphic Frost',
    description: 'Frosted glass feel with gentle, luminous colors.',
    tags: ['glassmorphism', 'luminous', 'soft'],
    light: {
      colors: { background: '220 40% 98%', foreground: '222 25% 12%', primary: '220 85% 55%', accent: '280 75% 60%' },
      heroBackground: { type: 'radial', from: '280 75% 60%', to: '220 40% 98%', fromSize: 50, toSize: 85, fromOpacity: 0.28, toOpacity: 0.1, animationType: 'pulse', shape: 'circle', intensity: 48 },
      nameFont: 'font-inter',
    },
    dark: {
      colors: { background: '222 20% 10%', foreground: '210 40% 96%', primary: '220 90% 60%', accent: '280 80% 65%' },
      heroBackground: { type: 'radial', from: '280 80% 65%', to: '222 20% 10%', fromSize: 60, toSize: 90, fromOpacity: 0.45, toOpacity: 0.15, animationType: 'pulse', shape: 'circle', intensity: 68 },
      nameFont: 'font-inter',
    },
  },
  {
    id: 'zen-serif',
    title: 'Zen Serif',
    description: 'Editorial style with refined serif typography.',
    tags: ['editorial', 'serif', 'calm'],
    light: {
      colors: { background: '45 30% 98%', foreground: '25 20% 14%', primary: '20 70% 40%', accent: '200 35% 35%' },
      heroBackground: { type: 'gradient', from: '20 70% 40%', to: '200 35% 35%', fromSize: 50, toSize: 80, fromOpacity: 0.25, toOpacity: 0.12, animationType: 'none', shape: 'ellipse', intensity: 42 },
      nameFont: 'font-libre-baskerville',
    },
    dark: {
      colors: { background: '25 20% 12%', foreground: '45 30% 96%', primary: '22 65% 55%', accent: '200 30% 45%' },
      heroBackground: { type: 'gradient', from: '22 65% 55%', to: '200 30% 45%', fromSize: 60, toSize: 90, fromOpacity: 0.4, toOpacity: 0.16, animationType: 'none', shape: 'ellipse', intensity: 60 },
      nameFont: 'font-eb-garamond',
    },
  },
];

export default portfolioDesigns;
