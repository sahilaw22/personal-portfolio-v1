
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
    { label: 'Poppins (Headline)', value: 'font-headline' },
    { label: 'Space Grotesk (Body)', value: 'font-body' },
    { label: 'Roboto Slab', value: 'font-slab' },
    { label: 'Playfair Display', value: 'font-serif' },
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
                                    {option.label}
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
