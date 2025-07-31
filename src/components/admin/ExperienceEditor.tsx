
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
  const { portfolioData, addExperience, updateExperience, deleteExperience } = useAppState();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience: portfolioData.experience,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });
  
  // This effect synchronizes the form with the global state when the component first loads
  // or if the global state is updated from an external source.
  useEffect(() => {
    // A deep comparison to prevent unnecessary re-renders/resets
    if (JSON.stringify(fields) !== JSON.stringify(portfolioData.experience)) {
        form.reset({ experience: portfolioData.experience });
    }
  }, [portfolioData.experience, form.reset, fields]);


  const handleAddNew = () => {
    const newExperience = { id: new Date().toISOString(), role: 'New Role', company: 'New Company', period: 'Year - Year', description: 'A brief description of your responsibilities.' };
    append(newExperience);
  };
  
  const handleRemove = (index: number) => {
    remove(index);
    toast({ title: 'Experience Entry Marked for Deletion' });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This function now becomes the single source of truth for updating the global state.
    const initialIds = portfolioData.experience.map(e => e.id);
    const formIds = values.experience.map(e => e.id);

    // Find and delete removed items
    initialIds.forEach(id => {
      if (!formIds.includes(id)) {
        deleteExperience(id);
      }
    });

    // Find and add/update items
    values.experience.forEach(exp => {
      if (initialIds.includes(exp.id)) {
        // It's an existing item, so update it
        updateExperience(exp);
      } else {
        // It's a new item, so add it
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
