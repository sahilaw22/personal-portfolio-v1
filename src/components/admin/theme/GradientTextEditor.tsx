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
import { GradientTextSettings } from '@/lib/types';
import { Palette, Plus, Trash2, Eye, Zap, RotateCw } from 'lucide-react';

const defaultGradientText: GradientTextSettings = {
  enabled: false,
  type: 'linear',
  direction: 45,
  colors: ['#3b82f6', '#8b5cf6', '#06b6d4'],
  positions: [0, 50, 100],
  animationType: 'none',
  animationSpeed: 3,
  applyTo: ['hero-name', 'section-headings']
};

const presetGradients = [
  {
    name: 'Sunset',
    colors: ['#ff7e5f', '#feb47b'],
    type: 'linear' as 'linear' | 'radial' | 'conic',
    direction: 45
  },
  {
    name: 'Ocean',
    colors: ['#2196F3', '#21CBF3', '#00BCD4'],
    type: 'linear' as 'linear' | 'radial' | 'conic',
    direction: 90
  },
  {
    name: 'Purple Rain',
    colors: ['#667eea', '#764ba2'],
    type: 'linear' as 'linear' | 'radial' | 'conic',
    direction: 135
  },
  {
    name: 'Fire',
    colors: ['#ff6b6b', '#ee5a24', '#ff7675'],
    type: 'linear' as 'linear' | 'radial' | 'conic',
    direction: 45
  },
  {
    name: 'Forest',
    colors: ['#11998e', '#38ef7d'],
    type: 'linear' as 'linear' | 'radial' | 'conic',
    direction: 90
  },
  {
    name: 'Galaxy',
    colors: ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981'],
    type: 'conic' as 'linear' | 'radial' | 'conic',
    direction: 0
  }
];

const applyToOptions = [
  { value: 'hero-name', label: 'Hero Name' },
  { value: 'hero-title', label: 'Hero Title/Role' },
  { value: 'section-headings', label: 'Section Headings' },
  { value: 'project-titles', label: 'Project Titles' },
  { value: 'nav-links', label: 'Navigation Links' },
  { value: 'buttons', label: 'Button Text' }
];

export default function GradientTextEditor() {
  const { portfolioData, updateThemeSettings } = useAppState();
  const { toast } = useToast();
  
  const currentSettings = portfolioData.theme.gradientText || defaultGradientText;
  const [settings, setSettings] = useState<GradientTextSettings>(currentSettings);

  const updateSettings = (updates: Partial<GradientTextSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    updateThemeSettings({ ...portfolioData.theme, gradientText: newSettings });
  };

  const addColor = () => {
    const newColors = [...settings.colors, '#3b82f6'];
    const newPositions = [...(settings.positions || []), 100];
    updateSettings({ 
      colors: newColors,
      positions: newPositions
    });
  };

  const removeColor = (index: number) => {
    if (settings.colors.length <= 2) {
      toast({ 
        variant: 'destructive', 
        title: 'Minimum Colors', 
        description: 'Gradient must have at least 2 colors.' 
      });
      return;
    }
    
    const newColors = settings.colors.filter((_, i) => i !== index);
    const newPositions = settings.positions?.filter((_, i) => i !== index);
    updateSettings({ 
      colors: newColors,
      positions: newPositions
    });
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...settings.colors];
    newColors[index] = color;
    updateSettings({ colors: newColors });
  };

  const updatePosition = (index: number, position: number) => {
    const newPositions = [...(settings.positions || [])];
    newPositions[index] = position;
    updateSettings({ positions: newPositions });
  };

  const applyPreset = (preset: typeof presetGradients[0]) => {
    updateSettings({
      colors: preset.colors,
      type: preset.type,
      direction: preset.direction,
      positions: preset.colors.map((_, i) => (i / (preset.colors.length - 1)) * 100)
    });
    toast({ 
      title: 'Preset Applied', 
      description: `${preset.name} gradient has been applied.` 
    });
  };

  const toggleApplyTo = (option: string) => {
    const newApplyTo = settings.applyTo.includes(option as any)
      ? settings.applyTo.filter(item => item !== option)
      : [...settings.applyTo, option as any];
    updateSettings({ applyTo: newApplyTo });
  };

  const generateGradientCSS = () => {
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
  };

  const previewText = "Beautiful Gradient Text";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Gradient Text Effects
        </CardTitle>
        <CardDescription>
          Add stunning gradient effects to text throughout your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="gradient-enabled" className="text-sm font-medium">
              Enable Gradient Text
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              Apply gradient effects to selected text elements
            </p>
          </div>
          <Switch
            id="gradient-enabled"
            checked={settings.enabled}
            onCheckedChange={(enabled) => updateSettings({ enabled })}
          />
        </div>

        {settings.enabled && (
          <>
            <Separator />

            {/* Live Preview */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Live Preview</Label>
              <div className="p-6 bg-muted rounded-lg text-center">
                <h1 
                  className="text-4xl font-bold"
                  style={{
                    background: generateGradientCSS(),
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    animation: settings.animationType !== 'none' ? `gradient-${settings.animationType} ${10 - (settings.animationSpeed || 3)}s infinite` : undefined
                  }}
                >
                  {previewText}
                </h1>
              </div>
            </div>

            <Separator />

            {/* Gradient Presets */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Quick Presets</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {presetGradients.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset)}
                    className="h-auto p-3 flex flex-col items-center gap-2"
                  >
                    <div 
                      className="w-full h-6 rounded"
                      style={{ 
                        background: preset.type === 'linear' 
                          ? `linear-gradient(${preset.direction}deg, ${preset.colors.join(', ')})` 
                          : preset.type === 'radial' 
                            ? `radial-gradient(circle, ${preset.colors.join(', ')})` 
                            : preset.type === 'conic'
                            ? `conic-gradient(from ${preset.direction}deg, ${preset.colors.join(', ')})`
                            : `linear-gradient(45deg, ${preset.colors.join(', ')})`
                      }}
                    />
                    <span className="text-xs">{preset.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Gradient Type and Direction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Gradient Type</Label>
                <Select value={settings.type} onValueChange={(value: 'linear' | 'radial' | 'conic') => updateSettings({ type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                    <SelectItem value="conic">Conic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {settings.type === 'linear' && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Direction ({settings.direction}°)</Label>
                  <Slider
                    value={[settings.direction]}
                    onValueChange={([value]) => updateSettings({ direction: value })}
                    min={0}
                    max={360}
                    step={15}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <Separator />

            {/* Colors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Gradient Colors</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addColor}
                  disabled={settings.colors.length >= 6}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Color
                </Button>
              </div>
              
              <div className="space-y-2">
                {settings.colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Color</Label>
                        <Input
                          type="color"
                          value={color}
                          onChange={(e) => updateColor(index, e.target.value)}
                          className="h-10"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Position (%)</Label>
                        <Input
                          type="number"
                          value={settings.positions?.[index] ?? (index / (settings.colors.length - 1)) * 100}
                          onChange={(e) => updatePosition(index, parseInt(e.target.value))}
                          min={0}
                          max={100}
                          className="h-10"
                        />
                      </div>
                    </div>
                    {settings.colors.length > 2 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeColor(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Animation */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Animation</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Animation Type</Label>
                  <Select value={settings.animationType} onValueChange={(value: any) => updateSettings({ animationType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="pulse">Pulse</SelectItem>
                      <SelectItem value="wave">Wave</SelectItem>
                      <SelectItem value="rotate">Rotate</SelectItem>
                      <SelectItem value="slide">Slide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {settings.animationType !== 'none' && (
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Speed ({settings.animationSpeed}/10)</Label>
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

            <Separator />

            {/* Apply To */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Apply Gradient To</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {applyToOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={option.value}
                      checked={settings.applyTo.includes(option.value as any)}
                      onChange={() => toggleApplyTo(option.value)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={option.value} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* CSS Output */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Generated CSS
              </Label>
              <div className="p-3 bg-muted rounded-md">
                <code className="text-xs font-mono break-all">
                  background: {generateGradientCSS()};
                  <br />
                  background-clip: text;
                  <br />
                  -webkit-background-clip: text;
                  <br />
                  color: transparent;
                </code>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
