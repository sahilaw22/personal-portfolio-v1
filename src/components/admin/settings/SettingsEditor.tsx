
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Switch } from '../../ui/switch';
import { useEffect } from 'react';

const formSchema = z.object({
  themeMode: z.enum(['light', 'dark']),
});

export default function SettingsEditor() {
  const { portfolioData, updateAppSettings } = useAppState();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: portfolioData.settings,
  });
  
  useEffect(() => {
    form.reset(portfolioData.settings);
  }, [portfolioData.settings, form.reset]);
  
  useEffect(() => {
    const subscription = form.watch((value) => {
        updateAppSettings(value as Partial<z.infer<typeof formSchema>>);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateAppSettings]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Settings</CardTitle>
        <CardDescription>Manage general settings for the admin panel.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="themeMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Theme
                    </FormLabel>
                    <FormDescription>
                        Toggle between light and dark mode.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value === 'dark'}
                      onCheckedChange={(checked) => field.onChange(checked ? 'dark' : 'light')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
