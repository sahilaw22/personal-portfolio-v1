'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function UploadPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('cover');

    if (!file || !(file instanceof File) || file.size === 0) {
      setMessage('No file selected.');
      return;
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Upload successful!');
        setPreview(data.url);
        toast({
          title: 'Upload Successful!',
          description: 'Your image has been uploaded.',
        });
      } else {
        setMessage(`Upload failed: ${data.error}`);
         toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: data.error || 'An unexpected error occurred.',
        });
      }
    } catch(err) {
        setMessage(`Upload failed: ${(err as Error).message}`);
         toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: (err as Error).message,
        });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Upload images for your portfolio here.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-4">
          <Input type="file" name="cover" accept="image/*" required />
          <Button type="submit">Upload</Button>
        </form>
        {message && <p className="mt-4 text-sm font-medium">{message}</p>}
        {preview && (
          <div className='mt-4'>
            <h3 className="text-lg font-medium">Image Preview:</h3>
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
