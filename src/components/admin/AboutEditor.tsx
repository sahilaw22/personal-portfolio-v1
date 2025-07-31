
'use client';
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
import { iconMap } from '@/lib/icon-map';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useEffect } from 'react';

const serviceSchema = z.object({
  id: z.string(),
  icon: z.string().min(1, 'Icon is required'),
  title: z.string().min(2, 'Title is required'),
  color: z.string().min(1, 'Color is required'),
});

const statSchema = z.object({
  id: z.string(),
  value: z.string().min(1, 'Value is required'),
  label: z.string().min(2, 'Label is required'),
});

const formSchema = z.object({
  bio: z.string().min(20, 'Bio must be at least 20 characters'),
  services: z.array(serviceSchema),
  stats: z.array(statSchema),
  image: z.string(),
});

export default function AboutEditor() {
  const { portfolioData, updateAboutContent } = useAppState();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: portfolioData.about,
  });

  useEffect(() => {
    form.reset(portfolioData.about);
  }, [portfolioData.about, form.reset]);

  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({
    control: form.control,
    name: "services",
  });
  
  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({
    control: form.control,
    name: "stats",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateAboutContent(values);
    toast({
      title: 'About Section Updated!',
      description: 'Your "About Me" section has been successfully updated.',
    });
  }
  
  const iconNames = Object.keys(iconMap);
  const colorClasses = ['text-primary', 'text-chart-1', 'text-chart-2', 'text-chart-3', 'text-chart-4', 'text-chart-5'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section Editor</CardTitle>
        <CardDescription>Update the content of your "About Me" section.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

            <div>
              <h3 className="text-lg font-medium mb-2">Services</h3>
              <Accordion type="multiple" className="w-full">
                {serviceFields.map((field, index) => (
                  <AccordionItem key={field.id} value={field.id}>
                    <div className="flex items-center">
                      <AccordionTrigger className="flex-1">
                        {form.watch(`services.${index}.title`) || 'New Service'}
                      </AccordionTrigger>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeService(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <AccordionContent className="space-y-4 p-2">
                      <FormField control={form.control} name={`services.${index}.title`} render={({ field }) => ( <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                      <FormField control={form.control} name={`services.${index}.icon`} render={({ field }) => ( <FormItem><FormLabel>Icon</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select an icon" /></SelectTrigger></FormControl><SelectContent>{iconNames.map(icon => <SelectItem key={icon} value={icon}>{icon}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem> )} />
                      <FormField control={form.control} name={`services.${index}.color`} render={({ field }) => ( <FormItem><FormLabel>Color</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a color" /></SelectTrigger></FormControl><SelectContent>{colorClasses.map(color => <SelectItem key={color} value={color}>{color}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem> )} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button type="button" variant="outline" onClick={() => appendService({id: new Date().toISOString(), title: '', icon: 'Code', color: 'text-primary'})} className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Service
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Stats</h3>
              <div className="grid grid-cols-1 gap-4">
                 {statFields.map((field, index) => (
                    <div key={field.id} className="flex flex-col sm:flex-row items-center gap-2 p-2 border rounded-md">
                        <FormField control={form.control} name={`stats.${index}.value`} render={({ field }) => ( <FormItem className="w-full sm:w-1/2"><FormLabel>Value</FormLabel><FormControl><Input {...field} /></FormControl></FormItem> )} />
                        <FormField control={form.control} name={`stats.${index}.label`} render={({ field }) => ( <FormItem className="w-full sm:w-1/2"><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl></FormItem> )} />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeStat(index)} className="mt-4 sm:mt-0">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                 ))}
              </div>
              <Button type="button" variant="outline" onClick={() => appendStat({ id: new Date().toISOString(), value: '', label: '' })} className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Stat
              </Button>
            </div>


            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

    