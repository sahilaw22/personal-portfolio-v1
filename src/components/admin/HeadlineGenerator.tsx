'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateHeadline } from '@/ai/flows/headline-generator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  aboutMeText: z.string().min(20, { message: 'Please provide more detail about yourself (min 20 characters).' }),
  tone: z.enum(['professional', 'creative'], { required_error: 'You need to select a tone.' }),
});

export default function HeadlineGenerator() {
  const [headline, setHeadline] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aboutMeText: "I'm a passionate developer with a love for building modern, responsive, and intuitive web applications. My expertise lies in creating seamless user experiences from front to back, with a strong focus on clean code and scalable architecture.",
      tone: 'professional',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHeadline('');
    try {
      const result = await generateHeadline(values);
      if (result.headline) {
        setHeadline(result.headline);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Headline',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Headline Generator</CardTitle>
        <CardDescription>
          Generate a catchy tagline for your "About Me" section.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="aboutMeText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Me Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about your skills and experience" rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Tone</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="professional" />
                        </FormControl>
                        <FormLabel className="font-normal">Professional</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="creative" />
                        </FormControl>
                        <FormLabel className="font-normal">Creative</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Headline
                </>
              )}
            </Button>
          </form>
        </Form>
        {headline && (
          <div className="mt-6 rounded-lg border border-primary/50 bg-primary/10 p-4 text-center">
            <p className="text-lg font-medium text-primary glow-primary">{headline}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
