
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader2, Download, Eye } from 'lucide-react';
import { useAppState } from '../AppStateProvider';

const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export default function ResumeUploader() {
  const { portfolioData, updateThemeSettings } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please select a PDF file for your resume.',
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({ variant: 'destructive', title: 'No file selected.' });
      return;
    }

    setIsLoading(true);
    
    try {
        const dataUrl = await fileToDataUrl(selectedFile);
        updateThemeSettings({
            ...portfolioData.theme,
            resumeUrl: dataUrl,
        });
      
      toast({
        title: 'Resume Updated!',
        description: 'Your new resume has been saved.',
      });
      setSelectedFile(null);

    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: (err as Error).message || 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentResumeUrl = portfolioData.theme?.resumeUrl || '/resume.pdf';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Manager</CardTitle>
        <CardDescription>
          Upload a new resume in PDF format. This will replace the current resume linked in your portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="resume-upload" className="text-sm font-medium block mb-2">
            1. Choose Resume File (PDF only)
          </label>
          <Input
            id="resume-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={isLoading}
          />
           {selectedFile && <p className="text-sm text-muted-foreground mt-2">Selected: {selectedFile.name}</p>}
        </div>
        
        <Button onClick={handleUpload} disabled={isLoading || !selectedFile} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload & Replace Resume
            </>
          )}
        </Button>

        <div className="border-t pt-4 space-y-2">
             <h3 className="text-sm font-medium">2. Manage Current Resume</h3>
            <div className="flex gap-2">
                <Button variant="outline" asChild className="flex-1">
                    <a href={currentResumeUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="mr-2 h-4 w-4" />
                        View Current
                    </a>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                    <a href={currentResumeUrl} download="Sahil_Ahmed_Wani_Resume.pdf">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </a>
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
