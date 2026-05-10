import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Admin — Prepare Ma Dot', template: '%s | Admin PMD' },
  robots: { index: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
