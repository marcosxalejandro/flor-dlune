'use client';

import { useState } from 'react';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, variantId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.id ?? '');
  const disabled = !product.launchReady;

  return (
    <div className={`product-card bg-white/85 backdrop-blur-sm border border-white/60 overflow-hidden group ${disabled ? 'opacity-60' : ''}`}>
      <div className="aspect-[16/10] bg-[#F4F1ED] relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700"
        />
        {!product.launchReady && (
          <div className="absolute top-4 right-4 bg-[#111]/80 text-white px-3 py-1 text-xs tracking-widest">
            COMING SOON
          </div>
        )}
        {product.launchReady && product.category === 'socks' && (
          <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs tracking-widest">NEW</div>
        )}
      </div>
      <div className="p-6 text-[#111]">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="font-medium">{product.name}</div>
            {product.brandLabel && (
              <div className="text-xs text-[#E8A0BF] tracking-[2px] uppercase mt-0.5">
                {product.brandLabel}
              </div>
            )}
            {product.subtitle && (
              <div className="text-sm text-[#666]">{product.subtitle}</div>
            )}
          </div>
          <div className="font-medium whitespace-nowrap">{product.displayPrice}</div>
        </div>

        {product.variants.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                disabled={disabled}
                onClick={() => setSelectedVariant(v.id)}
                className={`px-3 py-1 text-xs border transition ${
                  selectedVariant === v.id
                    ? 'border-[#111] bg-[#111] text-white'
                    : 'border-[#ccc] hover:border-[#111]'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          disabled={disabled}
          onClick={() => onAddToCart(product.id, selectedVariant)}
          className="mt-6 w-full py-3 text-sm border border-[#111] hover:bg-[#111] hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {disabled ? 'BINNENKORT' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
}