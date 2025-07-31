
'use client';
import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { PlusCircle, Trash2 } from 'lucide-react';

const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  image: z.string(),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  github: z.string().url('Must be a valid URL'),
  live: z.string().url('Must be a valid URL'),
  aiHint: z.string(),
});

const formSchema = z.object({
  projects: z.array(projectSchema),
});

export default function ProjectsEditor() {
  const { portfolioData, updateAllProjects } = useAppState();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projects: portfolioData.projects || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  useEffect(() => {
    if (portfolioData.projects) {
        form.reset({ projects: portfolioData.projects });
    }
  }, [portfolioData.projects, form.reset]);


  const handleAddNew = () => {
    const newProject = { id: new Date().toISOString(), title: 'New Project', description: 'A brief description of this project.', image: 'https://placehold.co/600x400.png', tags: ['new-tag'], github: 'https://github.com', live: 'https://example.com', aiHint: 'new project' };
    append(newProject);
  };
  
  const handleRemove = (index: number) => {
    remove(index);
    toast({ title: 'Project Removed' });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateAllProjects(values.projects);
    toast({
      title: 'Projects Updated!',
      description: 'Your projects section has been successfully updated and saved.',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects Editor</CardTitle>
        <CardDescription>Manage the projects showcased in your portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Accordion type="multiple" value={fields.map(f => f.id)} className="w-full">
              {fields.map((field, index) => (
                <AccordionItem key={field.id} value={field.id}>
                  <div className="flex items-center">
                    <AccordionTrigger className="flex-1">
                      {form.watch(`projects.${index}.title`) || 'New Project'}
                    </AccordionTrigger>
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemove(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <AccordionContent className="space-y-4 p-2">
                    <FormField control={form.control} name={`projects.${index}.title`} render={({ field }) => ( <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`projects.${index}.github`} render={({ field }) => ( <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`projects.${index}.live`} render={({ field }) => ( <FormItem><FormLabel>Live URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField
                      control={form.control}
                      name={`projects.${index}.tags`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags (comma-separated)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                              onChange={(e) => {
                                const newTags = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                field.onChange(newTags);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField control={form.control} name={`projects.${index}.aiHint`} render={({ field }) => ( <FormItem><FormLabel>AI Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button type="button" variant="outline" onClick={handleAddNew} className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Project
            </Button>
            <Button type="submit" className="w-full mt-6">Save All Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

    