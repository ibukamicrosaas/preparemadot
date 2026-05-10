'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navigation, siteConfig } from '@/data/site';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-bordeaux-dark/95 backdrop-blur-sm border-b border-or/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-serif text-or text-lg md:text-xl font-semibold tracking-wide">
              {siteConfig.name}
            </span>
            <span className="text-beige/60 text-[10px] md:text-xs font-light tracking-widest uppercase hidden sm:block">
              La dot africaine, avec élégance
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  pathname === item.href
                    ? 'text-or'
                    : 'text-beige/80 hover:text-or'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/demande-personnalisee"
              className="bg-or text-bordeaux-dark text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-or-light transition-colors duration-200"
            >
              Préparer ma dot
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden text-beige p-2 rounded-lg hover:bg-bordeaux/50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-bordeaux-dark border-t border-or/20">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'py-3 px-3 rounded-lg text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-or bg-bordeaux/50'
                    : 'text-beige/80 hover:text-or hover:bg-bordeaux/30'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-or/20 mt-2 flex flex-col gap-2">
              <Link
                href="/demande-personnalisee"
                onClick={() => setMenuOpen(false)}
                className="bg-or text-bordeaux-dark text-sm font-semibold px-5 py-3 rounded-full text-center hover:bg-or-light transition-colors"
              >
                Préparer ma dot
              </Link>
              <a
                href={getWhatsAppUrl('default')}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-or/50 text-or text-sm font-medium px-5 py-3 rounded-full text-center hover:bg-or/10 transition-colors"
              >
                Nous contacter sur WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
