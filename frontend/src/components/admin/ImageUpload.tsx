import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
// REMOVED: import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (url: string) => void;
  onImageRemoved: () => void;
}

const ImageUpload = ({
  currentImageUrl,
  onImageUploaded,
  onImageRemoved,
}: ImageUploadProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file type', variant: 'destructive' });
      return;
    }

    setIsUploading(true);

    try {
      // Create FormData to send the file to FastAPI
      const formData = new FormData();
      formData.append('file', file);

      // Call your FastAPI bridge instead of Supabase client
      const response = await fetch('/api/tours/upload-image', {
        method: 'POST',
        body: formData,
        // Do not set Content-Type header manually; the browser will set it with the boundary
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Upload failed');
      }

      const data = await response.json();

      // data.image_url comes from your FastAPI return statement
      const uploadedUrl =
        typeof data.image_url === 'string'
          ? data.image_url
          : data.image_url.public_url;

      setPreviewUrl(uploadedUrl);
      onImageUploaded(uploadedUrl);

      toast({
        title: 'Image uploaded',
        description: 'Tour image has been processed by FastAPI',
      });
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onImageRemoved();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className='space-y-3'>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept='image/*'
        className='hidden'
      />

      {previewUrl ? (
        <div className='relative w-full h-40 rounded-xl overflow-hidden border border-border'>
          <img
            src={previewUrl}
            alt='Tour preview'
            className='w-full h-full object-cover'
          />
          <Button
            type='button'
            size='icon'
            variant='destructive'
            className='absolute top-2 right-2 h-8 w-8'
            onClick={handleRemove}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      ) : (
        <button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className='w-full h-40 border-2 border-dashed border-muted-foreground/25 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-colors'
        >
          {isUploading ? (
            <Loader2 className='h-8 w-8 text-muted-foreground animate-spin' />
          ) : (
            <>
              <Upload className='h-8 w-8 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>
                Upload via FastAPI
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
