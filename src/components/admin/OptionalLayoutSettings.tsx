"use client";

import { useMemo, useState, memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAppState } from '@/components/AppStateProvider';
import type { LayoutSettings } from '@/lib/types';

const defaultLayout: LayoutSettings = {
  id: 'custom',
  title: 'Custom',
  sectionOrder: ['hero','about','skills','experience','education','projects','contact'],
  container: 'normal',
  navStyle: 'top',
  cardStyle: 'bordered',
  radius: 'lg',
  shadow: 'soft',
  projectLayout: 'grid',
  imageShape: 'rounded',
  sectionSeparators: 'none',
  spacingScale: 'comfortable',
  typographyScale: 'normal',
};

function OptionalLayoutSettings() {
  const { portfolioData, updateAppSettings } = useAppState();
  const current = portfolioData.settings.layout;

  const base = useMemo(() => ({
    ...defaultLayout,
    ...(current || {}),
  }), [current]);

  const [state, setState] = useState<LayoutSettings>({ ...base, imageShape: 'circle' });

  const onApply = () => {
    updateAppSettings({ layout: { ...state, id: state.id || 'custom', title: state.title || 'Custom' } });
  };

  const onReset = () => {
    updateAppSettings({ layout: undefined });
    setState(defaultLayout);
  };

  const set = <K extends keyof LayoutSettings>(key: K, value: LayoutSettings[K]) => {
    // Enforce circular profile image regardless of UI interactions
    if (key === 'imageShape') {
      setState(prev => ({ ...prev, imageShape: 'circle' }));
      return;
    }
    setState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optional settings</CardTitle>
        <CardDescription>Fine‑tune structure, spacing, and component styles. These apply on top of any selected layout.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Container width</label>
            <Select value={state.container} onValueChange={(v) => set('container', v as LayoutSettings['container'])}>
              <SelectTrigger><SelectValue placeholder="Container" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="narrow">Narrow</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="wide">Wide</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Navigation style</label>
            <Select value={state.navStyle} onValueChange={(v) => set('navStyle', v as LayoutSettings['navStyle'])}>
              <SelectTrigger><SelectValue placeholder="Navigation" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="sticky">Sticky</SelectItem>
                <SelectItem value="sidebar">Sidebar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Card style</label>
            <Select value={state.cardStyle} onValueChange={(v) => set('cardStyle', v as LayoutSettings['cardStyle'])}>
              <SelectTrigger><SelectValue placeholder="Card style" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="bordered">Bordered</SelectItem>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="glass">Glass</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Card radius</label>
            <Select value={state.radius} onValueChange={(v) => set('radius', v as LayoutSettings['radius'])}>
              <SelectTrigger><SelectValue placeholder="Radius" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra‑large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Card shadow</label>
            <Select value={state.shadow} onValueChange={(v) => set('shadow', v as LayoutSettings['shadow'])}>
              <SelectTrigger><SelectValue placeholder="Shadow" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="soft">Soft</SelectItem>
                <SelectItem value="elevated">Elevated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Projects layout</label>
            <Select value={state.projectLayout} onValueChange={(v) => set('projectLayout', v as LayoutSettings['projectLayout'])}>
              <SelectTrigger><SelectValue placeholder="Projects layout" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="masonry">Masonry</SelectItem>
                <SelectItem value="carousel">Carousel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Hero image shape</label>
            <div className="text-sm text-muted-foreground">Locked to Circle</div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Section separators</label>
            <Select value={state.sectionSeparators} onValueChange={(v) => set('sectionSeparators', v as LayoutSettings['sectionSeparators'])}>
              <SelectTrigger><SelectValue placeholder="Separators" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="angled">Angled</SelectItem>
                <SelectItem value="wave">Wave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Spacing scale</label>
            <Select value={state.spacingScale} onValueChange={(v) => set('spacingScale', v as LayoutSettings['spacingScale'])}>
              <SelectTrigger><SelectValue placeholder="Spacing" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="cozy">Cozy</SelectItem>
                <SelectItem value="comfortable">Comfortable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Typography scale</label>
            <Select value={state.typographyScale} onValueChange={(v) => set('typographyScale', v as LayoutSettings['typographyScale'])}>
              <SelectTrigger><SelectValue placeholder="Typography" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="larger">Larger</SelectItem>
                <SelectItem value="editorial">Editorial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={onApply}>Apply optional settings</Button>
          <Button variant="outline" onClick={onReset}>Reset to defaults</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(OptionalLayoutSettings);
