
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Loader2, Trash2, Upload } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export default function ImageUploader() {
  const { portfolioData, updateHeroContent, updateAboutContent, updateProject, updateContactContent } = useAppState();
  const [target, setTarget] = useState<string>('');
  const [lastUploadedImage, setLastUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (!target) {
        toast({ variant: 'destructive', title: 'Please select a target section first.' });
        e.target.value = ''; // Reset file input
        return;
      }
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!target) {
      toast({ variant: 'destructive', title: 'No target selected.' });
      return;
    }
    if (!selectedFile) {
      toast({ variant: 'destructive', title: 'No file selected.' });
      return;
    }

    setIsLoading(true);

    try {
      const dataUrl = await fileToDataUrl(selectedFile);
      setLastUploadedImage(dataUrl);

      if (target === 'hero') {
          updateHeroContent({...portfolioData.hero, image: dataUrl});
      } else if (target === 'about') {
          updateAboutContent({...portfolioData.about, image: dataUrl});
      } else if (target === 'contact') {
          updateContactContent({...portfolioData.contact, image: dataUrl});
      } else if (target.startsWith('project-')) {
          const projectId = target.replace('project-', '');
          const projectToUpdate = portfolioData.projects.find(p => p.id === projectId);
          if (projectToUpdate) {
              updateProject({ ...projectToUpdate, image: dataUrl });
          }
      }

      toast({
        title: 'Image Updated!',
        description: `The image has been saved for the selected section.`,
      });

    } catch(err) {
         toast({
          variant: 'destructive',
          title: 'Update Failed',
          description: (err as Error).message || 'An unknown error occurred.',
        });
    } finally {
        setIsLoading(false);
        setSelectedFile(null);
    }
  };

  const handleRemoveImage = () => {
    if (!target) {
        toast({ variant: 'destructive', title: 'Please select a target section first.'});
        return;
    }
    
    const placeholderUrl = 'https://placehold.co/600x400.png';

    if (target === 'hero') {
        updateHeroContent({...portfolioData.hero, image: placeholderUrl});
    } else if (target === 'about') {
        updateAboutContent({...portfolioData.about, image: placeholderUrl});
    } else if (target === 'contact') {
        updateContactContent({...portfolioData.contact, image: placeholderUrl});
    } else if (target.startsWith('project-')) {
        const projectId = target.replace('project-', '');
        const projectToUpdate = portfolioData.projects.find(p => p.id === projectId);
        if (projectToUpdate) {
            updateProject({ ...projectToUpdate, image: placeholderUrl });
        }
    }
    
    toast({
        title: 'Image Removed',
        description: 'The image for the selected section has been reset to the default placeholder.'
    });
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Image Manager</CardTitle>
        <CardDescription>Upload a new image or remove an existing one from a section of your portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-6'>
            <div className='space-y-2'>
                <label className="text-sm font-medium">1. Select Target Section</label>
                <Select onValueChange={setTarget} value={target}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select where to use this image..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Main Sections</SelectLabel>
                        <SelectItem value="hero">Hero Profile Image</SelectItem>
                        <SelectItem value="about">About Section Image</SelectItem>
                        <SelectItem value="contact">Contact Section Image</SelectItem>
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
                <label className="text-sm font-medium">2. Choose New Image</label>
                 <div className="flex items-center gap-2">
                    <Input 
                        id="file-upload"
                        type="file" 
                        name="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        disabled={!target || isLoading}
                    />
                </div>
                {selectedFile && <p className="text-sm text-muted-foreground mt-2">Selected: {selectedFile.name}</p>}
            </div>

            <Button onClick={handleSave} disabled={isLoading || !selectedFile} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Save Image
                </>
              )}
            </Button>
          </div>

        <div className="mt-6">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={!target} className="w-full">
                        <Trash2 className="mr-2 h-4 w-4" /> Remove Current Image
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will remove the current image from the selected section and replace it with a default placeholder. This cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRemoveImage}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        
        {lastUploadedImage && (
          <div className='mt-6'>
            <h3 className="text-lg font-medium">Last Saved Image Preview:</h3>
            <div className="relative mt-2 w-full max-w-md aspect-video">
                 <Image src={lastUploadedImage} alt="Preview" fill className="object-contain rounded-md border" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
