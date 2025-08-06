
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '@/lib/utils';

const fontOptions = [
    { label: 'Poppins (Stylish)', value: 'font-headline' },
    { label: 'Space Grotesk (Techy)', value: 'font-body' },
    { label: 'Roboto Slab (Modern Serif)', value: 'font-slab' },
    { label: 'Playfair Display (Elegant Serif)', value: 'font-serif' },
    { label: 'Inter (Clean Sans-Serif)', value: 'font-inter' },
    { label: 'Lexend (Readable Sans-Serif)', value: 'font-lexend' },
    { label: 'JetBrains Mono (Developer Mono)', value: 'font-jetbrains-mono' },
    { label: 'Source Code Pro (Coding Mono)', value: 'font-source-code-pro' },
    { label: 'IBM Plex Mono (IBM Mono)', value: 'font-ibm-plex-mono' },
    { label: 'Lato', value: 'font-lato' },
    { label: 'Montserrat', value: 'font-montserrat' },
    { label: 'Oswald', value: 'font-oswald' },
    { label: 'Raleway', value: 'font-raleway' },
    { label: 'Merriweather', value: 'font-merriweather' },
    { label: 'PT Sans', value: 'font-pt-sans' },
    { label: 'Open Sans', value: 'font-open-sans' },
    { label: 'Nunito', value: 'font-nunito' },
    { label: 'Ubuntu', value: 'font-ubuntu' },
    { label: 'Roboto', value: 'font-roboto' },
    { label: 'Zilla Slab', value: 'font-zilla-slab' },
    { label: 'Domine', value: 'font-domine' },
    { label: 'Cormorant Garamond', value: 'font-cormorant-garamond' },
    { label: 'EB Garamond', value: 'font-eb-garamond' },
    { label: 'Libre Baskerville', value: 'font-libre-baskerville' },
    { label: 'Lora', value: 'font-lora' },
    { label: 'Playbill', value: 'font-playbill' },
    { label: 'Lobster', value: 'font-lobster' },
    { label: 'Pacifico', value: 'font-pacifico' },
    { label: 'Anton', value: 'font-anton' },
];

const formSchema = z.object({
  greeting: z.string().min(2),
  name: z.string().min(2),
  title: z.string().min(5),
  availability: z.string().min(5),
  bio: z.string().min(20),
  image: z.string(),
  nameFont: z.string().optional(),
});

export default function ContentEditor() {
  const { portfolioData, updateHeroContent } = useAppState();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...portfolioData.hero, nameFont: portfolioData.hero.nameFont || 'font-headline' },
  });

  const watchName = form.watch('name');
  const watchFont = form.watch('nameFont');

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateHeroContent(values);
    toast({
      title: 'Content Updated!',
      description: 'Your hero section has been successfully updated.',
    });
  }
  
  const availabilityOptions = [
      "Available for Internship",
      "Available for Freelance",
      "Available for Full-time work",
      "Available for Part-time work",
      "Not currently available",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section Content</CardTitle>
        <CardDescription>Update the main text content of your portfolio's hero section.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nameFont"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Name Font Style</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a font style for your name" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {fontOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    <span className={cn(option.value)}>{option.label}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {watchName && watchFont && (
                        <div className="mt-4 rounded-lg border bg-background p-4">
                            <p className="text-sm text-muted-foreground mb-2">Font Preview:</p>
                            <p className={cn("text-3xl font-bold", watchFont)}>{watchName}</p>
                        </div>
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="greeting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Greeting</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title / Tagline</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an availability status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availabilityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
