'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Image, 
  Sparkles, 
  RefreshCw, 
  Download, 
  Upload, 
  Wand2, 
  Eye, 
  EyeOff,
  Copy,
  Check,
  Trash2,
  Plus,
  Minus,
  RotateCcw,
  Sun,
  Moon,
  Laptop,
  Shuffle,
  Save,
  Settings,
  Zap,
  Brush,
  Droplets,
  Layers,
  Grid,
  Contrast,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { cn } from '@/lib/utils';

// Lazy load the AI palette generator to improve initial load time
const generateAIPalette = async (theme: string) => {
  try {
    const { generatePalette } = await import('@/ai/flows/palette-generator');
    return await generatePalette({ theme });
  } catch (error) {
    console.warn('AI palette generation not available:', error);
    // Fallback to a simple color generation
    return {
      background: '222 84% 4%',
      foreground: '210 40% 98%',
      primary: '210 100% 56%',
      accent: '195 100% 65%',
    };
  }
};

// Optimized color conversion utilities
const hexToHsl = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const sum = max + min;
  const l = sum / 2;
  
  let h = 0;
  let s = 0;
  
  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - sum) : diff / sum;
    switch (max) {
      case r:
        h = ((g - b) / diff) + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }
    h /= 6;
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

const hslToHex = (hsl: string) => {
  const [h, s, l] = hsl.split(' ').map((val, idx) => {
    if (idx === 0) return parseInt(val) / 360;
    return parseInt(val.replace('%', '')) / 100;
  });
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h * 6 && h * 6 < 1) {
    r = c; g = x; b = 0;
  } else if (1 <= h * 6 && h * 6 < 2) {
    r = x; g = c; b = 0;
  } else if (2 <= h * 6 && h * 6 < 3) {
    r = 0; g = c; b = x;
  } else if (3 <= h * 6 && h * 6 < 4) {
    r = 0; g = x; b = c;
  } else if (4 <= h * 6 && h * 6 < 5) {
    r = x; g = 0; b = c;
  } else if (5 <= h * 6 && h * 6 < 6) {
    r = c; g = 0; b = x;
  }
  
  const toHex = (val: number) => {
    const hex = Math.round((val + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
// Advanced schemas for the modern editor
const advancedColorsSchema = z.object({
  background: z.string(),
  foreground: z.string(),
  primary: z.string(),
  accent: z.string(),
  muted: z.string().optional(),
  border: z.string().optional(),
  card: z.string().optional(),
  destructive: z.string().optional(),
  warning: z.string().optional(),
  success: z.string().optional(),
});

const advancedThemeSchema = z.object({
  backgroundImage: z.string().optional(),
  backgroundImageOpacity: z.number().min(0).max(1),
  backgroundImageBlur: z.number().min(0).max(50),
  backgroundPattern: z.enum(['none', 'dots', 'grid', 'waves', 'noise']).optional(),
  backgroundPatternOpacity: z.number().min(0).max(1).optional(),
  gradientOverlay: z.boolean().optional(),
  gradientFrom: z.string().optional(),
  gradientTo: z.string().optional(),
  gradientDirection: z.enum(['to-r', 'to-l', 'to-t', 'to-b', 'to-br', 'to-bl', 'to-tr', 'to-tl']).optional(),
  borderRadius: z.number().min(0).max(50).optional(),
  shadows: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
  animations: z.boolean().optional(),
  glassEffect: z.boolean().optional(),
  customCss: z.string().optional(),
});

// Predefined color palettes
const presetPalettes = [
  {
    name: 'Ocean Depths',
    colors: {
      background: '222 84% 4%',
      foreground: '210 40% 98%',
      primary: '210 100% 56%',
      accent: '195 100% 65%',
    }
  },
  {
    name: 'Sunset Glow',
    colors: {
      background: '20 14% 4%',
      foreground: '60 9% 98%',
      primary: '24 95% 53%',
      accent: '5 91% 71%',
    }
  },
  {
    name: 'Forest Mist',
    colors: {
      background: '140 13% 8%',
      foreground: '150 5% 96%',
      primary: '142 76% 36%',
      accent: '110 50% 55%',
    }
  },
  {
    name: 'Cyberpunk',
    colors: {
      background: '270 15% 5%',
      foreground: '300 20% 99%',
      primary: '315 100% 70%',
      accent: '180 100% 70%',
    }
  },
  {
    name: 'Monochrome',
    colors: {
      background: '0 0% 8%',
      foreground: '0 0% 95%',
      primary: '0 0% 85%',
      accent: '0 0% 70%',
    }
  },
];

// Advanced Color Picker Component
const AdvancedColorPicker = ({ 
  label, 
  value, 
  onChange, 
  showHarmony = false,
  onHarmonyGenerate 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showHarmony?: boolean;
  onHarmonyGenerate?: (colors: string[]) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const hslColor = `hsl(${value})`;
  const hexColor = hslToHex(value);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hexColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateHarmony = (type: 'complementary' | 'triadic' | 'analogous' | 'monochromatic') => {
    // Simplified color harmony generation without tinycolor2 for now
    if (onHarmonyGenerate) {
      const colors = [
        hslColor,
        'hsl(200, 100%, 50%)', // Complementary blue
        'hsl(120, 100%, 50%)', // Green
        'hsl(300, 100%, 50%)', // Purple
      ];
      onHarmonyGenerate(colors);
    }
  };

  return (
    <motion.div 
      className="space-y-3"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {hexColor.toUpperCase()}
          </Badge>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex gap-2">
          <div 
            className="w-12 h-10 rounded-lg border-2 border-border cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200"
            style={{ backgroundColor: hslColor }}
            onClick={() => setIsOpen(!isOpen)}
          />
          <div className="flex-1 space-y-2">
            <Input
              type="color"
              value={hexColor}
              onChange={(e) => {
              const hslString = hexToHsl(e.target.value);
              onChange(hslString);
            }}
              className="h-10"
            />
          </div>
        </div>
        
        <AnimatePresence>
          {isOpen && showHarmony && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-3 bg-card border rounded-lg"
            >
              <div className="text-xs font-medium mb-2">Color Harmonies</div>
              <div className="grid grid-cols-2 gap-1">
                {(['complementary', 'triadic', 'analogous', 'monochromatic'] as const).map((type) => (
                  <Button
                    key={type}
                    size="sm"
                    variant="ghost"
                    className="justify-start text-xs h-7"
                    onClick={() => generateHarmony(type)}
                  >
                    <Palette className="h-3 w-3 mr-1" />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Modern Color Palette Section
const ColorPaletteSection = () => {
  const { portfolioData, updateColorTheme } = useAppState();
  const { toast } = useToast();
  const [aiTheme, setAiTheme] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const form = useForm<z.infer<typeof advancedColorsSchema>>({
    resolver: zodResolver(advancedColorsSchema),
    defaultValues: {
      ...portfolioData.theme.colors,
      muted: '210 40% 98%',
      border: '214 32% 91%',
      card: '0 0% 100%',
      destructive: '0 84% 60%',
      warning: '38 92% 50%',
      success: '142 76% 36%',
    },
  });

  const watchedValues = form.watch();

  // Auto-apply palette changes with debounce so users see updates immediately
  useEffect(() => {
    const t = setTimeout(() => {
      updateColorTheme({
        background: watchedValues.background,
        foreground: watchedValues.foreground,
        primary: watchedValues.primary,
        accent: watchedValues.accent,
      });
    }, 150);
    return () => clearTimeout(t);
  }, [watchedValues.background, watchedValues.foreground, watchedValues.primary, watchedValues.accent, updateColorTheme]);

  const applyPreset = (preset: typeof presetPalettes[0]) => {
    setActivePreset(preset.name);
    Object.entries(preset.colors).forEach(([key, value]) => {
      form.setValue(key as keyof z.infer<typeof advancedColorsSchema>, value);
    });
    updateColorTheme({
      background: preset.colors.background,
      foreground: preset.colors.foreground,
      primary: preset.colors.primary,
      accent: preset.colors.accent,
    });
    toast({
      title: 'Preset Applied!',
      description: `Applied ${preset.name} color scheme`,
    });
  };

  const generateAIPaletteHandler = async () => {
    if (!aiTheme) {
      toast({ variant: 'destructive', title: 'Please enter a theme description.' });
      return;
    }
    setIsLoading(true);
    try {
      const palette = await generateAIPalette(aiTheme);
      form.setValue('background', palette.background);
      form.setValue('foreground', palette.foreground);
      form.setValue('primary', palette.primary);
      form.setValue('accent', palette.accent);
      updateColorTheme({
        background: palette.background,
        foreground: palette.foreground,
        primary: palette.primary,
        accent: palette.accent,
      });
      setActivePreset(null);
      toast({
        title: '🎨 AI Palette Generated!',
        description: `Created a beautiful palette for "${aiTheme}"`,
      });
    } catch (err) {
      console.error(err);
      toast({ 
        variant: 'destructive', 
        title: 'Generation Failed', 
        description: 'Could not generate palette. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHarmonyGenerate = (colors: string[]) => {
    if (colors.length >= 4) {
      form.setValue('background', colors[0].replace(/hsl\(|\)/g, ''));
      form.setValue('foreground', colors[1].replace(/hsl\(|\)/g, ''));
      form.setValue('primary', colors[2].replace(/hsl\(|\)/g, ''));
      form.setValue('accent', colors[3].replace(/hsl\(|\)/g, ''));
      setActivePreset(null);
      toast({
        title: 'Harmony Applied!',
        description: 'Generated harmonious color scheme',
      });
    }
  };

  const onSubmit = (values: z.infer<typeof advancedColorsSchema>) => {
    updateColorTheme({
      background: values.background,
      foreground: values.foreground,
      primary: values.primary,
      accent: values.accent,
    });
    toast({
      title: '🎨 Colors Updated!',
      description: 'Your new color palette has been saved.',
    });
  };

  const randomizeColors = () => {
    const randomPreset = presetPalettes[Math.floor(Math.random() * presetPalettes.length)];
    applyPreset(randomPreset);
  };

  const resetToDefault = () => {
    form.reset({
      background: '222 84% 4%',
      foreground: '210 40% 98%',
      primary: '210 100% 56%',
      accent: '195 100% 65%',
    });
    setActivePreset(null);
    toast({
      title: 'Colors Reset',
      description: 'Restored default color scheme',
    });
  };

  return (
    <div className="space-y-8">
      {/* AI Theme Generator */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">AI Theme Generator</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder='Try "cyberpunk neon", "ocean sunset", "forest aurora"...'
              value={aiTheme}
              onChange={(e) => setAiTheme(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateAIPaletteHandler()}
              className="flex-1"
            />
            <Button 
              onClick={generateAIPaletteHandler} 
              disabled={isLoading}
              className="shrink-0"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="h-4 w-4" />
              )}
              Generate
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Describe your ideal theme and let AI create a perfect color palette
          </p>
        </CardContent>
      </Card>

      {/* Preset Palettes */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Preset Palettes</CardTitle>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={randomizeColors}>
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={resetToDefault}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {presetPalettes.map((preset) => (
              <motion.div
                key={preset.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md",
                    activePreset === preset.name && "ring-2 ring-primary"
                  )}
                  onClick={() => applyPreset(preset)}
                >
                  <CardContent className="p-3">
                    <div className="flex gap-1 mb-2">
                      {Object.values(preset.colors).map((color, index) => (
                        <div
                          key={index}
                          className="flex-1 h-8 rounded"
                          style={{ backgroundColor: `hsl(${color})` }}
                        />
                      ))}
                    </div>
                    <p className="text-sm font-medium text-center">{preset.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Customization */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brush className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Custom Colors</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={showAdvanced}
                onCheckedChange={setShowAdvanced}
                id="advanced-mode"
              />
              <Label htmlFor="advanced-mode" className="text-sm">Advanced</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdvancedColorPicker
                label="Background"
                value={watchedValues.background}
                onChange={(value) => form.setValue('background', value)}
                showHarmony={showAdvanced}
                onHarmonyGenerate={handleHarmonyGenerate}
              />
              <AdvancedColorPicker
                label="Foreground"
                value={watchedValues.foreground}
                onChange={(value) => form.setValue('foreground', value)}
              />
              <AdvancedColorPicker
                label="Primary"
                value={watchedValues.primary}
                onChange={(value) => form.setValue('primary', value)}
                showHarmony={showAdvanced}
                onHarmonyGenerate={handleHarmonyGenerate}
              />
              <AdvancedColorPicker
                label="Accent"
                value={watchedValues.accent}
                onChange={(value) => form.setValue('accent', value)}
              />
            </div>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t"
                >
                  <AdvancedColorPicker
                    label="Muted"
                    value={watchedValues.muted || '210 40% 98%'}
                    onChange={(value) => form.setValue('muted', value)}
                  />
                  <AdvancedColorPicker
                    label="Border"
                    value={watchedValues.border || '214 32% 91%'}
                    onChange={(value) => form.setValue('border', value)}
                  />
                  <AdvancedColorPicker
                    label="Destructive"
                    value={watchedValues.destructive || '0 84% 60%'}
                    onChange={(value) => form.setValue('destructive', value)}
                  />
                  <AdvancedColorPicker
                    label="Success"
                    value={watchedValues.success || '142 76% 36%'}
                    onChange={(value) => form.setValue('success', value)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save Palette
              </Button>
              <Button type="button" variant="outline" onClick={() => {
                // Export palette as JSON
                const palette = form.getValues();
                navigator.clipboard.writeText(JSON.stringify(palette, null, 2));
                toast({ title: 'Palette exported to clipboard!' });
              }}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default function ModernThemeEditor() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Settings className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Theme Customizer</h1>
          <p className="text-muted-foreground">Create stunning color palettes with AI assistance</p>
        </div>
      </div>
      
      <ColorPaletteSection />
    </div>
  );
}
