
'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { PlusCircle, Trash2, GripVertical } from 'lucide-react';
import { iconMap } from '@/lib/icon-map';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  icon: z.string().min(1, 'Icon is required'),
});

const categorySchema = z.object({
  title: z.string().min(2, 'Category title is required'),
  skills: z.array(skillSchema),
});

const formSchema = z.object({
  categories: z.array(categorySchema),
});

export default function SkillsEditor() {
  const { portfolioData, updateSkills } = useAppState();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: portfolioData.skills,
    },
  });

  const { fields: categoryFields, append: appendCategory, remove: removeCategory } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateSkills(values.categories);
    toast({
      title: 'Skills Updated!',
      description: 'Your skills section has been successfully updated.',
    });
  }
  
  const iconNames = Object.keys(iconMap);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Editor</CardTitle>
        <CardDescription>Manage your skill categories and the skills within them.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Accordion type="multiple" defaultValue={categoryFields.map(c => c.id)} className="w-full">
              {categoryFields.map((categoryField, categoryIndex) => (
                <AccordionItem key={categoryField.id} value={categoryField.id}>
                    <div className="flex items-center">
                      <AccordionTrigger className="flex-1">
                        {form.watch(`categories.${categoryIndex}.title`) || 'New Category'}
                      </AccordionTrigger>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeCategory(categoryIndex)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  <AccordionContent>
                    <div className="space-y-4 p-2">
                       <FormField
                          control={form.control}
                          name={`categories.${categoryIndex}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category Title</FormLabel>
                              <FormControl><Input {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <SkillList control={form.control} categoryIndex={categoryIndex} iconNames={iconNames} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
             <Button type="button" variant="outline" onClick={() => appendCategory({ title: 'New Category', skills: [] })} className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
            </Button>
            <Button type="submit" className="w-full mt-6">Save All Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function SkillList({ control, categoryIndex, iconNames }: { control: any, categoryIndex: number, iconNames: string[] }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `categories.${categoryIndex}.skills`
    });

    return (
        <div className="space-y-2 pl-4 border-l">
            <h4 className="font-medium text-sm">Skills</h4>
            {fields.map((skillField, skillIndex) => (
                <div key={skillField.id} className="flex items-center gap-2">
                     <FormField
                        control={control}
                        name={`categories.${categoryIndex}.skills.${skillIndex}.name`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl><Input placeholder="Skill Name" {...field} /></FormControl>
                          </FormItem>
                        )}
                      />
                     <FormField
                        control={control}
                        name={`categories.${categoryIndex}.skills.${skillIndex}.icon`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an icon" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {iconNames.map(iconName => (
                                    <SelectItem key={iconName} value={iconName}>{iconName}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                          </FormItem>
                        )}
                      />

                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(skillIndex)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            ))}
             <Button type="button" variant="ghost" size="sm" onClick={() => append({ name: '', icon: 'Code' })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
            </Button>
        </div>
    )
}
