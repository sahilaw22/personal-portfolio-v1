
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

const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(2, 'Institution is required'),
  degree: z.string().min(2, 'Degree is required'),
  period: z.string().min(2, 'Period is required'),
  description: z.string().min(10, 'Description is required'),
});

const formSchema = z.object({
  education: z.array(educationSchema),
});

export default function EducationEditor() {
  const { portfolioData, addEducation, updateEducation, deleteEducation } = useAppState();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: portfolioData.education,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });
  
  // This effect synchronizes the form with the global state when the component first loads
  // or if the global state is updated from an external source.
  useEffect(() => {
    if (JSON.stringify(fields) !== JSON.stringify(portfolioData.education)) {
      form.reset({ education: portfolioData.education });
    }
  }, [portfolioData.education, form.reset, fields]);

  const handleAddNew = () => {
    const newEducation = { id: new Date().toISOString(), institution: 'New University/School', degree: 'Degree or Certificate', period: 'Year - Year', description: 'A brief description of your studies.' };
    append(newEducation);
  };
  
  const handleRemove = (id: string, index: number) => {
    remove(index);
    toast({ title: 'Education Entry Marked for Deletion' });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This function now becomes the single source of truth for updating the global state.
    // It will add, update, and remove items based on the final form state.
    
    // Simple approach: replace the entire education array in the global state
    // with the one from the form. AppStateProvider needs a method for this.
    // Let's assume a new method `setEducation` for simplicity, or we can do it manually.
    
    // To avoid adding a new method to the provider, we can diff the arrays, but that's complex.
    // The most robust way is to just replace the whole array. For now, let's just update all.
    // The issue is that the global state is the source of truth, but the form is the editor.
    
    const initialIds = portfolioData.education.map(e => e.id);
    const formIds = values.education.map(e => e.id);

    // Find and delete removed items
    initialIds.forEach(id => {
      if (!formIds.includes(id)) {
        deleteEducation(id);
      }
    });

    // Find and add/update items
    values.education.forEach(edu => {
      if (initialIds.includes(edu.id)) {
        updateEducation(edu);
      } else {
        addEducation(edu);
      }
    });
    
    toast({
      title: 'Education Updated!',
      description: 'Your education section has been successfully updated.',
    });
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education Editor</CardTitle>
        <CardDescription>Add, edit, or remove your education history.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Accordion type="multiple" defaultValue={fields.map(f => f.id)} className="w-full">
              {fields.map((field, index) => (
                <AccordionItem key={field.id} value={field.id}>
                  <div className="flex items-center">
                    <AccordionTrigger className="flex-1">
                      {form.watch(`education.${index}.institution`) || 'New Education'}
                    </AccordionTrigger>
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemove(field.id, index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <AccordionContent className="space-y-4 p-2">
                    <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => ( <FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => ( <FormItem><FormLabel>Degree / Certificate</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`education.${index}.period`} render={({ field }) => ( <FormItem><FormLabel>Period</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name={`education.${index}.description`} render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
             <Button type="button" variant="outline" onClick={handleAddNew} className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Education
            </Button>
            <Button type="submit" className="w-full mt-6">Save All Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
