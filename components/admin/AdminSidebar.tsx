'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: '📊', exact: true },
  { href: '/admin/produits', label: 'Produits', icon: '🛍️' },
  { href: '/admin/packs', label: 'Packs', icon: '📦' },
  { href: '/admin/blog', label: 'Blog', icon: '✍️' },
  { href: '/admin/demandes', label: 'Demandes', icon: '📋' },
  { href: '/admin/commandes', label: 'Commandes', icon: '🛒' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-64 bg-bordeaux-dark flex flex-col min-h-screen fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-beige/10">
        <Link href="/admin" className="block">
          <span className="font-serif text-or text-lg font-semibold">Prepare Ma Dot</span>
          <span className="block text-beige/40 text-xs mt-0.5">Administration</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-or/20 text-or'
                  : 'text-beige/60 hover:text-beige hover:bg-beige/5'
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-beige/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-beige/40 hover:text-beige/70 transition-colors"
        >
          <span>🔗</span> Voir le site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-beige/40 hover:text-red-400 hover:bg-red-900/20 transition-colors"
        >
          <span>🚪</span> Déconnexion
        </button>
      </div>
    </aside>
  );
}
