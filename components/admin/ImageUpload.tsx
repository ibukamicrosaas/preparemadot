'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/lib/supabase/upload';

type Bucket = 'product-images' | 'blog-images';

type Props = {
  bucket: Bucket;
  currentUrl?: string;
  onUpload: (url: string) => void;
  label?: string;
};

export default function ImageUpload({ bucket, currentUrl, onUpload, label = 'Image' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    try {
      const { url } = await uploadImage(file, bucket);
      onUpload(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'upload');
      setPreview(currentUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:border-or/50 transition-colors bg-gray-50 group"
        style={{ minHeight: '160px' }}
      >
        {preview ? (
          <div className="relative w-full h-40">
            <Image src={preview} alt="Aperçu" fill className="object-cover" unoptimized />
            {uploading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                <div className="text-sm text-gray-500">Upload…</div>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-white text-xs font-medium bg-black/50 px-3 py-1.5 rounded-full">Changer</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400 gap-2">
            <span className="text-3xl">📷</span>
            <p className="text-xs text-center px-4">
              {uploading ? 'Upload en cours…' : 'Cliquer ou glisser une image (JPG, PNG, WEBP — max 5 Mo)'}
            </p>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} className="hidden" />
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
