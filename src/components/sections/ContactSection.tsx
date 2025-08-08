'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import type { ContactSubmission } from '@/lib/types';
import Image from 'next/image';
import { ChevronRight, Github, Linkedin } from 'lucide-react';
import { useAppState } from '../AppStateProvider';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormProps = {
  onFormSubmit: (submission: Omit<ContactSubmission, 'submittedAt'>) => void;
};

const personalInfo = {
  github: 'https://www.github.com/sahilaw22',
  linkedin: 'https://www.linkedin.com/in/sahil-a-057a0231a',
};

export default function ContactSection({ onFormSubmit }: ContactFormProps) {
  const { toast } = useToast();
  const { portfolioData } = useAppState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onFormSubmit(values);
    toast({
      title: 'Message Sent!',
      description: 'Thanks for reaching out. I will get back to you soon.',
    });
    form.reset();
  }

  return (
    <section id="contact" className="w-full py-8 md:py-16 lg:py-24 border-t">
      <div className="container grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-primary">
            Let's Collaborate
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a project in mind, a question, or just want to connect? My inbox is always open. I'm excited to hear about your ideas and see how we can work together to create something amazing.
          </p>
           <div className="w-full aspect-video relative">
             <Image
              src={portfolioData.contact.image}
              alt="Collaboration"
              fill
              className="rounded-lg object-cover"
              data-ai-hint="collaboration message"
            />
          </div>
        </div>
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="What should I call you?" {...field} className="text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Where can I reach you?" type="email" {...field} className="text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What's on your mind?" {...field} className="text-base" rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full group text-base" size="lg" disabled={form.formState.isSubmitting}>
                <span className="relative z-10 flex items-center justify-center">
                  {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                   <ChevronRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </form>
          </Form>
           <div className="mt-4 flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground">Or connect with me on:</p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-7 w-7 transition-colors hover:text-primary" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-7 w-7 transition-colors hover:text-primary" />
                  </a>
                </Button>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
