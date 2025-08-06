
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { Input } from '@/components/ui/input';
import { generatePalette } from '@/ai/flows/palette-generator';
import { BrainCircuit, Loader2, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { ColorInput } from '@/components/ui/color-input';

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

  useEffect(() => {
    form.reset(portfolioData.theme.colors);
  }, [portfolioData.theme.colors, form]);

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
        form.setValue('background', palette.background, { shouldDirty: true });
        form.setValue('foreground', palette.foreground, { shouldDirty: true });
        form.setValue('primary', palette.primary, { shouldDirty: true });
        form.setValue('accent', palette.accent, { shouldDirty: true });
        toast({
            title: 'Palette Generated!',
            description: `A new color palette for "${aiTheme}" has been applied. Press save to keep it.`,
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
                            <FormControl>
                                <ColorInput 
                                    hslValue={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
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
    
    useEffect(() => {
        form.reset({
            backgroundImage: portfolioData.theme.backgroundImage || '',
            backgroundImageOpacity: portfolioData.theme.backgroundImageOpacity || 0.1,
            backgroundImageBlur: portfolioData.theme.backgroundImageBlur || 5,
        });
    }, [portfolioData.theme, form]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setIsLoading(true);
            try {
                const dataUrl = await fileToDataUrl(file);
                form.setValue('backgroundImage', dataUrl, { shouldDirty: true });
                toast({ title: 'Image ready to be saved.' });
            } catch (err) {
                toast({ variant: 'destructive', title: 'Error reading file.' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    function handleRemoveImage() {
        form.setValue('backgroundImage', '', { shouldDirty: true });
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
    <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="colors">Color Palette</TabsTrigger>
            <TabsTrigger value="background">Image</TabsTrigger>
        </TabsList>
        <TabsContent value="colors" className="pt-6">
            <ColorForm />
        </TabsContent>
        <TabsContent value="background" className="pt-6">
            <BackgroundForm />
        </TabsContent>
    </Tabs>
  );
}
