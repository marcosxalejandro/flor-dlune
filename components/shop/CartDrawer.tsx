'use client';

import { formatPrice, getProductById } from '@/lib/products';

export interface CartEntry {
  productId: string;
  variantId: string;
  quantity: number;
}

interface CartDrawerProps {
  items: CartEntry[];
  open: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, variantId: string, quantity: number) => void;
  onRemove: (productId: string, variantId: string) => void;
  onCheckout: () => void;
  checkingOut: boolean;
}

export default function CartDrawer({
  items,
  open,
  onClose,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  checkingOut,
}: CartDrawerProps) {
  if (!open) return null;

  const total = items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#F8F8F5] text-[#111] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5]">
          <h2 className="text-sm tracking-[3px]">CART ({items.length})</h2>
          <button type="button" onClick={onClose} className="text-2xl leading-none hover:text-[#E8A0BF]">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 && (
            <p className="text-sm text-[#666] text-center py-12">Je winkelwagen is leeg</p>
          )}
          {items.map((item) => {
            const product = getProductById(item.productId);
            const variant = product?.variants.find((v) => v.id === item.variantId);
            if (!product) return null;

            return (
              <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 border-b border-[#E5E5E5] pb-4">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{product.name}</div>
                  <div className="text-xs text-[#666]">{variant?.label}</div>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.productId, item.variantId, item.quantity - 1)}
                      className="w-7 h-7 border border-[#ccc] text-sm"
                    >
                      −
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.productId, item.variantId, item.quantity + 1)}
                      className="w-7 h-7 border border-[#ccc] text-sm"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(item.productId, item.variantId)}
                      className="ml-auto text-xs text-[#E8A0BF] hover:underline"
                    >
                      Verwijder
                    </button>
                  </div>
                </div>
                <div className="text-sm font-medium">{formatPrice(product.price * item.quantity)}</div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-5 border-t border-[#E5E5E5]">
          <div className="flex justify-between mb-4 text-sm">
            <span>Totaal</span>
            <span className="font-medium">{formatPrice(total)}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0 || checkingOut}
            onClick={onCheckout}
            className="w-full py-3 bg-[#111] text-white text-sm tracking-[2px] hover:bg-[#E8A0BF] transition disabled:opacity-40"
          >
            {checkingOut ? 'LADEN...' : 'AFREKENEN'}
          </button>
          <p className="text-[10px] text-[#999] text-center mt-3 tracking-wide">
            iDEAL &amp; kaart via Stripe · Verzending 2-3 werkdagen
          </p>
        </div>
      </div>
    </div>
  );
}