
'use client';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Crop, Loader2, Trash2, Upload, X } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '../ui/dialog';
import ReactCrop, { type Crop as CropType, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

function getCroppedImg(image: HTMLImageElement, crop: CropType, fileName: string): Promise<string> {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return Promise.reject(new Error('Failed to get canvas context'));
    }

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
    );

    return new Promise((resolve) => {
        resolve(canvas.toDataURL('image/jpeg'));
    });
}


export default function ImageUploader() {
  const { portfolioData, updateHeroContent, updateAboutContent, updateProject, updateContactContent } = useAppState();
  const [target, setTarget] = useState<string>('');
  const [lastUploadedImage, setLastUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Cropping state
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<CropType>();
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState('');

  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (!target) {
        toast({ variant: 'destructive', title: 'Please select a target section first.' });
        e.target.value = ''; 
        return;
      }
      
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(file);
      setIsCropModalOpen(true);
    }
  };

  const handleSave = async (croppedDataUrl: string) => {
    if (!target) {
      toast({ variant: 'destructive', title: 'No target selected.' });
      return;
    }

    setIsLoading(true);

    try {
      setLastUploadedImage(croppedDataUrl);

      if (target === 'hero' || target === 'about' || target === 'contact') {
          const content = portfolioData[target];
          const updateFunction = {
              'hero': updateHeroContent,
              'about': updateAboutContent,
              'contact': updateContactContent,
          }[target];
          updateFunction({...content, image: croppedDataUrl});
      } else if (target.startsWith('project-')) {
          const projectId = target.replace('project-', '');
          const projectToUpdate = portfolioData.projects.find(p => p.id === projectId);
          if (projectToUpdate) {
              updateProject({ ...projectToUpdate, image: croppedDataUrl });
          }
      }

      toast({
        title: 'Image Updated!',
        description: `The cropped image has been saved.`,
      });

    } catch(err) {
         toast({
          variant: 'destructive',
          title: 'Update Failed',
          description: (err as Error).message || 'An unknown error occurred.',
        });
    } finally {
        setIsLoading(false);
        setIsCropModalOpen(false);
    }
  };

  const handleTargetChange = (value: string) => {
    setTarget(value);
    if (value === 'hero' || value === 'about') {
        setAspect(1 / 1); // Square for profile pics
    } else {
        setAspect(16 / 9); // Widescreen for projects/contact
    }
  };
  
  const handleCropComplete = async (c: CropType) => {
    if (imgRef.current && c.width && c.height) {
        const croppedDataUrl = await getCroppedImg(imgRef.current, c, 'cropped.jpg');
        setCroppedImageUrl(croppedDataUrl);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    imgRef.current = e.currentTarget;
    const { width, height } = e.currentTarget;
    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect || 16/9,
        width,
        height
      ),
      width,
      height
    );
    setCrop(newCrop);
    handleCropComplete(newCrop);
  };
  
  const handleRemoveImage = () => {
    if (!target) {
        toast({ variant: 'destructive', title: 'Please select a target section first.'});
        return;
    }
    
    const placeholderUrl = 'https://placehold.co/600x400.png';

    if (target === 'hero' || target === 'about' || target === 'contact') {
          const content = portfolioData[target];
          const updateFunction = {
              'hero': updateHeroContent,
              'about': updateAboutContent,
              'contact': updateContactContent,
          }[target];
          updateFunction({...content, image: placeholderUrl});
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
    <>
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Image Manager</CardTitle>
        <CardDescription>Upload, crop, and assign images to different sections of your portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-6'>
            <div className='space-y-2'>
                <label className="text-sm font-medium">1. Select Target Section</label>
                <Select onValueChange={handleTargetChange} value={target}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select where to use this image..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Main Sections</SelectLabel>
                        <SelectItem value="hero">Hero Profile Image (1:1)</SelectItem>
                        <SelectItem value="about">About Section Image (1:1)</SelectItem>
                        <SelectItem value="contact">Contact Section Image (16:9)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                        <SelectLabel>Projects (16:9)</SelectLabel>
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
                        value=""
                    />
                </div>
            </div>
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

    <Dialog open={isCropModalOpen} onOpenChange={setIsCropModalOpen}>
        <DialogContent className="max-w-4xl">
            <DialogHeader>
                <DialogTitle>Crop Image</DialogTitle>
                <p className="text-sm text-muted-foreground">Adjust the selection to crop the image. Aspect ratio is locked to {aspect === 1 ? '1:1' : '16:9'}.</p>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
                <div className="md:col-span-2">
                    {imgSrc && (
                        <ReactCrop
                            crop={crop}
                            onChange={c => setCrop(c)}
                            onComplete={handleCropComplete}
                            aspect={aspect}
                            minWidth={100}
                            minHeight={100}
                        >
                            <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} className="w-full" />
                        </ReactCrop>
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Preview</h3>
                    {croppedImageUrl && (
                        <div className="overflow-hidden rounded-md border">
                            <Image src={croppedImageUrl} alt="Cropped Preview" width={400} height={400 * (aspect === 1 ? 1 : 9/16)} className="w-full object-contain" />
                        </div>
                    )}
                </div>
            </div>
            <DialogFooter>
                 <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={() => handleSave(croppedImageUrl)} disabled={isLoading || !croppedImageUrl}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Crop className="mr-2 h-4 w-4" />}
                    Save Cropped Image
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}
