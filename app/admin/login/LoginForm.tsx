'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = getSupabaseBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brun mb-1.5">Email</label>
        <input
          id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          required autoComplete="email"
          className="w-full bg-beige border border-beige/80 rounded-xl px-4 py-3 text-sm text-brun focus:outline-none focus:ring-2 focus:ring-or/40 focus:border-or transition-colors"
          placeholder="admin@preparemadot.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-brun mb-1.5">Mot de passe</label>
        <input
          id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          required autoComplete="current-password"
          className="w-full bg-beige border border-beige/80 rounded-xl px-4 py-3 text-sm text-brun focus:outline-none focus:ring-2 focus:ring-or/40 focus:border-or transition-colors"
        />
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>
      )}
      <button type="submit" disabled={loading} className="w-full bg-bordeaux text-ivoire font-semibold text-sm py-3.5 rounded-full hover:bg-bordeaux-dark disabled:opacity-50 transition-colors">
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  );
}
