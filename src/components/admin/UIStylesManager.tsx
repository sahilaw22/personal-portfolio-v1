"use client";

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Eye, Sparkles } from 'lucide-react';
import uiStylePresets from '@/lib/ui-style-presets';
import { useAppState } from '@/components/AppStateProvider';

export default function UIStylesManager() {
  const { updateAppSettings } = useAppState();
  const [filter, setFilter] = useState('all');

  const styles = useMemo(() => {
    if (filter === 'all') return uiStylePresets;
    return uiStylePresets.filter(s => s.tags.includes(filter));
  }, [filter]);

  const applyStyle = (id: string) => {
    const preset = uiStylePresets.find(s => s.id === id);
    if (!preset) return;
    const { description, tags, ...uiStyle } = preset as any;
    updateAppSettings({ uiStyle });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>UI Styles</CardTitle>
            <CardDescription>
              Component look-and-feel presets: buttons, cards, headings, animations, and accents.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {styles.map(s => (
              <Card key={s.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base">{s.title}</CardTitle>
                      <CardDescription>{s.description}</CardDescription>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {s.tags.map(t => (
                          <Badge key={t} variant="secondary" className="capitalize">{t}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" title="Preview">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => applyStyle(s.id)} size="sm">
                        <Check className="h-4 w-4 mr-1" /> Apply
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button variant={s.buttonVariantDefault as any}>
                        <Sparkles className="h-4 w-4" /> Button
                      </Button>
                      <Button variant="outline">Secondary</Button>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="text-sm text-muted-foreground">Card preview</div>
                      <div className="h-16 bg-muted/30 rounded-md mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
