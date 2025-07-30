'use client';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { Experience } from '@/lib/types';

const experienceSchema = z.object({
  id: z.string(),
  role: z.string().min(2, 'Role is required'),
  company: z.string().min(2, 'Company is required'),
  period: z.string().min(2, 'Period is required'),
  description: z.string().min(10, 'Description is required'),
});

const formSchema = z.object({
  experience: z.array(experienceSchema),
});

export default function ExperienceEditor() {
  const { portfolioData, updateExperience, addExperience, deleteExperience } = useAppState();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience: portfolioData.experience,
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const handleAddNew = () => {
    append({ id: new Date().toISOString(), role: '', company: '', period: '', description: '' });
  };
  
  const handleRemove = (index: number) => {
    const idToDelete = fields[index].id;
    deleteExperience(idToDelete);
    remove(index);
     toast({ title: 'Experience Removed' });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.experience.forEach(exp => {
      // Find if it's a new one (by checking if it exists in original data)
      const existing = portfolioData.experience.find(e => e.id === exp.id);
      if (existing) {
        updateExperience(exp);
      } else {
        addExperience(exp);
      }
    });
    toast({
      title: 'Experience Updated!',
      description: 'Your experience section has been successfully updated.',
    });
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Experience Editor</CardTitle>
        <CardDescription>Add, edit, or remove your work experiences.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Accordion type="multiple" defaultValue={fields.map(f => f.id)} className="w-full">
              {fields.map((field, index) => (
                <AccordionItem key={field.id} value={field.id}>
                  <div className="flex items-center">
                    <AccordionTrigger className="flex-1">
                      {form.watch(`experience.${index}.role`) || 'New Experience'}
                    </AccordionTrigger>
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemove(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <AccordionContent className="space-y-4 p-2">
                    <FormField
                      control={form.control}
                      name={`experience.${index}.role`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name={`experience.${index}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name={`experience.${index}.period`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Period</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name={`experience.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl><Textarea {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
             <Button type="button" variant="outline" onClick={handleAddNew} className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Experience
            </Button>
            <Button type="submit" className="w-full mt-6">Save All Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
