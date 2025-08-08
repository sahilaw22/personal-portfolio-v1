'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Grid, RefreshCw, Sun, Moon, Check, Eye } from 'lucide-react';
import portfolioDesigns from '@/lib/portfolio-designs';
import { useAppState } from '@/components/AppStateProvider';
import layoutPresets from '@/lib/layout-presets';
import uiStylePresets from '@/lib/ui-style-presets';
import type { PortfolioDesign } from '@/lib/portfolio-design-types';

function DesignPreview({ variant, design }: { variant: 'light' | 'dark'; design: PortfolioDesign }) {
  const v = variant === 'light' ? design.light : design.dark;
  const styleVars = {
    '--background': v.colors.background,
    '--foreground': v.colors.foreground, 
    '--primary': v.colors.primary,
    '--accent': v.colors.accent,
  } as React.CSSProperties;

  return (
    <div className="relative overflow-hidden rounded-xl border bg-card/50" style={styleVars}>
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <Badge variant="secondary" className="capitalize">{variant}</Badge>
      </div>
      <div className="px-5 pb-5">
        <div className="h-6 w-36 rounded bg-muted/40 mb-4" />
        <div className="grid grid-cols-3 gap-3">
          <div className="h-24 rounded-lg bg-muted/40" />
          <div className="h-24 rounded-lg bg-muted/40" />
          <div className="h-24 rounded-lg bg-muted/40" />
        </div>
        <div className="mt-4 h-4 w-2/3 rounded bg-muted/40" />
        <div className="mt-2 h-4 w-1/2 rounded bg-muted/40" />
      </div>
    </div>
  );
}

export default function PortfolioDesignsManager() {
  const { portfolioData, updateColorTheme, updateHeroBackground, updateAppSettings, updateHeroContent } = useAppState();
  const [filter, setFilter] = useState<string>('all');
  const [mode, setMode] = useState<'light' | 'dark'>(portfolioData.settings.themeMode);

  const designs = useMemo(() => {
    if (filter === 'all') return portfolioDesigns;
    return portfolioDesigns.filter(d => d.tags.includes(filter));
  }, [filter]);

  const applyDesign = (id: string) => {
    const design = portfolioDesigns.find(d => d.id === id);
    if (!design) return;

    const variant = mode === 'light' ? design.light : design.dark;
    updateColorTheme({
      background: variant.colors.background,
      foreground: variant.colors.foreground,
      primary: variant.colors.primary,
      accent: variant.colors.accent,
    });
    updateHeroBackground({ ...variant.heroBackground });
    if (variant.nameFont) {
      const current = portfolioData.hero;
      updateHeroContent({ ...current, nameFont: variant.nameFont });
    }
    // Apply theme mode
    updateAppSettings({ themeMode: mode });

    // Optional: apply recommended layout and ui style per design id to make them feel more distinct
    const layoutMap: Record<string, string> = {
      'neo-minimal': 'minimal-flow',
      'sunset-glow': 'showcase-carousel',
      'cyberpunk': 'bold-grid',
      'pastel-dream': 'glassmorphic-elegance',
      'mono-pro': 'classic-topnav',
      'forest-mist': 'creative-wave',
      'ocean-breeze': 'classic-topnav',
      'retro-vibes': 'brutalist-stack',
      'brutalist-edge': 'brutalist-stack',
      'glassmorphic': 'glassmorphic-elegance',
      'zen-serif': 'editorial-serif',
    } as const;

    const uiMap: Record<string, string> = {
      'neo-minimal': 'clean-minimal',
      'sunset-glow': 'playful-accent',
      'cyberpunk': 'bold-brutalist',
      'pastel-dream': 'glass-soft',
      'mono-pro': 'clean-minimal',
      'forest-mist': 'glass-soft',
      'ocean-breeze': 'clean-minimal',
      'retro-vibes': 'playful-accent',
      'brutalist-edge': 'bold-brutalist',
      'glassmorphic': 'glass-soft',
      'zen-serif': 'clean-minimal',
    } as const;

    const layoutId = layoutMap[id];
    const layoutPreset = layoutPresets.find(l => l.id === layoutId);
    if (layoutPreset) {
      const { description, tags, ...rest } = layoutPreset;
      const layout = { ...rest };
      updateAppSettings({ layout });
    }

    const uiId = uiMap[id];
    const uiPreset = uiStylePresets.find(u => u.id === uiId);
    if (uiPreset) {
      const { description, tags, ...uiStyle } = uiPreset;
      updateAppSettings({ uiStyle });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Portfolio Designs</CardTitle>
            <CardDescription>
              Choose from curated, production-ready designs. Apply light or dark variants instantly.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={mode === 'light' ? 'default' : 'outline'} size="sm" onClick={() => setMode('light')}>
              <Sun className="h-4 w-4 mr-1" /> Light
            </Button>
            <Button variant={mode === 'dark' ? 'default' : 'outline'} size="sm" onClick={() => setMode('dark')}>
              <Moon className="h-4 w-4 mr-1" /> Dark
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-5 w-full overflow-x-auto">
            {['all','minimal','warm','neon','pastel','nature','cool','retro','brutalist','glassmorphism','editorial'].map(cat => (
              <TabsTrigger key={cat} value={cat} onClick={() => setFilter(cat)} className="capitalize whitespace-nowrap">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={filter} className="pt-6">
            <ScrollArea className="h-[600px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {designs.map(d => (
                  <Card key={d.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-base">{d.title}</CardTitle>
                          <CardDescription>{d.description}</CardDescription>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {d.tags.map(t => (
                              <Badge key={t} variant="secondary" className="capitalize">{t}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" title="Preview">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button onClick={() => applyDesign(d.id)} size="sm">
                            <Check className="h-4 w-4 mr-1" /> Apply
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <DesignPreview variant="light" design={d} />
                        <DesignPreview variant="dark" design={d} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
