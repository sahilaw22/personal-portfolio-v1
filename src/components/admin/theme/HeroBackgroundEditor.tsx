
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  Zap, 
  Palette, 
  RefreshCw, 
  Eye, 
  EyeOff,
  Copy,
  Check,
  Shuffle,
  Save,
  Settings,
  Sun,
  Moon,
  Stars,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Layers,
  Move3D
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { HeroBackground } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const formSchema = z.object({
  type: z.enum(['solid', 'gradient', 'radial', 'conic', 'mesh']),
  from: z.string().min(4, 'Color is required'),
  to: z.string(),
  via: z.string().optional(),
  fromSize: z.number().min(10).max(200),
  toSize: z.number().min(10).max(200),
  viaSize: z.number().min(10).max(200).optional(),
  fromOpacity: z.number().min(0).max(1),
  toOpacity: z.number().min(0).max(1),
  viaOpacity: z.number().min(0).max(1).optional(),
  rotation: z.number().min(0).max(360).optional(),
  animationType: z.enum(['none', 'pulse', 'rotate', 'float', 'wave']).optional(),
  animationSpeed: z.number().min(0.5).max(5).optional(),
  blendMode: z.enum(['normal', 'multiply', 'screen', 'overlay', 'soft-light']).optional(),
  shape: z.enum(['circle', 'ellipse', 'square', 'polygon']).optional(),
  intensity: z.number().min(0).max(100).optional(),
});

type HeroBackgroundFormData = z.infer<typeof formSchema>;

// Preset glow configurations
const glowPresets = [
  {
    name: 'Ocean Wave',
    config: {
      type: 'gradient' as const,
      from: '#0EA5E9',
      to: '#06B6D4',
      fromSize: 60,
      toSize: 40,
      fromOpacity: 0.8,
      toOpacity: 0.4,
      animationType: 'wave' as const,
      animationSpeed: 2,
    }
  },
  {
    name: 'Sunset Glow',
    config: {
      type: 'radial' as const,
      from: '#F59E0B',
      to: '#EF4444',
      fromSize: 80,
      toSize: 50,
      fromOpacity: 0.7,
      toOpacity: 0.3,
      animationType: 'pulse' as const,
      animationSpeed: 3,
    }
  },
  {
    name: 'Aurora',
    config: {
      type: 'mesh' as const,
      from: '#8B5CF6',
      to: '#06B6D4',
      via: '#10B981',
      fromSize: 70,
      toSize: 60,
      viaSize: 50,
      fromOpacity: 0.6,
      toOpacity: 0.4,
      viaOpacity: 0.5,
      animationType: 'float' as const,
      animationSpeed: 1.5,
    }
  },
  {
    name: 'Neon Pulse',
    config: {
      type: 'conic' as const,
      from: '#EC4899',
      to: '#8B5CF6',
      fromSize: 90,
      toSize: 70,
      fromOpacity: 0.8,
      toOpacity: 0.6,
      animationType: 'rotate' as const,
      animationSpeed: 4,
    }
  },
];

const hexToRgba = (hex: string, opacity: number) => {
    let c: any;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opacity+')';
    }
    return `rgba(255, 255, 255, ${opacity})`;
}

// Enhanced Glow Preview Component
const EnhancedGlowPreview = ({ background }: { background: HeroBackgroundFormData }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [copied, setCopied] = useState(false);
    
    const fromColorWithOpacity = hexToRgba(background.from, background.fromOpacity);
    const toColorWithOpacity = hexToRgba(background.to, background.toOpacity);
    const viaColorWithOpacity = background.via ? hexToRgba(background.via, background.viaOpacity || 0.5) : null;

    const generateGlowStyle = (): React.CSSProperties => {
      let backgroundStyle = {};
      
      switch (background.type) {
        case 'solid':
          backgroundStyle = { background: fromColorWithOpacity };
          break;
        case 'gradient':
          backgroundStyle = {
            background: `linear-gradient(45deg, ${fromColorWithOpacity}, ${toColorWithOpacity})`
          };
          break;
        case 'radial':
          backgroundStyle = {
            background: `radial-gradient(ellipse ${background.fromSize}% ${background.fromSize}% at 50% 50%, ${fromColorWithOpacity}, transparent 70%),
                        radial-gradient(ellipse ${background.toSize}% ${background.toSize}% at 60% 40%, ${toColorWithOpacity}, transparent 70%)`
          };
          break;
        case 'conic':
          backgroundStyle = {
            background: `conic-gradient(from ${background.rotation || 0}deg at 50% 50%, ${fromColorWithOpacity}, ${toColorWithOpacity}, ${fromColorWithOpacity})`
          };
          break;
        case 'mesh':
          backgroundStyle = {
            background: `
              radial-gradient(ellipse ${background.fromSize}% ${background.fromSize}% at 25% 25%, ${fromColorWithOpacity}, transparent 50%),
              radial-gradient(ellipse ${background.toSize}% ${background.toSize}% at 75% 75%, ${toColorWithOpacity}, transparent 50%)
              ${viaColorWithOpacity ? `, radial-gradient(ellipse ${background.viaSize}% ${background.viaSize}% at 50% 50%, ${viaColorWithOpacity}, transparent 50%)` : ''}
            `
          };
          break;
        default:
          backgroundStyle = { background: fromColorWithOpacity };
      }
      
      return {
        ...backgroundStyle,
        mixBlendMode: background.blendMode || 'normal',
        filter: 'blur(40px)',
      } as React.CSSProperties;
    };

    const getAnimationClass = () => {
      switch (background.animationType) {
        case 'pulse':
          return 'animate-pulse';
        case 'float':
          return 'animate-bounce';
        default:
          return '';
      }
    };

    const copyGlowConfig = async () => {
      await navigator.clipboard.writeText(JSON.stringify(background, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Glow Preview</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {background.type.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={copyGlowConfig}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full aspect-video flex items-center justify-center rounded-xl bg-gradient-to-br from-card to-card/50 overflow-hidden border"
              >
                {/* Glow Effect */}
                <motion.div 
                  className={cn("w-full h-full absolute inset-0", getAnimationClass())}
                  style={generateGlowStyle()}
                  animate={background.animationType === 'rotate' ? {
                    rotate: 360
                  } : background.animationType === 'wave' ? {
                    x: [0, 10, -10, 0],
                    y: [0, -5, 5, 0]
                  } : {}}
                  transition={background.animationType !== 'none' ? {
                    duration: background.animationSpeed || 2,
                    repeat: Infinity,
                    ease: "linear"
                  } : {}}
                />
                
                {/* Content Overlay */}
                <div className="relative z-10 text-center p-8">
                  <motion.div 
                    className="w-20 h-20 bg-foreground/10 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center border border-foreground/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-primary rounded-full shadow-lg" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground/90">Profile Avatar</h3>
                  <p className="text-sm text-muted-foreground">
                    This glow will appear behind your profile picture
                  </p>
                </div>
                
                {/* Intensity Indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg px-2 py-1">
                  <Zap className="h-3 w-3" />
                  <span className="text-xs font-medium">
                    {Math.round((background.fromOpacity + background.toOpacity) * 50)}%
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    );
};


export default function HeroBackgroundEditor() {
  const { portfolioData, updateHeroBackground } = useAppState();
  const { toast } = useToast();
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...portfolioData.theme.heroBackground,
      via: '#10B981',
      viaSize: 60,
      viaOpacity: 0.5,
      rotation: 0,
      animationType: 'none',
      animationSpeed: 2,
      blendMode: 'normal',
      shape: 'circle',
      intensity: 50,
    },
  });

  const watchedFormValues = form.watch();

  const applyPreset = (preset: typeof glowPresets[0]) => {
    setActivePreset(preset.name);
    Object.entries(preset.config).forEach(([key, value]) => {
      form.setValue(key as keyof z.infer<typeof formSchema>, value);
    });
    toast({
      title: 'Preset Applied!',
      description: `Applied ${preset.name} glow effect`,
    });
  };

  const randomizeGlow = () => {
    const randomPreset = glowPresets[Math.floor(Math.random() * glowPresets.length)];
    applyPreset(randomPreset);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert to the expected HeroBackground format
    const heroBackground: HeroBackground = {
      type: values.type === 'mesh' ? 'gradient' : values.type,
      from: values.from,
      to: values.to,
      fromSize: values.fromSize,
      toSize: values.toSize,
      fromOpacity: values.fromOpacity,
      toOpacity: values.toOpacity,
    };
    
    updateHeroBackground(heroBackground);
    toast({
      title: '✨ Glow Updated!',
      description: 'Your hero section glow effect has been saved.',
    });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Hero Glow Effects</h1>
            <p className="text-muted-foreground">Create stunning background glows for your profile</p>
          </div>
        </div>
        <Button variant="outline" onClick={randomizeGlow}>
          <Shuffle className="h-4 w-4 mr-2" />
          Random
        </Button>
      </div>

      {/* Preview */}
      <EnhancedGlowPreview background={watchedFormValues} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Presets */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Stars className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Glow Presets</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {glowPresets.map((preset) => (
                <motion.div
                  key={preset.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
                      activePreset === preset.name ? "border-primary bg-primary/5" : "border-transparent"
                    )}
                    onClick={() => applyPreset(preset)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{preset.name}</h4>
                          <p className="text-sm text-muted-foreground capitalize">
                            {preset.config.type} • {preset.config.animationType || 'static'}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: preset.config.from }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: preset.config.to }}
                          />
                          {preset.config.via && (
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: preset.config.via }}
                            />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Customize Glow</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Glow Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Glow Type
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: 'solid', icon: Circle, label: 'Solid' },
                            { value: 'gradient', icon: Square, label: 'Gradient' },
                            { value: 'radial', icon: Sun, label: 'Radial' },
                            { value: 'conic', icon: Triangle, label: 'Conic' },
                            { value: 'mesh', icon: Layers, label: 'Mesh' },
                          ].map((type) => (
                            <Button
                              key={type.value}
                              type="button"
                              variant={field.value === type.value ? 'default' : 'outline'}
                              size="sm"
                              className="flex flex-col h-16 p-2"
                              onClick={() => {
                                field.onChange(type.value);
                                setActivePreset(null);
                              }}
                            >
                              <type.icon className="h-4 w-4 mb-1" />
                              <span className="text-xs">{type.label}</span>
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Primary Color */}
                <div className="space-y-4">
                  <FormField 
                    control={form.control} 
                    name="from" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {watchedFormValues.type === 'solid' ? 'Glow Color' : 'Primary Color'}
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input 
                              type="color" 
                              {...field} 
                              className="w-16 h-10 p-1 rounded"
                            />
                            <Input 
                              type="text"
                              value={field.value}
                              onChange={field.onChange}
                              className="flex-1"
                              placeholder="#000000"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField 
                      control={form.control} 
                      name="fromSize" 
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size ({field.value}%)</FormLabel>
                          <FormControl>
                            <Slider 
                              min={10} 
                              max={200} 
                              step={1} 
                              value={[field.value]} 
                              onValueChange={(vals) => field.onChange(vals[0])} 
                            />
                          </FormControl>
                        </FormItem>
                      )} 
                    />

                    <FormField 
                      control={form.control} 
                      name="fromOpacity" 
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Opacity ({Math.round(field.value * 100)}%)</FormLabel>
                          <FormControl>
                            <Slider 
                              min={0} 
                              max={1} 
                              step={0.05} 
                              value={[field.value]} 
                              onValueChange={(vals) => field.onChange(vals[0])} 
                            />
                          </FormControl>
                        </FormItem>
                      )} 
                    />
                  </div>
                </div>

                {/* Secondary Color (for gradients) */}
                <AnimatePresence>
                  {watchedFormValues.type !== 'solid' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pt-4 border-t"
                    >
                      <FormField 
                        control={form.control} 
                        name="to" 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secondary Color</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input 
                                  type="color" 
                                  {...field} 
                                  className="w-16 h-10 p-1 rounded"
                                />
                                <Input 
                                  type="text"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="flex-1"
                                  placeholder="#ffffff"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField 
                          control={form.control} 
                          name="toSize" 
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Size ({field.value}%)</FormLabel>
                              <FormControl>
                                <Slider 
                                  min={10} 
                                  max={200} 
                                  step={1} 
                                  value={[field.value]} 
                                  onValueChange={(vals) => field.onChange(vals[0])} 
                                />
                              </FormControl>
                            </FormItem>
                          )} 
                        />

                        <FormField 
                          control={form.control} 
                          name="toOpacity" 
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Opacity ({Math.round(field.value * 100)}%)</FormLabel>
                              <FormControl>
                                <Slider 
                                  min={0} 
                                  max={1} 
                                  step={0.05} 
                                  value={[field.value]} 
                                  onValueChange={(vals) => field.onChange(vals[0])} 
                                />
                              </FormControl>
                            </FormItem>
                          )} 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Via Color (for mesh gradients) */}
                <AnimatePresence>
                  {watchedFormValues.type === 'mesh' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pt-4 border-t"
                    >
                      <FormField 
                        control={form.control} 
                        name="via" 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Third Color</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input 
                                  type="color" 
                                  value={field.value || '#10B981'}
                                  onChange={field.onChange}
                                  className="w-16 h-10 p-1 rounded"
                                />
                                <Input 
                                  type="text"
                                  value={field.value || '#10B981'}
                                  onChange={field.onChange}
                                  className="flex-1"
                                  placeholder="#10B981"
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )} 
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField 
                          control={form.control} 
                          name="viaSize" 
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Size ({field.value || 60}%)</FormLabel>
                              <FormControl>
                                <Slider 
                                  min={10} 
                                  max={200} 
                                  step={1} 
                                  value={[field.value || 60]} 
                                  onValueChange={(vals) => field.onChange(vals[0])} 
                                />
                              </FormControl>
                            </FormItem>
                          )} 
                        />

                        <FormField 
                          control={form.control} 
                          name="viaOpacity" 
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Opacity ({Math.round((field.value || 0.5) * 100)}%)</FormLabel>
                              <FormControl>
                                <Slider 
                                  min={0} 
                                  max={1} 
                                  step={0.05} 
                                  value={[field.value || 0.5]} 
                                  onValueChange={(vals) => field.onChange(vals[0])} 
                                />
                              </FormControl>
                            </FormItem>
                          )} 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animation Controls */}
                <div className="space-y-4 pt-4 border-t">
                  <FormField
                    control={form.control}
                    name="animationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Move3D className="h-4 w-4" />
                          Animation
                        </FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { value: 'none', label: 'None' },
                              { value: 'pulse', label: 'Pulse' },
                              { value: 'rotate', label: 'Rotate' },
                              { value: 'float', label: 'Float' },
                              { value: 'wave', label: 'Wave' },
                            ].map((anim) => (
                              <Button
                                key={anim.value}
                                type="button"
                                variant={field.value === anim.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => field.onChange(anim.value)}
                                className="text-xs"
                              >
                                {anim.label}
                              </Button>
                            ))}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <AnimatePresence>
                    {watchedFormValues.animationType !== 'none' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <FormField 
                          control={form.control} 
                          name="animationSpeed" 
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Animation Speed ({field.value || 2}s)</FormLabel>
                              <FormControl>
                                <Slider 
                                  min={0.5} 
                                  max={5} 
                                  step={0.1} 
                                  value={[field.value || 2]} 
                                  onValueChange={(vals) => field.onChange(vals[0])} 
                                />
                              </FormControl>
                            </FormItem>
                          )} 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Glow Effect
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
