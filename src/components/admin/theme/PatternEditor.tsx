'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppState } from '@/components/AppStateProvider';
import { useToast } from '@/hooks/use-toast';
import { PatternSettings } from '@/lib/types';
import { 
  Grid, 
  Circle, 
  Waves, 
  Hash, 
  Hexagon, 
  Zap, 
  Star, 
  Plus, 
  Layers3, 
  Droplets,
  Eye,
  Play,
  RotateCw,
  Palette
} from 'lucide-react';

const defaultPatternSettings: PatternSettings = {
  enabled: false,
  type: 'dots',
  opacity: 0.1,
  size: 20,
  color: '#3b82f6',
  spacing: 40,
  rotation: 0,
  animationType: 'none',
  animationSpeed: 3
};

const patternTypes = [
  {
    type: 'none' as const,
    label: 'None',
    icon: Circle,
    description: 'No pattern'
  },
  {
    type: 'dots' as const,
    label: 'Dots',
    icon: Circle,
    description: 'Classic dot pattern'
  },
  {
    type: 'grid' as const,
    label: 'Grid',
    icon: Grid,
    description: 'Clean grid lines'
  },
  {
    type: 'waves' as const,
    label: 'Waves',
    icon: Waves,
    description: 'Flowing wave pattern'
  },
  {
    type: 'diagonal-lines' as const,
    label: 'Diagonal',
    icon: Hash,
    description: 'Diagonal line pattern'
  },
  {
    type: 'hexagon' as const,
    label: 'Hexagon',
    icon: Hexagon,
    description: 'Hexagonal mesh'
  },
  {
    type: 'circuit' as const,
    label: 'Circuit',
    icon: Zap,
    description: 'Tech circuit board'
  },
  {
    type: 'geometric' as const,
    label: 'Geometric',
    icon: Layers3,
    description: 'Abstract shapes'
  },
  {
    type: 'stars' as const,
    label: 'Stars',
    icon: Star,
    description: 'Starfield pattern'
  },
  {
    type: 'crosses' as const,
    label: 'Crosses',
    icon: Plus,
    description: 'Cross/plus pattern'
  },
  {
    type: 'mesh' as const,
    label: 'Mesh',
    icon: Grid,
    description: 'Complex mesh grid'
  },
  {
    type: 'bubbles' as const,
    label: 'Bubbles',
    icon: Droplets,
    description: 'Organic bubble pattern'
  }
];

const generatePatternSVG = (settings: PatternSettings): string => {
  const { type, size, opacity, color, spacing, rotation } = settings;
  
  const patterns = {
    none: '',
    dots: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${spacing/2}" cy="${spacing/2}" r="${size/4}" fill="${color}" opacity="${opacity}"/>
      </svg>
    `,
    grid: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 0 L ${spacing} 0 M 0 0 L 0 ${spacing}" stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none"/>
      </svg>
    `,
    waves: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 ${spacing/2} Q ${spacing/4} ${spacing/4} ${spacing/2} ${spacing/2} T ${spacing} ${spacing/2}" stroke="${color}" stroke-width="2" opacity="${opacity}" fill="none"/>
      </svg>
    `,
    'diagonal-lines': `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg" transform="rotate(${rotation})">
        <path d="M 0 0 L ${spacing} ${spacing} M 0 ${spacing} L ${spacing} 0" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
      </svg>
    `,
    hexagon: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <polygon points="${spacing/2},2 ${spacing-2},${spacing/4} ${spacing-2},${spacing-spacing/4} ${spacing/2},${spacing-2} 2,${spacing-spacing/4} 2,${spacing/4}" 
                 stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none"/>
      </svg>
    `,
    circuit: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none">
          <path d="M 0 ${spacing/2} L ${spacing/3} ${spacing/2} L ${spacing/3} ${spacing/4} L ${2*spacing/3} ${spacing/4} L ${2*spacing/3} ${3*spacing/4} L ${spacing} ${3*spacing/4}"/>
          <circle cx="${spacing/3}" cy="${spacing/2}" r="2"/>
          <circle cx="${2*spacing/3}" cy="${spacing/4}" r="2"/>
        </g>
      </svg>
    `,
    geometric: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <g opacity="${opacity}">
          <polygon points="${spacing/2},${size/4} ${spacing-size/4},${spacing/2} ${spacing/2},${spacing-size/4} ${size/4},${spacing/2}" stroke="${color}" stroke-width="1" fill="none"/>
          <circle cx="${spacing/2}" cy="${spacing/2}" r="${size/8}" fill="${color}"/>
        </g>
      </svg>
    `,
    stars: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <g opacity="${opacity}" fill="${color}">
          <polygon points="${spacing/2},${size/4} ${spacing/2+2},${spacing/2-2} ${spacing/2+size/4},${spacing/2} ${spacing/2+2},${spacing/2+2} ${spacing/2},${spacing-size/4} ${spacing/2-2},${spacing/2+2} ${spacing/2-size/4},${spacing/2} ${spacing/2-2},${spacing/2-2}"/>
        </g>
      </svg>
    `,
    crosses: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${color}" stroke-width="2" opacity="${opacity}">
          <line x1="${spacing/2-size/4}" y1="${spacing/2}" x2="${spacing/2+size/4}" y2="${spacing/2}"/>
          <line x1="${spacing/2}" y1="${spacing/2-size/4}" x2="${spacing/2}" y2="${spacing/2+size/4}"/>
        </g>
      </svg>
    `,
    mesh: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${color}" stroke-width="0.5" opacity="${opacity}" fill="none">
          <path d="M 0 0 L ${spacing} 0 M 0 0 L 0 ${spacing} M 0 ${spacing/2} L ${spacing} ${spacing/2} M ${spacing/2} 0 L ${spacing/2} ${spacing}"/>
          <circle cx="${spacing/4}" cy="${spacing/4}" r="1"/>
          <circle cx="${3*spacing/4}" cy="${3*spacing/4}" r="1"/>
        </g>
      </svg>
    `,
    bubbles: `
      <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
        <g opacity="${opacity}">
          <circle cx="${spacing/4}" cy="${spacing/4}" r="${size/6}" fill="${color}"/>
          <circle cx="${3*spacing/4}" cy="${spacing/2}" r="${size/8}" fill="${color}"/>
          <circle cx="${spacing/2}" cy="${3*spacing/4}" r="${size/10}" fill="${color}"/>
        </g>
      </svg>
    `
  };

  return patterns[type] || '';
};

export default function PatternEditor() {
  const { portfolioData, updateThemeSettings } = useAppState();
  const { toast } = useToast();
  
  const currentSettings = portfolioData.theme.backgroundPattern || defaultPatternSettings;
  const [settings, setSettings] = useState<PatternSettings>(currentSettings);

  const updateSettings = (updates: Partial<PatternSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    updateThemeSettings({ ...portfolioData.theme, backgroundPattern: newSettings });
  };

  const patternSVG = generatePatternSVG(settings);
  const patternDataUrl = patternSVG ? `data:image/svg+xml;base64,${btoa(patternSVG)}` : null;

  const applyPreset = (preset: Partial<PatternSettings>) => {
    updateSettings(preset);
    toast({ 
      title: 'Preset Applied', 
      description: `Pattern preset has been applied.` 
    });
  };

  const presets = [
    {
      name: 'Subtle Dots',
      settings: { type: 'dots' as const, opacity: 0.05, size: 16, color: '#3b82f6', spacing: 32 }
    },
    {
      name: 'Grid Lines',
      settings: { type: 'grid' as const, opacity: 0.1, size: 20, color: '#6b7280', spacing: 40 }
    },
    {
      name: 'Tech Circuit',
      settings: { type: 'circuit' as const, opacity: 0.08, size: 24, color: '#10b981', spacing: 60 }
    },
    {
      name: 'Flowing Waves',
      settings: { type: 'waves' as const, opacity: 0.12, size: 18, color: '#06b6d4', spacing: 45 }
    },
    {
      name: 'Star Field',
      settings: { type: 'stars' as const, opacity: 0.15, size: 12, color: '#f59e0b', spacing: 50 }
    },
    {
      name: 'Hexagon Mesh',
      settings: { type: 'hexagon' as const, opacity: 0.07, size: 22, color: '#8b5cf6', spacing: 55 }
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers3 className="h-5 w-5" />
          Background Patterns
        </CardTitle>
        <CardDescription>
          Add beautiful patterns to your portfolio background with full control over visibility and appearance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="pattern-enabled" className="text-sm font-medium">
              Enable Background Pattern
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              Add a subtle pattern overlay to your entire portfolio background
            </p>
          </div>
          <Switch
            id="pattern-enabled"
            checked={settings.enabled}
            onCheckedChange={(enabled) => updateSettings({ enabled })}
          />
        </div>

        {settings.enabled && (
          <>
            <Separator />

            {/* Live Preview */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Live Preview
              </Label>
              <div 
                className="p-8 bg-gradient-to-br from-background to-muted rounded-lg border-2 border-dashed border-border"
                style={{
                  backgroundImage: patternDataUrl ? `url(${patternDataUrl})` : undefined,
                  backgroundRepeat: 'repeat',
                  animation: settings.animationType !== 'none' ? `pattern-${settings.animationType} ${10 - (settings.animationSpeed || 3)}s infinite` : undefined
                }}
              >
                <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg text-center">
                  <h3 className="font-semibold">Portfolio Content</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    This is how the pattern will appear behind your content
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Quick Presets */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Quick Presets</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset.settings)}
                    className="h-auto p-3 flex flex-col items-center gap-2"
                  >
                    <div 
                      className="w-full h-8 rounded border bg-muted"
                      style={{ 
                        backgroundImage: (() => {
                          const presetPattern = generatePatternSVG({...defaultPatternSettings, ...preset.settings});
                          return presetPattern ? `url(data:image/svg+xml;base64,${btoa(presetPattern)})` : undefined;
                        })(),
                        backgroundRepeat: 'repeat'
                      }}
                    />
                    <span className="text-xs font-medium">{preset.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Pattern Type Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Pattern Type</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {patternTypes.map((pattern) => {
                  const Icon = pattern.icon;
                  return (
                    <Button
                      key={pattern.type}
                      variant={settings.type === pattern.type ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateSettings({ type: pattern.type })}
                      className="h-auto p-3 flex flex-col items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs">{pattern.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Pattern Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Opacity ({Math.round(settings.opacity * 100)}%)</Label>
                  <Slider
                    value={[settings.opacity]}
                    onValueChange={([value]) => updateSettings({ opacity: value })}
                    min={0}
                    max={0.5}
                    step={0.01}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Control pattern visibility</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Size ({settings.size}px)</Label>
                  <Slider
                    value={[settings.size]}
                    onValueChange={([value]) => updateSettings({ size: value })}
                    min={8}
                    max={60}
                    step={2}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Pattern element size</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Spacing ({settings.spacing}px)</Label>
                  <Slider
                    value={[settings.spacing]}
                    onValueChange={([value]) => updateSettings({ spacing: value })}
                    min={20}
                    max={120}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Distance between pattern elements</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.color}
                      onChange={(e) => updateSettings({ color: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      type="text"
                      value={settings.color}
                      onChange={(e) => updateSettings({ color: e.target.value })}
                      className="flex-1 font-mono text-sm"
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Rotation ({settings.rotation}°)</Label>
                  <Slider
                    value={[settings.rotation]}
                    onValueChange={([value]) => updateSettings({ rotation: value })}
                    min={0}
                    max={360}
                    step={15}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Rotate the entire pattern</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Animation</Label>
                  <Select value={settings.animationType} onValueChange={(value: any) => updateSettings({ animationType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="pulse">Pulse</SelectItem>
                      <SelectItem value="rotate">Rotate</SelectItem>
                      <SelectItem value="float">Float</SelectItem>
                      <SelectItem value="scale">Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {settings.animationType !== 'none' && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Animation Speed ({settings.animationSpeed}/10)</Label>
                    <Slider
                      value={[settings.animationSpeed || 3]}
                      onValueChange={([value]) => updateSettings({ animationSpeed: value })}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* CSS Output for developers */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Generated CSS
              </Label>
              <div className="p-3 bg-muted rounded-md">
                <code className="text-xs font-mono break-all">
                  background-image: url(data:image/svg+xml;base64,{btoa(patternSVG)});
                  <br />
                  background-repeat: repeat;
                  <br />
                  opacity: {settings.opacity};
                </code>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
