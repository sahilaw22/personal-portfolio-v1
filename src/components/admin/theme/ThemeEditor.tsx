
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
import { BrainCircuit, Loader2, UploadCloud, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

const colorsSchema = z.object({
  background: z.string(),
  foreground: z.string(),
  primary: z.string(),
  accent: z.string(),
});

const themeSettingsSchema = z.object({
    backgroundImage: z.string().optional(),
    backgroundImageOpacity: z.number().min(0).max(1).optional(),
    backgroundImageBlur: z.number().min(0).max(50).optional(),
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

const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

function ColorForm() {
  const { portfolioData, updateColorTheme } = useAppState();
  const { toast } = useToast();
  const [aiTheme, setAiTheme] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof colorsSchema>>({
    resolver: zodResolver(colorsSchema),
    defaultValues: portfolioData.theme.colors,
  });

  function onSubmit(values: z.infer<typeof colorsSchema>) {
    updateColorTheme(values);
    toast({
      title: 'Theme Updated!',
      description: 'Your new color palette has been saved.',
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
    <div className="space-y-8">
        <div className="space-y-4">
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
            <Button type="submit" className="w-full">Save Color Palette</Button>
          </form>
        </Form>
    </div>
  )
}

function BackgroundForm() {
    const { portfolioData, updateThemeSettings } = useAppState();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof themeSettingsSchema>>({
        resolver: zodResolver(themeSettingsSchema),
        defaultValues: {
            backgroundImage: portfolioData.theme.backgroundImage || '',
            backgroundImageOpacity: portfolioData.theme.backgroundImageOpacity || 0.1,
            backgroundImageBlur: portfolioData.theme.backgroundImageBlur || 5,
        },
    });

    const watchFields = form.watch();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setIsLoading(true);
            try {
                const dataUrl = await fileToDataUrl(file);
                form.setValue('backgroundImage', dataUrl);
                toast({ title: 'Image ready to be saved.' });
            } catch (err) {
                toast({ variant: 'destructive', title: 'Error reading file.' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    function handleRemoveImage() {
        form.setValue('backgroundImage', '');
        toast({ title: 'Background image removed.'});
    }

    function onSubmit(values: z.infer<typeof themeSettingsSchema>) {
        updateThemeSettings({
            ...portfolioData.theme,
            ...values,
        });
        toast({
            title: 'Background Updated!',
            description: 'Your new background settings have been saved.',
        });
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <Label htmlFor="bg-upload">Upload Background Image</Label>
                    <div className="mt-2 flex items-center gap-4">
                        <Input id="bg-upload" type="file" accept="image/*" onChange={handleFileChange} disabled={isLoading} className="flex-1" />
                        {watchFields.backgroundImage && (
                             <Button type="button" variant="destructive" size="icon" onClick={handleRemoveImage}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {watchFields.backgroundImage && (
                    <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold text-center">Preview</h4>
                         <img src={watchFields.backgroundImage} alt="Background Preview" className="w-full h-auto rounded-md object-cover" />
                    </div>
                )}
                
                <FormField
                    control={form.control}
                    name="backgroundImageOpacity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Background Opacity: {Math.round((field.value || 0) * 100)}%</FormLabel>
                            <FormControl>
                               <Slider
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    defaultValue={[field.value || 0.1]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                 <FormField
                    control={form.control}
                    name="backgroundImageBlur"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Background Blur: {field.value || 0}px</FormLabel>
                            <FormControl>
                               <Slider
                                    min={0}
                                    max={50}
                                    step={1}
                                    defaultValue={[field.value || 5]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Save Background Settings'}
                </Button>
            </form>
        </Form>
    )
}

export default function ThemeEditor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Customizer</CardTitle>
        <CardDescription>Customize the colors and background of your portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="colors">Color Palette</TabsTrigger>
                <TabsTrigger value="background">Background Image</TabsTrigger>
            </TabsList>
            <TabsContent value="colors" className="pt-6">
                <ColorForm />
            </TabsContent>
            <TabsContent value="background" className="pt-6">
                <BackgroundForm />
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
