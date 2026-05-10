import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Strict-Transport-Security (HSTS) — active HTTPS forcé
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      // Supabase Storage (product-images, blog-images)
      { protocol: 'https', hostname: '*.supabase.co' },
      // Placeholder images (à retirer en production si non utilisé)
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Désactiver le header "x-powered-by: Next.js" pour ne pas exposer la stack
  poweredByHeader: false,
};

export default nextConfig;
