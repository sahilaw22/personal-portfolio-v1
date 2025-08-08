'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Eye, 
  EyeOff,
  Layers,
  Grid,
  Waves,
  Sparkles,
  Contrast,
  Sun,
  Filter,
  Download,
  RefreshCw,
  Zap,
  Settings,
  Palette,
  Droplets,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Move3D,
  Blend,
  Moon
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { cn } from '@/lib/utils';

const backgroundSchema = z.object({
  backgroundImage: z.string().optional(),
  backgroundImageOpacity: z.number().min(0).max(1),
  backgroundImageBlur: z.number().min(0).max(50),
  backgroundPattern: z.enum(['none', 'dots', 'grid', 'waves', 'noise', 'hexagon', 'triangle']),
  backgroundPatternOpacity: z.number().min(0).max(1),
  backgroundPatternSize: z.number().min(10).max(200),
  gradientOverlay: z.boolean(),
  gradientFrom: z.string(),
  gradientTo: z.string(),
  gradientDirection: z.enum(['to-r', 'to-l', 'to-t', 'to-b', 'to-br', 'to-bl', 'to-tr', 'to-tl', 'radial']),
  gradientStops: z.number().min(2).max(5),
  borderRadius: z.number().min(0).max(50),
  glassEffect: z.boolean(),
  blendMode: z.enum(['normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard-light', 'color-dodge', 'color-burn']),
  animations: z.boolean(),
  parallaxEffect: z.boolean(),
  particleEffect: z.boolean(),
  particleCount: z.number().min(10).max(200),
  particleColor: z.string(),
});

type BackgroundFormData = z.infer<typeof backgroundSchema>;

// Background patterns generator
const generatePattern = (type: string, size: number, opacity: number, color: string = '#ffffff') => {
  const svgSize = size;
  const halfSize = size / 2;
  const quarterSize = size / 4;
  
  const patterns = {
    dots: `
      <svg width="${svgSize}" height="${svgSize}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${halfSize}" cy="${halfSize}" r="${quarterSize / 2}" fill="${color}" opacity="${opacity}"/>
      </svg>
    `,
    grid: `
      <svg width="${svgSize}" height="${svgSize}" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 0 L ${svgSize} 0 M 0 0 L 0 ${svgSize}" stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none"/>
      </svg>
    `,
    waves: `
      <svg width="${svgSize}" height="${svgSize}" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 ${halfSize} Q ${quarterSize} 0 ${halfSize} ${halfSize} T ${svgSize} ${halfSize}" stroke="${color}" stroke-width="2" opacity="${opacity}" fill="none"/>
      </svg>
    `,
    hexagon: `
      <svg width="${svgSize}" height="${svgSize}" xmlns="http://www.w3.org/2000/svg">
        <polygon points="${halfSize},2 ${svgSize-2},${quarterSize} ${svgSize-2},${svgSize-quarterSize} ${halfSize},${svgSize-2} 2,${svgSize-quarterSize} 2,${quarterSize}" stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none"/>
      </svg>
    `,
    triangle: `
      <svg width="${svgSize}" height="${svgSize}" xmlns="http://www.w3.org/2000/svg">
        <polygon points="${halfSize},2 ${svgSize-2},${svgSize-2} 2,${svgSize-2}" stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none"/>
      </svg>
    `,
    noise: `
      <svg width="${svgSize}" height="${svgSize}" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence baseFrequency="${0.9 / (size / 50)}" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix values="0 0 0 0 ${parseInt(color.slice(1,3), 16)/255} 0 0 0 0 ${parseInt(color.slice(3,5), 16)/255} 0 0 0 0 ${parseInt(color.slice(5,7), 16)/255} 0 0 0 ${opacity} 0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)"/>
      </svg>
    `,
  };
  
  return patterns[type as keyof typeof patterns] || patterns.dots;
};

// Advanced Background Preview
const BackgroundPreview = ({ config }: { config: BackgroundFormData }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const patternSvg = config.backgroundPattern !== 'none' 
    ? generatePattern(config.backgroundPattern, config.backgroundPatternSize, config.backgroundPatternOpacity, config.particleColor)
    : null;
  
  const patternDataUrl = patternSvg ? `data:image/svg+xml;base64,${btoa(patternSvg)}` : null;
  
  const backgroundStyle: React.CSSProperties = {
    position: 'relative',
    minHeight: '200px',
    borderRadius: `${config.borderRadius}px`,
    overflow: 'hidden',
    backdropFilter: config.glassEffect ? 'blur(10px) saturate(180%)' : undefined,
    backgroundColor: config.glassEffect ? 'rgba(255,255,255,0.1)' : undefined,
    border: config.glassEffect ? '1px solid rgba(255,255,255,0.2)' : undefined,
  };
  
  const imageStyle: React.CSSProperties = config.backgroundImage ? {
    backgroundImage: `url(${config.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: config.backgroundImageOpacity,
    filter: `blur(${config.backgroundImageBlur}px)`,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    mixBlendMode: config.blendMode as any,
  } : {};
  
  const patternStyle: React.CSSProperties = patternDataUrl ? {
    backgroundImage: `url(${patternDataUrl})`,
    backgroundRepeat: 'repeat',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  } : {};
  
  const gradientStyle: React.CSSProperties = config.gradientOverlay ? {
    background: config.gradientDirection === 'radial' 
      ? `radial-gradient(circle, ${config.gradientFrom}, ${config.gradientTo})`
      : `linear-gradient(${config.gradientDirection}, ${config.gradientFrom}, ${config.gradientTo})`,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    mixBlendMode: 'overlay',
    opacity: 0.8,
  } : {};

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Live Preview</CardTitle>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative"
            >
              <div style={backgroundStyle} className="flex items-center justify-center">
                {/* Background Image */}
                {config.backgroundImage && <div style={imageStyle} />}
                
                {/* Pattern Overlay */}
                {patternDataUrl && <div style={patternStyle} />}
                
                {/* Gradient Overlay */}
                {config.gradientOverlay && <div style={gradientStyle} />}
                
                {/* Content */}
                <div className="relative z-10 text-center p-8">
                  <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary rounded-full" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Your Portfolio</h3>
                  <p className="text-sm text-muted-foreground">This is how your background will look</p>
                </div>
                
                {/* Particle Effect Simulation */}
                {config.particleEffect && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: Math.min(config.particleCount / 10, 20) }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{ 
                          background: config.particleColor,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        } as React.CSSProperties}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

// Modern Background Controls
const BackgroundControls = () => {
  const { portfolioData, updateThemeSettings } = useAppState();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<BackgroundFormData>({
    resolver: zodResolver(backgroundSchema),
    defaultValues: {
      backgroundImage: portfolioData.theme.backgroundImage || '',
      backgroundImageOpacity: portfolioData.theme.backgroundImageOpacity || 0.1,
      backgroundImageBlur: portfolioData.theme.backgroundImageBlur || 5,
      backgroundPattern: 'none',
      backgroundPatternOpacity: 0.1,
      backgroundPatternSize: 50,
      gradientOverlay: false,
      gradientFrom: '#000000',
      gradientTo: '#ffffff',
      gradientDirection: 'to-br',
      gradientStops: 2,
      borderRadius: 0,
      glassEffect: false,
      blendMode: 'normal',
      animations: true,
      parallaxEffect: false,
      particleEffect: false,
      particleCount: 50,
      particleColor: '#ffffff',
    },
  });
  
  const watchedValues = form.watch();
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        form.setValue('backgroundImage', result);
        toast({
          title: 'Image Uploaded!',
          description: 'Background image has been loaded successfully.',
        });
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'Could not process the image file.',
      });
      setIsLoading(false);
    }
  };
  
  const removeBackgroundImage = () => {
    form.setValue('backgroundImage', '');
    toast({
      title: 'Image Removed',
      description: 'Background image has been cleared.',
    });
  };
  
  const onSubmit = (values: BackgroundFormData) => {
    updateThemeSettings({
      ...portfolioData.theme,
      backgroundImage: values.backgroundImage,
      backgroundImageOpacity: values.backgroundImageOpacity,
      backgroundImageBlur: values.backgroundImageBlur,
    });
    
    toast({
      title: '🎨 Background Updated!',
      description: 'Your new background settings have been saved.',
    });
  };
  
  const resetSettings = () => {
    form.reset();
    toast({
      title: 'Settings Reset',
      description: 'All background settings have been restored to defaults.',
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Background Image</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {isLoading ? 'Uploading...' : 'Upload Image'}
            </Button>
            {watchedValues.backgroundImage && (
              <Button
                variant="destructive"
                size="icon"
                onClick={removeBackgroundImage}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          {watchedValues.backgroundImage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Image Controls */}
              <div className="space-y-3">
                <div>
                  <Label className="text-sm flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    Opacity: {Math.round(watchedValues.backgroundImageOpacity * 100)}%
                  </Label>
                  <Slider
                    value={[watchedValues.backgroundImageOpacity]}
                    onValueChange={(values) => form.setValue('backgroundImageOpacity', values[0])}
                    min={0}
                    max={1}
                    step={0.05}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label className="text-sm flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Blur: {watchedValues.backgroundImageBlur}px
                  </Label>
                  <Slider
                    value={[watchedValues.backgroundImageBlur]}
                    onValueChange={(values) => form.setValue('backgroundImageBlur', values[0])}
                    min={0}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label className="text-sm">Blend Mode</Label>
                  <Select
                    value={watchedValues.blendMode}
                    onValueChange={(value) => form.setValue('blendMode', value as any)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="multiply">Multiply</SelectItem>
                      <SelectItem value="screen">Screen</SelectItem>
                      <SelectItem value="overlay">Overlay</SelectItem>
                      <SelectItem value="soft-light">Soft Light</SelectItem>
                      <SelectItem value="hard-light">Hard Light</SelectItem>
                      <SelectItem value="color-dodge">Color Dodge</SelectItem>
                      <SelectItem value="color-burn">Color Burn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
      
      {/* Pattern Overlay */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Grid className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Pattern Overlay</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm">Pattern Type</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[
                { value: 'none', icon: Square, label: 'None' },
                { value: 'dots', icon: Circle, label: 'Dots' },
                { value: 'grid', icon: Grid, label: 'Grid' },
                { value: 'waves', icon: Waves, label: 'Waves' },
                { value: 'hexagon', icon: Hexagon, label: 'Hexagon' },
                { value: 'triangle', icon: Triangle, label: 'Triangle' },
              ].map((pattern) => (
                <Button
                  key={pattern.value}
                  variant={watchedValues.backgroundPattern === pattern.value ? 'default' : 'outline'}
                  size="sm"
                  className="flex flex-col h-16 p-2"
                  onClick={() => form.setValue('backgroundPattern', pattern.value as any)}
                >
                  <pattern.icon className="h-4 w-4 mb-1" />
                  <span className="text-xs">{pattern.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <AnimatePresence>
            {watchedValues.backgroundPattern !== 'none' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-3 border-t"
              >
                <div>
                  <Label className="text-sm">Pattern Size: {watchedValues.backgroundPatternSize}px</Label>
                  <Slider
                    value={[watchedValues.backgroundPatternSize]}
                    onValueChange={(values) => form.setValue('backgroundPatternSize', values[0])}
                    min={10}
                    max={200}
                    step={5}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label className="text-sm">Pattern Opacity: {Math.round(watchedValues.backgroundPatternOpacity * 100)}%</Label>
                  <Slider
                    value={[watchedValues.backgroundPatternOpacity]}
                    onValueChange={(values) => form.setValue('backgroundPatternOpacity', values[0])}
                    min={0}
                    max={1}
                    step={0.05}
                    className="mt-2"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      
      {/* Gradient Overlay */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Gradient Overlay</CardTitle>
            </div>
            <Switch
              checked={watchedValues.gradientOverlay}
              onCheckedChange={(checked) => form.setValue('gradientOverlay', checked)}
            />
          </div>
        </CardHeader>
        <AnimatePresence>
          {watchedValues.gradientOverlay && (
            <CardContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">From Color</Label>
                    <Input
                      type="color"
                      value={watchedValues.gradientFrom}
                      onChange={(e) => form.setValue('gradientFrom', e.target.value)}
                      className="mt-1 h-12"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm">To Color</Label>
                    <Input
                      type="color"
                      value={watchedValues.gradientTo}
                      onChange={(e) => form.setValue('gradientTo', e.target.value)}
                      className="mt-1 h-12"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm">Direction</Label>
                  <Select
                    value={watchedValues.gradientDirection}
                    onValueChange={(value) => form.setValue('gradientDirection', value as any)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to-r">Left to Right</SelectItem>
                      <SelectItem value="to-l">Right to Left</SelectItem>
                      <SelectItem value="to-t">Bottom to Top</SelectItem>
                      <SelectItem value="to-b">Top to Bottom</SelectItem>
                      <SelectItem value="to-br">Top-Left to Bottom-Right</SelectItem>
                      <SelectItem value="to-bl">Top-Right to Bottom-Left</SelectItem>
                      <SelectItem value="to-tr">Bottom-Left to Top-Right</SelectItem>
                      <SelectItem value="to-tl">Bottom-Right to Top-Left</SelectItem>
                      <SelectItem value="radial">Radial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            </CardContent>
          )}
        </AnimatePresence>
      </Card>
      
      {/* Effects & Advanced */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Advanced Effects</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                <Label className="text-sm">Glass Effect</Label>
              </div>
              <Switch
                checked={watchedValues.glassEffect}
                onCheckedChange={(checked) => form.setValue('glassEffect', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Move3D className="h-4 w-4" />
                <Label className="text-sm">Animations</Label>
              </div>
              <Switch
                checked={watchedValues.animations}
                onCheckedChange={(checked) => form.setValue('animations', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <Label className="text-sm">Particle Effect</Label>
              </div>
              <Switch
                checked={watchedValues.particleEffect}
                onCheckedChange={(checked) => form.setValue('particleEffect', checked)}
              />
            </div>
            
            <AnimatePresence>
              {watchedValues.particleEffect && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-6 space-y-3 border-l-2 border-muted"
                >
                  <div>
                    <Label className="text-sm">Particle Count: {watchedValues.particleCount}</Label>
                    <Slider
                      value={[watchedValues.particleCount]}
                      onValueChange={(values) => form.setValue('particleCount', values[0])}
                      min={10}
                      max={200}
                      step={10}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm">Particle Color</Label>
                    <Input
                      type="color"
                      value={watchedValues.particleColor}
                      onChange={(e) => form.setValue('particleColor', e.target.value)}
                      className="mt-1 h-10"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div>
              <Label className="text-sm">Border Radius: {watchedValues.borderRadius}px</Label>
              <Slider
                value={[watchedValues.borderRadius]}
                onValueChange={(values) => form.setValue('borderRadius', values[0])}
                min={0}
                max={50}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Save Controls */}
      <div className="flex gap-2">
        <Button onClick={form.handleSubmit(onSubmit)} className="flex-1">
          <Settings className="h-4 w-4 mr-2" />
          Save Background
        </Button>
        <Button variant="outline" onClick={resetSettings}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default function ModernBackgroundEditor() {
  const form = useForm<BackgroundFormData>({
    resolver: zodResolver(backgroundSchema),
    defaultValues: {
      backgroundImage: '',
      backgroundImageOpacity: 0.1,
      backgroundImageBlur: 5,
      backgroundPattern: 'none',
      backgroundPatternOpacity: 0.1,
      backgroundPatternSize: 50,
      gradientOverlay: false,
      gradientFrom: '#000000',
      gradientTo: '#ffffff',
      gradientDirection: 'to-br',
      gradientStops: 2,
      borderRadius: 0,
      glassEffect: false,
      blendMode: 'normal',
      animations: true,
      parallaxEffect: false,
      particleEffect: false,
      particleCount: 50,
      particleColor: '#ffffff',
    },
  });

  const watchedValues = form.watch();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="space-y-6">
          <BackgroundPreview config={watchedValues} />
        </div>
        
        {/* Controls */}
        <div className="space-y-6">
          <BackgroundControls />
        </div>
      </div>
    </div>
  );
}
