'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Loader2 } from 'lucide-react';

export default function ImageUploader() {
  const { portfolioData, updateHeroContent, updateAboutContent, updateProject } = useAppState();
  const [target, setTarget] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { toast } = useToast();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast({ variant: 'destructive', title: 'No file selected.' });
      return;
    }
     if (!target) {
      toast({ variant: 'destructive', title: 'No target selected.' });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('cover', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setPreview(data.url);

        if (target === 'hero') {
            updateHeroContent({...portfolioData.hero, image: data.url});
        } else if (target === 'about') {
            updateAboutContent({...portfolioData.about, image: data.url});
        } else if (target.startsWith('project-')) {
            const projectId = target.replace('project-', '');
            const projectToUpdate = portfolioData.projects.find(p => p.id === projectId);
            if (projectToUpdate) {
                updateProject({ ...projectToUpdate, image: data.url });
            }
        }

        toast({
          title: 'Upload Successful!',
          description: `Image has been updated for the selected section.`,
        });
      } else {
         toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: data.error || 'An unexpected error occurred.',
        });
      }
    } catch(err) {
         toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: (err as Error).message,
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Image Uploader</CardTitle>
        <CardDescription>Upload an image and assign it to a section of your portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-6">
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
                <label className="text-sm font-medium">1. Select Target Section</label>
                <Select onValueChange={setTarget} value={target}>
                <SelectTrigger>
                    <SelectValue placeholder="Select where to use this image..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Main Sections</SelectLabel>
                        <SelectItem value="hero">Hero Profile Image</SelectItem>
                        <SelectItem value="about">About Section Image</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                        <SelectLabel>Projects</SelectLabel>
                        {portfolioData.projects.map(project => (
                            <SelectItem key={project.id} value={`project-${project.id}`}>{project.title}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
                </Select>
            </div>
            <div className='space-y-2'>
                 <label className="text-sm font-medium">2. Choose Image File</label>
                <Input 
                    type="file" 
                    name="cover" 
                    accept="image/*" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required 
                />
            </div>
          </div>
          <Button type="submit" disabled={isLoading || !file || !target} className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Upload and Update'}
          </Button>
        </form>
        
        {preview && (
          <div className='mt-6'>
            <h3 className="text-lg font-medium">Last Uploaded Image Preview:</h3>
            <div className="relative mt-2 w-full max-w-md aspect-video">
                 <Image src={preview} alt="Preview" fill className="object-contain rounded-md border" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Image URL: <code className="bg-muted p-1 rounded-sm">{preview}</code></p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
