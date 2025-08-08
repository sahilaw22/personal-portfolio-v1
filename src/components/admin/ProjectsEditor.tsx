
'use client';
import { useEffect, memo } from 'react';
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
import { ScrollArea } from '../ui/scroll-area';

const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  image: z.string(),
  coverVideoUrl: z.string().optional(),
  coverVideoPoster: z.string().optional(),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  github: z.string().url('Must be a valid URL'),
  live: z.string().url('Must be a valid URL'),
  aiHint: z.string(),
});

const formSchema = z.object({
  projects: z.array(projectSchema),
});

function ProjectsEditor() {
  const { portfolioData, updateAllProjects } = useAppState();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projects: portfolioData.projects || [],
    },
  });
  
  useEffect(() => {
    form.reset({ projects: portfolioData.projects });
  }, [portfolioData.projects, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

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
        <CardDescription>
          Manage the projects showcased in your portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-[500px] pr-4">
            <Accordion type="multiple" defaultValue={fields.map(f => f.id)} className="w-full">
              {fields.map((field, index) => (
                <AccordionItem key={field.id} value={field.id}>
                  <div className="flex items-center">
                    <AccordionTrigger className="flex-1">
                      {form.watch(`projects.${index}.title`) || 'New Project'}
                    </AccordionTrigger>
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <AccordionContent className="space-y-4 p-2">
                    <FormField control={form.control} name={`projects.${index}.title`} render={({ field }) => ( <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`projects.${index}.github`} render={({ field }) => ( <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`projects.${index}.live`} render={({ field }) => ( <FormItem><FormLabel>Live URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name={`projects.${index}.coverVideoUrl`} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Video File (optional)</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Input 
                                type="file" 
                                accept="video/*"
                                onChange={async (e) => {
                                  if (e.target.files && e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    // Check file size (50MB limit)
                                    const maxBytes = 50 * 1024 * 1024;
                                    if (file.size > maxBytes) {
                                      alert('Video file too large. Please choose a video under 50MB.');
                                      return;
                                    }
                                    // Convert to data URL
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      field.onChange(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                              {field.value && (
                                <div className="text-xs text-muted-foreground">
                                  Video uploaded ({(field.value.length / 1024 / 1024).toFixed(1)}MB)
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
          <FormField control={form.control} name={`projects.${index}.coverVideoPoster`} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Video Poster File (optional)</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Input 
                                type="file" 
                                accept="image/*"
                                onChange={async (e) => {
                                  if (e.target.files && e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    // Convert to data URL
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      field.onChange(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                              {field.value && (
                                <div className="text-xs text-muted-foreground">
                                  Poster image uploaded
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    {/* Inline video preview */}
                    {(() => {
                      const url = form.watch(`projects.${index}.coverVideoUrl`);
                      const poster = form.watch(`projects.${index}.coverVideoPoster`);
                      if (!url) return null;
                      return (
                        <div className="rounded-md border p-3">
                          <div className="text-sm font-medium mb-2">Cover Video Preview</div>
                          <div className="relative w-full aspect-video overflow-hidden rounded bg-muted">
                            {/* Using controls for manual play in editor; public view will be muted+loop */}
                            <video
                              className="absolute inset-0 h-full w-full object-cover"
                              src={url}
                              poster={poster || undefined}
                              controls
                              playsInline
                              preload="metadata"
                              muted
                              loop
                              onError={(e) => {
                                // Soft hint in UI when video fails
                                const el = e.currentTarget;
                                const hint = el.nextElementSibling as HTMLElement | null;
                                if (hint) {
                                  hint.textContent = 'Could not load video. Check the URL or file type.';
                                }
                              }}
                            />
                            <div className="sr-only">Inline video preview</div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={(e) => {
                                const container = (e.currentTarget as HTMLButtonElement).closest('div');
                                const vid = container?.querySelector('video') as HTMLVideoElement | null;
                                vid?.play();
                              }}
                            >
                              Play Preview
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => form.setValue(`projects.${index}.coverVideoPoster`, '')}
                            >
                              Clear Poster
                            </Button>
                            <span className="text-xs text-muted-foreground">Preview is muted and loops; poster shows before playback.</span>
                            <span className="text-xs text-destructive"></span>
                          </div>
                        </div>
                      );
                    })()}
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={() => {
                        form.setValue(`projects.${index}.coverVideoUrl`, '');
                        form.setValue(`projects.${index}.coverVideoPoster`, '');
                      }}>
                        Remove Cover Video
                      </Button>
                    </div>
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
            </ScrollArea>
            <Button type="button" variant="outline" onClick={() => append({ id: new Date().toISOString(), title: 'New Project', description: 'A brief description of this project.', image: 'https://placehold.co/600x400.png', coverVideoUrl: '', coverVideoPoster: '', tags: ['new-tag'], github: 'https://github.com', live: 'https://example.com', aiHint: 'new project' })} className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Project
            </Button>
            <Button type="submit" className="w-full mt-6">
             Save All Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default memo(ProjectsEditor);
