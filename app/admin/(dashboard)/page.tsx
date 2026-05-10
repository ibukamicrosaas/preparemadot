import { createSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';

async function getStats() {
  try {
    const supabase = await createSupabaseServerClient();
    const [
      { count: totalProducts },
      { count: totalPacks },
      { count: totalDemandes },
      { count: newDemandes },
      { count: totalOrders },
      { count: pendingOrders },
      { count: totalPosts },
    ] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('packs').select('*', { count: 'exact', head: true }),
      supabase.from('custom_requests').select('*', { count: 'exact', head: true }),
      supabase.from('custom_requests').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    ]);
    return { totalProducts, totalPacks, totalDemandes, newDemandes, totalOrders, pendingOrders, totalPosts };
  } catch {
    return { totalProducts: 0, totalPacks: 0, totalDemandes: 0, newDemandes: 0, totalOrders: 0, pendingOrders: 0, totalPosts: 0 };
  }
}

async function getRecentDemandes() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('custom_requests')
      .select('id, full_name, need_type, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    return data || [];
  } catch { return []; }
}

async function getRecentOrders() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('orders')
      .select('id, full_name, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    return data || [];
  } catch { return []; }
}

const statusLabels: Record<string, string> = {
  new: 'Nouveau', contacted: 'Contacté', quote_sent: 'Devis envoyé',
  converted: 'Converti', lost: 'Perdu',
  pending: 'En attente', confirmed: 'Confirmé', in_progress: 'En cours',
  ready: 'Prêt', delivered: 'Livré', cancelled: 'Annulé',
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700', contacted: 'bg-yellow-50 text-yellow-700',
  quote_sent: 'bg-purple-50 text-purple-700', converted: 'bg-green-50 text-green-700',
  lost: 'bg-gray-100 text-gray-500', pending: 'bg-orange-50 text-orange-700',
  confirmed: 'bg-blue-50 text-blue-700', in_progress: 'bg-yellow-50 text-yellow-700',
  ready: 'bg-purple-50 text-purple-700', delivered: 'bg-green-50 text-green-700',
  cancelled: 'bg-gray-100 text-gray-500',
};

export default async function AdminDashboard() {
  const [stats, demandes, orders] = await Promise.all([getStats(), getRecentDemandes(), getRecentOrders()]);

  const cards = [
    { label: 'Produits', value: stats.totalProducts ?? 0, href: '/admin/produits', icon: '🛍️', sub: null },
    { label: 'Packs', value: stats.totalPacks ?? 0, href: '/admin/packs', icon: '📦', sub: null },
    { label: 'Articles blog', value: stats.totalPosts ?? 0, href: '/admin/blog', icon: '✍️', sub: null },
    { label: 'Demandes', value: stats.totalDemandes ?? 0, href: '/admin/demandes', icon: '📋', sub: stats.newDemandes ? `${stats.newDemandes} nouvelle${(stats.newDemandes || 0) > 1 ? 's' : ''}` : null },
    { label: 'Commandes', value: stats.totalOrders ?? 0, href: '/admin/commandes', icon: '🛒', sub: stats.pendingOrders ? `${stats.pendingOrders} en attente` : null },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 text-sm mt-1">Bienvenue dans l&apos;administration de Prepare Ma Dot</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-or/40 hover:shadow-sm transition-all group"
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className="text-3xl font-bold text-gray-900 mb-0.5">{card.value}</div>
            <div className="text-sm text-gray-500 group-hover:text-bordeaux transition-colors">{card.label}</div>
            {card.sub && (
              <div className="text-xs font-medium text-orange-600 mt-1">{card.sub}</div>
            )}
          </Link>
        ))}
      </div>

      {/* Tableaux récents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demandes récentes */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">Demandes récentes</h2>
            <Link href="/admin/demandes" className="text-xs text-bordeaux hover:underline">Voir toutes →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {demandes.length === 0 ? (
              <p className="px-6 py-8 text-center text-gray-400 text-sm">Aucune demande</p>
            ) : demandes.map((d) => (
              <Link key={d.id} href={`/admin/demandes/${d.id}`} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{d.full_name}</p>
                  <p className="text-xs text-gray-400">{new Date(d.created_at).toLocaleDateString('fr-FR')}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[d.status] || 'bg-gray-100 text-gray-500'}`}>
                  {statusLabels[d.status] || d.status}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Commandes récentes */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">Commandes récentes</h2>
            <Link href="/admin/commandes" className="text-xs text-bordeaux hover:underline">Voir toutes →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {orders.length === 0 ? (
              <p className="px-6 py-8 text-center text-gray-400 text-sm">Aucune commande</p>
            ) : orders.map((o) => (
              <Link key={o.id} href={`/admin/commandes/${o.id}`} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{o.full_name}</p>
                  <p className="text-xs text-gray-400">{new Date(o.created_at).toLocaleDateString('fr-FR')}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[o.status] || 'bg-gray-100 text-gray-500'}`}>
                  {statusLabels[o.status] || o.status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
