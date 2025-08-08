'use client';
import { useState, useRef, memo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/components/AppStateProvider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Loader2, Trash2, Upload, Video as VideoIcon, Play } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

function VideoUploader() {
    const { portfolioData, updateHeroContent, updateAboutContent, updateProject, updateContactContent } = useAppState();
    const [target, setTarget] = useState<string>('');
    const [lastUploadedVideo, setLastUploadedVideo] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [storageMB, setStorageMB] = useState<number>(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { toast } = useToast();
    
    useEffect(() => {
        try {
            const json = JSON.stringify(portfolioData);
            setStorageMB(json.length / (1024 * 1024));
        } catch {
            // ignore
        }
    }, [portfolioData]);
  
    const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            if (!target) {
                toast({ variant: 'destructive', title: 'Please select a target section first.' });
                e.target.value = ''; 
                return;
            }
            
            const file = e.target.files[0];
            const maxBytes = 50 * 1024 * 1024; // 50MB limit
            
            if (file.size > maxBytes) {
                toast({ 
                    variant: 'destructive', 
                    title: 'Video too large', 
                    description: 'Please choose a video under 50MB for reliable saving.' 
                });
                e.target.value = '';
                return;
            }

            setIsLoading(true);
            
            try {
                // Convert file to data URL for localStorage persistence
                const reader = new FileReader();
                reader.onloadend = () => {
                    const dataUrl = reader.result as string;
                    handleSave(dataUrl);
                };
                reader.onerror = () => {
                    toast({ 
                        variant: 'destructive', 
                        title: 'Read failed', 
                        description: 'Could not read the selected video file.' 
                    });
                    setIsLoading(false);
                };
                reader.readAsDataURL(file);
            } catch (err) {
                toast({
                    variant: 'destructive',
                    title: 'Upload Failed',
                    description: (err as Error).message || 'An unknown error occurred.',
                });
                setIsLoading(false);
            }
            
            // Clear the input
            e.target.value = '';
        }
    };

    const handleSave = async (videoDataUrl: string) => {
        if (!target) {
            toast({ variant: 'destructive', title: 'No target selected.' });
            setIsLoading(false);
            return;
        }

        try {
            setLastUploadedVideo(videoDataUrl);

            if (target === 'hero') {
                const content = portfolioData.hero;
                updateHeroContent({...content, backgroundVideo: videoDataUrl});
            } else if (target === 'about') {
                const content = portfolioData.about;
                updateAboutContent({...content, backgroundVideo: videoDataUrl});
            } else if (target === 'contact') {
                const content = portfolioData.contact;
                updateContactContent({...content, backgroundVideo: videoDataUrl});
            } else if (target.startsWith('project-')) {
                const projectId = target.replace('project-', '');
                const projectToUpdate = portfolioData.projects.find(p => p.id === projectId);
                if (projectToUpdate) {
                    updateProject({ ...projectToUpdate, coverVideoUrl: videoDataUrl, coverVideoPoster: projectToUpdate.image });
                }
            }

            toast({
                title: 'Video Updated!',
                description: `The loop video has been saved and will play automatically.`,
            });

        } catch(err) {
            toast({
                variant: 'destructive',
                title: 'Update Failed',
                description: (err as Error).message || 'An unknown error occurred.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveVideo = () => {
        if (!target) {
            toast({ variant: 'destructive', title: 'Please select a target section first.'});
            return;
        }

        if (target === 'hero') {
            const content = portfolioData.hero;
            updateHeroContent({...content, backgroundVideo: undefined});
        } else if (target === 'about') {
            const content = portfolioData.about;
            updateAboutContent({...content, backgroundVideo: undefined});
        } else if (target === 'contact') {
            const content = portfolioData.contact;
            updateContactContent({...content, backgroundVideo: undefined});
        } else if (target.startsWith('project-')) {
            const projectId = target.replace('project-', '');
            const projectToUpdate = portfolioData.projects.find(p => p.id === projectId);
            if (projectToUpdate) {
                updateProject({ ...projectToUpdate, coverVideoUrl: undefined, coverVideoPoster: undefined });
            }
        }
        
        setLastUploadedVideo(null);
        toast({
            title: 'Video Removed',
            description: 'The video for the selected section has been removed.'
        });
    };
  
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <VideoIcon className="h-5 w-5" />
                    Loop Video Manager
                </CardTitle>
                <CardDescription>
                    Upload and assign looping background videos to different sections of your portfolio. Videos will auto-play, loop, and be muted.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-1 gap-6'>
                    <div className='space-y-2'>
                        <label className="text-sm font-medium">1. Select Target Section</label>
                        <Select onValueChange={setTarget} value={target}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select where to use this video..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Main Sections</SelectLabel>
                                    <SelectItem value="hero">Hero Background Video</SelectItem>
                                    <SelectItem value="about">About Section Background</SelectItem>
                                    <SelectItem value="contact">Contact Section Background</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Project Covers</SelectLabel>
                                    {portfolioData.projects.map(project => (
                                        <SelectItem key={project.id} value={`project-${project.id}`}>
                                            {project.title} - Cover Video
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='space-y-2'>
                        <label className="text-sm font-medium">2. Choose Video File</label>
                        <div className="flex items-center gap-2">
                            <Input 
                                id="video-upload"
                                type="file" 
                                name="video" 
                                accept="video/*" 
                                onChange={handleVideoChange}
                                disabled={!target || isLoading}
                            />
                            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Supported formats: MP4, WebM, MOV. Maximum size: 50MB
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Storage used: {storageMB.toFixed(2)} MB. Keep under ~45-50 MB for reliable persistence.
                        </p>
                        {storageMB > 45 && (
                            <p className="text-xs text-destructive">
                                You&apos;re near the storage limit. Consider using external hosting for large videos.
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" disabled={!target} className="w-full">
                                <Trash2 className="mr-2 h-4 w-4" /> Remove Current Video
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action will remove the current video from the selected section. This cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleRemoveVideo}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                
                {lastUploadedVideo && (
                    <div className='mt-6'>
                        <h3 className="text-lg font-medium flex items-center gap-2">
                            <Play className="h-4 w-4" /> 
                            Video Preview (Auto-playing Loop):
                        </h3>
                        <div className="relative mt-2 w-full max-w-md aspect-video">
                            <video 
                                ref={videoRef}
                                src={lastUploadedVideo} 
                                className="w-full h-full rounded-md border object-cover" 
                                autoPlay 
                                muted 
                                loop 
                                playsInline 
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            This is how your video will appear on the site - auto-playing, muted, and looping.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default memo(VideoUploader);
