"use client";

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Eye, Layers } from 'lucide-react';
import layoutPresets from '@/lib/layout-presets';
import { useAppState } from '@/components/AppStateProvider';
import type { LayoutSettings } from '@/lib/types';

function LayoutPreview({ preset }: { preset: LayoutSettings & { description?: string; tags?: string[] } }) {
  const sections = preset.sectionOrder;
  const containerClass = {
    narrow: 'max-w-3xl',
    normal: 'max-w-5xl',
    wide: 'max-w-7xl',
    full: 'max-w-none',
  }[preset.container];

  return (
    <div className="relative overflow-hidden rounded-xl border bg-card/50">
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Layers className="h-4 w-4" />
          <span className="capitalize">{preset.navStyle}</span>
        </div>
        <Badge variant="secondary" className="capitalize">{preset.container}</Badge>
      </div>
      <div className={`px-5 pb-5 ${containerClass} mx-auto`}>
        <div className="grid grid-cols-6 gap-2">
          {sections.map((s) => (
            <div key={s} className="col-span-6">
              <div className="h-6 w-40 rounded bg-muted/40 mb-2" />
              <div className="grid grid-cols-6 gap-2">
                <div className="h-12 rounded bg-muted/40 col-span-4" />
                <div className="h-12 rounded bg-muted/40 col-span-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LayoutsManager() {
  const { updateAppSettings } = useAppState();
  const [filter, setFilter] = useState<string>('all');

  const layouts = useMemo(() => {
    if (filter === 'all') return layoutPresets;
    return layoutPresets.filter((l) => (l.tags || []).includes(filter));
  }, [filter]);

  const applyLayout = (id: string) => {
    const preset = layoutPresets.find((l) => l.id === id);
    if (!preset) return;
    const { description, tags, ...rest } = preset as (LayoutSettings & { description?: string; tags?: string[] });
    const layout: LayoutSettings = { ...rest };
    updateAppSettings({ layout });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Layout Styles</CardTitle>
            <CardDescription>
              Choose from modern, responsive layout presets that change structure, spacing, and components.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-5 w-full overflow-x-auto">
            {['all','classic','modern','glass','editorial','grid','minimal','showcase','tech','creative','brutalist'].map(cat => (
              <TabsTrigger key={cat} value={cat} onClick={() => setFilter(cat)} className="capitalize whitespace-nowrap">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={filter} className="pt-6">
            <ScrollArea className="h-[600px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {layouts.map((l) => (
                  <Card key={l.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-base">{l.title || l.id}</CardTitle>
                          {('description' in l) && (
                            <CardDescription>{(l as typeof l & { description?: string }).description}</CardDescription>
                          )}
                          <div className="mt-2 flex flex-wrap gap-1">
                            {(l as typeof l & { tags?: string[] }).tags?.map((t: string) => (
                              <Badge key={t} variant="secondary" className="capitalize">{t}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" title="Preview">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button onClick={() => applyLayout(l.id)} size="sm">
                            <Check className="h-4 w-4 mr-1" /> Apply
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <LayoutPreview preset={l} />
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
