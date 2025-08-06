
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HeroBackground } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const formSchema = z.object({
  type: z.enum(['solid', 'gradient']),
  from: z.string().min(4, 'Color is required'),
  to: z.string(),
  fromSize: z.number().min(10).max(100),
  toSize: z.number().min(10).max(100),
  fromOpacity: z.number().min(0).max(1),
  toOpacity: z.number().min(0).max(1),
});

const GlowPreview = ({ background }: { background: HeroBackground }) => {
    const fromColorWithOpacity = hexToRgba(background.from, background.fromOpacity);
    const toColorWithOpacity = hexToRgba(background.to, background.toOpacity);

    const glowStyle: React.CSSProperties = {};
    if (background.type === 'solid') {
      glowStyle.background = fromColorWithOpacity;
    } else {
      glowStyle.background = `radial-gradient(ellipse ${background.fromSize}% ${background.fromSize}% at 50% 50%, ${fromColorWithOpacity}, transparent 70%), radial-gradient(ellipse ${background.toSize}% ${background.toSize}% at 40% 60%, ${toColorWithOpacity}, transparent 70%)`;
    }
  
    return (
      <div className="relative w-full aspect-video flex items-center justify-center rounded-lg bg-card overflow-hidden">
        <div 
          className="w-full h-full blur-2xl"
          style={glowStyle}
        />
        <p className="absolute text-center text-sm text-muted-foreground p-4">
            This is a preview of the background glow behind your profile picture.
        </p>
      </div>
    );
};

const hexToRgba = (hex: string, opacity: number) => {
    let c: any;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opacity+')';
    }
    // Fallback for invalid hex
    return `rgba(255, 255, 255, ${opacity})`;
}


export default function HeroBackgroundEditor() {
  const { portfolioData, updateHeroBackground, saveData } = useAppState();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: portfolioData.theme.heroBackground,
  });

  const [previewBackground, setPreviewBackground] = useState<HeroBackground>(portfolioData.theme.heroBackground);
  const watchedFormValues = form.watch();

  useEffect(() => {
      setPreviewBackground(watchedFormValues);
  }, [watchedFormValues]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateHeroBackground(values);
    if(saveData()) {
        toast({
          title: 'Theme Updated!',
          description: 'Your hero section background has been saved.',
        });
    } else {
         toast({
          variant: 'destructive',
          title: 'Save Failed',
          description: 'Could not save hero background settings.',
        });
    }
  }

  return (
    <>
    <GlowPreview background={previewBackground} />
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
        <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
            <FormItem className="space-y-3">
            <FormLabel>Background Type</FormLabel>
            <FormControl>
                <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4"
                >
                <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl><RadioGroupItem value="solid" /></FormControl>
                    <FormLabel className="font-normal">Solid</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl><RadioGroupItem value="gradient" /></FormControl>
                    <FormLabel className="font-normal">Gradient</FormLabel>
                </FormItem>
                </RadioGroup>
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
        
        <div className="space-y-4">
            <FormField control={form.control} name="from" render={({ field }) => (
                <FormItem>
                    <FormLabel>{watchedFormValues.type === 'gradient' ? 'Gradient Color 1' : 'Color'}</FormLabel>
                    <FormControl><Input type="color" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
             <FormField control={form.control} name="fromSize" render={({ field }) => (
                <FormItem>
                    <FormLabel>Size / Density ({field.value}%)</FormLabel>
                    <FormControl><Slider min={10} max={100} step={1} defaultValue={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl>
                </FormItem>
            )} />
             <FormField control={form.control} name="fromOpacity" render={({ field }) => (
                <FormItem>
                    <FormLabel>Opacity ({Math.round(field.value * 100)}%)</FormLabel>
                    <FormControl><Slider min={0} max={1} step={0.1} defaultValue={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl>
                </FormItem>
             )} />
        </div>
        

        <div className={cn("space-y-4", watchedFormValues.type !== 'gradient' && "hidden")}>
             <FormField control={form.control} name="to" render={({ field }) => (
                <FormItem>
                    <FormLabel>Gradient Color 2</FormLabel>
                    <FormControl><Input type="color" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
             <FormField control={form.control} name="toSize" render={({ field }) => (
                <FormItem>
                    <FormLabel>Size / Density ({field.value}%)</FormLabel>
                    <FormControl><Slider min={10} max={100} step={1} defaultValue={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl>
                </FormItem>
            )} />
            <FormField control={form.control} name="toOpacity" render={({ field }) => (
                <FormItem>
                    <FormLabel>Opacity ({Math.round(field.value * 100)}%)</FormLabel>
                    <FormControl><Slider min={0} max={1} step={0.1} defaultValue={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl>
                </FormItem>
             )} />
        </div>

        <Button type="submit" className="w-full">Save Changes</Button>
    </form>
    </Form>
    </>
  );
}
