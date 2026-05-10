'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

const statusOptions = [
  { value: 'pending', label: 'En attente' },
  { value: 'confirmed', label: 'Confirmé' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'ready', label: 'Prêt' },
  { value: 'delivered', label: 'Livré' },
  { value: 'cancelled', label: 'Annulé' },
];

type OrderItem = { name: string; qty: number; price?: number };

type Order = {
  id: string; full_name: string; email: string; whatsapp: string;
  delivery_city?: string; delivery_country?: string;
  items: OrderItem[]; subtotal?: number; notes?: string;
  status: string; admin_notes?: string; created_at: string;
};

export default function CommandeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.from('orders').select('*').eq('id', id).single()
      .then(({ data }: { data: Order | null }) => {
        if (data) { setOrder(data); setStatus(data.status); setNotes(data.admin_notes || ''); }
      });
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    const supabase = getSupabaseBrowserClient();
    await supabase.from('orders').update({ status, admin_notes: notes }).eq('id', id);
    setSaving(false);
    router.refresh();
  };

  if (!order) return <div className="p-8 text-gray-400">Chargement…</div>;

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/commandes" className="text-gray-400 hover:text-gray-700 text-sm">← Commandes</Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-serif text-2xl font-semibold text-gray-900">Commande — {order.full_name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Détails */}
        <div className="lg:col-span-2 space-y-4">
          {/* Client */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
            <h2 className="font-semibold text-gray-900 text-sm">Client</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-400 text-xs block">Nom</span>{order.full_name}</div>
              <div><span className="text-gray-400 text-xs block">Email</span>{order.email}</div>
              <div><span className="text-gray-400 text-xs block">WhatsApp</span>
                <a href={`https://wa.me/${order.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">{order.whatsapp}</a>
              </div>
              <div><span className="text-gray-400 text-xs block">Livraison</span>{[order.delivery_city, order.delivery_country].filter(Boolean).join(', ') || '—'}</div>
            </div>
          </div>

          {/* Articles */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 text-sm mb-4">Articles commandés</h2>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400">Qté : {item.qty}</p>
                  </div>
                  {item.price && <span className="text-sm font-semibold text-bordeaux">{item.price} €</span>}
                </div>
              ))}
              {order.subtotal && (
                <div className="flex justify-between pt-3 font-semibold text-gray-900">
                  <span>Sous-total</span>
                  <span>{order.subtotal} €</span>
                </div>
              )}
            </div>
          </div>

          {order.notes && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 text-sm mb-2">Notes du client</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-semibold text-gray-900 text-sm">Gestion</h2>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Statut</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm">
                {statusOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Notes internes</label>
              <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none" />
            </div>
            <button onClick={handleSave} disabled={saving} className="w-full bg-bordeaux text-white font-semibold text-sm py-3 rounded-full hover:bg-bordeaux-dark disabled:opacity-50 transition-colors">
              {saving ? 'Sauvegarde…' : 'Sauvegarder'}
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2">
            <h2 className="font-semibold text-gray-900 text-sm mb-3">Contact</h2>
            <a href={`https://wa.me/${order.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-[#25D366] hover:underline">
              <span>💬</span> WhatsApp
            </a>
            <a href={`mailto:${order.email}`} className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
              <span>📧</span> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
