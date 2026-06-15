'use client';

import { useState } from 'react';
import type { Order } from '@/lib/orders';

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [forwarding, setForwarding] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function loadOrders() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { Authorization: `Bearer ${secret}` },
      });
      if (!res.ok) throw new Error('Verkeerde admin key');
      const data = await res.json();
      setOrders(data.orders ?? []);
      setAuthenticated(true);
    } catch {
      setMessage('Admin key onjuist of niet geconfigureerd');
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  async function forwardOrder(orderId: string) {
    setForwarding(orderId);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/forward-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Order ${orderId} doorgestuurd naar supplier`);
        await loadOrders();
      } else if (data.manualEntry) {
        setMessage('API keys ontbreken — kopieer order handmatig naar supplier dashboard');
        navigator.clipboard.writeText(data.manualEntry);
      } else {
        setMessage(data.results?.map((r: { message: string }) => r.message).join(' · ') ?? 'Doorgesturen mislukt');
      }
    } catch {
      setMessage('Fout bij doorsturen');
    } finally {
      setForwarding(null);
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-[#F8F8F5] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl tracking-[3px] mb-2 text-[#E8A0BF]">FLOR D&apos;LUNE</h1>
          <p className="text-sm text-white/50 mb-8">Admin — Aankoop doorgeven aan supplier</p>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin secret"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 mb-4 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && loadOrders()}
          />
          <button
            type="button"
            onClick={loadOrders}
            disabled={loading || !secret}
            className="w-full py-3 bg-[#E8A0BF] text-[#111] text-sm tracking-[2px] font-medium disabled:opacity-40"
          >
            {loading ? 'LADEN...' : 'INLOGGEN'}
          </button>
          {message && <p className="text-red-400 text-sm mt-4">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F8F8F5] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-xl tracking-[3px] text-[#E8A0BF]">ORDERS</h1>
            <p className="text-sm text-white/40 mt-1">{orders.length} bestellingen</p>
          </div>
          <button type="button" onClick={loadOrders} className="text-xs tracking-[2px] text-white/50 hover:text-white">
            VERNIEUWEN
          </button>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-white/5 border border-[#E8A0BF]/30 text-sm text-[#E8A0BF]">
            {message}
          </div>
        )}

        {orders.length === 0 && (
          <p className="text-white/40 text-center py-20">Nog geen orders. Zodra iemand betaalt verschijnt het hier.</p>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-white/10 p-6 bg-white/[0.02]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="font-mono text-sm">{order.id}</div>
                  <div className="text-xs text-white/40 mt-1">
                    {new Date(order.createdAt).toLocaleString('nl-NL')} · {order.shipping.name}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg">€{(order.totalAmount / 100).toFixed(2)}</span>
                  <span
                    className={`text-xs px-3 py-1 tracking-widest ${
                      order.status === 'paid'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : order.status === 'forwarded'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="text-sm text-white/60 mb-2">
                {order.items.map((i) => `${i.quantity}x ${i.productName} (${i.variantLabel})`).join(' · ')}
              </div>
              <div className="text-xs text-white/30 mb-4">
                {order.shipping.line1}, {order.shipping.postalCode} {order.shipping.city}, {order.shipping.country}
                {' · '}{order.shipping.email}
              </div>

              {order.marginEstimate !== undefined && (
                <div className="text-xs text-[#E8A0BF]/70 mb-4">
                  Geschatte marge: €{(order.marginEstimate / 100).toFixed(2)}
                </div>
              )}

              {order.status === 'paid' && (
                <button
                  type="button"
                  onClick={() => forwardOrder(order.id)}
                  disabled={forwarding === order.id}
                  className="px-6 py-2 bg-[#E8A0BF] text-[#111] text-xs tracking-[2px] font-medium hover:bg-white transition disabled:opacity-40"
                >
                  {forwarding === order.id ? 'DOORSTUREN...' : 'AANKOOP DOORGEVEN AAN SUPPLIER'}
                </button>
              )}

              {order.status === 'forwarded' && order.supplierOrderId && (
                <div className="text-xs text-green-400/70">
                  Supplier ref: {order.supplierOrderId}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}