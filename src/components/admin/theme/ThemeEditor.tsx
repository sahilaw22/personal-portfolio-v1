
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '@/components/ui/input';
import { generatePalette } from '@/ai/flows/palette-generator';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  background: z.string(),
  foreground: z.string(),
  primary: z.string(),
  accent: z.string(),
});

type HSLColor = { h: number, s: number, l: number };

function hslStringToObj(hslStr: string): HSLColor {
  const [h, s, l] = hslStr.replace(/%/g, '').split(' ').map(parseFloat);
  return { h, s, l };
}

function objToHslString(hslObj: HSLColor): string {
  return `${hslObj.h} ${hslObj.s}% ${hslObj.l}%`;
}

function hexToHsl(hex: string): HSLColor {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex({ h, s, l }: HSLColor): string {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return `#${[0, 8, 4].map(n => 
        Math.round(f(n) * 255).toString(16).padStart(2, '0')).join('')}`;
}


export default function ThemeEditor() {
  const { portfolioData, updateColorTheme } = useAppState();
  const { toast } = useToast();
  const [aiTheme, setAiTheme] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: portfolioData.theme.colors,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateColorTheme(values);
    toast({
      title: 'Theme Updated!',
      description: 'Your new color theme has been saved.',
    });
  }

  async function handleAiGenerate() {
    if (!aiTheme) {
        toast({ variant: 'destructive', title: 'Please enter a theme description.' });
        return;
    }
    setIsLoading(true);
    try {
        const palette = await generatePalette({ theme: aiTheme });
        form.setValue('background', palette.background);
        form.setValue('foreground', palette.foreground);
        form.setValue('primary', palette.primary);
        form.setValue('accent', palette.accent);
        toast({
            title: 'Palette Generated!',
            description: `A new color palette for "${aiTheme}" has been applied.`,
        });
    } catch(err) {
        console.error(err);
        toast({ variant: 'destructive', title: 'Generation Failed', description: 'Could not generate palette. Please try again.' });
    } finally {
        setIsLoading(false);
    }
  }
  
  type ColorField = 'background' | 'foreground' | 'primary' | 'accent';
  const colorFields: { name: ColorField, label: string }[] = [
    { name: 'background', label: 'Background Color'},
    { name: 'foreground', label: 'Foreground (Text) Color'},
    { name: 'primary', label: 'Primary Accent Color'},
    { name: 'accent', label: 'Secondary Accent Color'},
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Customizer</CardTitle>
        <CardDescription>Customize the color palette of your portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-8">
            <Label>AI Palette Generator</Label>
            <div className="flex gap-2">
                <Input 
                    placeholder='e.g., "deep ocean" or "cyberpunk city"'
                    value={aiTheme}
                    onChange={(e) => setAiTheme(e.target.value)}
                />
                <Button onClick={handleAiGenerate} disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <BrainCircuit />}
                </Button>
            </div>
            <p className="text-sm text-muted-foreground">Describe a theme and let AI generate a palette for you.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
             {colorFields.map(({ name, label }) => (
                <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <div className="flex items-center gap-2">
                                <FormControl>
                                    <Input 
                                        type="color" 
                                        className="w-12 h-10 p-1"
                                        value={hslToHex(hslStringToObj(field.value))}
                                        onChange={(e) => field.onChange(objToHslString(hexToHsl(e.target.value)))}
                                    />
                                </FormControl>
                                <Input 
                                    className="font-mono text-sm"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
            <Button type="submit" className="w-full">Save Theme</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
