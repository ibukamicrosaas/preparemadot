'use client';

import { getSupabaseBrowserClient } from './client';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo

export async function uploadImage(
  file: File,
  bucket: 'product-images' | 'blog-images'
): Promise<{ url: string; path: string }> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Type de fichier non autorisé (JPG, PNG ou WEBP uniquement)');
  }
  if (file.size > MAX_SIZE) {
    throw new Error('Fichier trop volumineux (max 5 Mo)');
  }

  const supabase = getSupabaseBrowserClient();
  const ext = file.type.split('/')[1];
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { url: data.publicUrl, path };
}

export async function deleteImage(bucket: 'product-images' | 'blog-images', path: string) {
  const supabase = getSupabaseBrowserClient();
  const filename = path.split('/').pop()!;
  await supabase.storage.from(bucket).remove([filename]);
}
