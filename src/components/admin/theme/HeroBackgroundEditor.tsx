
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { HeroBackground } from '@/lib/types';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  type: z.enum(['solid', 'gradient']),
  from: z.string().min(4, 'Color is required'),
  to: z.string(),
});

const GlowPreview = ({ background }: { background: HeroBackground }) => {
    const glowStyle: React.CSSProperties = {};
    if (background.type === 'solid') {
      glowStyle.background = background.from;
    } else {
      glowStyle.background = `radial-gradient(ellipse 40% 40% at 50% 50%, ${background.from}, transparent 70%), radial-gradient(ellipse 30% 30% at 40% 60%, ${background.to}, transparent 70%)`;
    }
  
    return (
      <div className="relative w-full aspect-square flex items-center justify-center rounded-lg bg-card overflow-hidden">
        <div 
          className="w-full h-full rounded-full blur-2xl opacity-50"
          style={glowStyle}
        />
        <p className="absolute text-center text-sm text-muted-foreground p-4">
            This is a preview of the background glow behind your profile picture.
        </p>
      </div>
    );
};

export default function HeroBackgroundEditor() {
  const { portfolioData, updateThemeSettings } = useAppState();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: portfolioData.theme.heroBackground,
  });

  const watchFields = form.watch();

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateThemeSettings({
        ...portfolioData.theme,
        heroBackground: values,
    });
    toast({
      title: 'Theme Updated!',
      description: 'Your hero section background has been saved.',
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
        <CardHeader>
            <CardTitle>Hero Background Editor</CardTitle>
            <CardDescription>Customize the background glow of your profile picture.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                
                <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{watchFields.type === 'gradient' ? 'Gradient From' : 'Color'}</FormLabel>
                        <FormControl>
                            <Input type="color" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                {watchFields.type === 'gradient' && (
                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Gradient To</FormLabel>
                            <FormControl>
                                <Input type="color" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <Button type="submit" className="w-full">Save Changes</Button>
            </form>
            </Form>
        </CardContent>
        </Card>
        <div className="space-y-4">
             <h3 className="font-medium text-center">Live Preview</h3>
            <GlowPreview background={watchFields} />
        </div>
    </div>
  );
}
