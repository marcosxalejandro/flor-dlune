'use client';

import { useState } from 'react';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, variantId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.id ?? '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.id ?? '');
  const soldOut = Boolean(product.soldOut);
  const disabled = !product.launchReady || soldOut;
  const activeColor = product.colors?.find((c) => c.id === selectedColor);

  return (
    <div className={`product-card bg-white/85 backdrop-blur-sm border border-white/60 overflow-hidden group ${disabled ? 'opacity-60' : ''}`}>
      <div className="aspect-[16/10] bg-[#F4F1ED] relative overflow-hidden">
        {product.images && product.images.length > 1 ? (
          <div className="grid grid-cols-2 h-full">
            {product.images.map((src, index) => (
              <div key={src} className="relative h-full overflow-hidden border-r border-white/40 last:border-r-0">
                <img
                  src={src}
                  alt={`${product.name} ${index === 0 ? 'front' : 'back'}`}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition duration-700"
                />
                <span className="absolute bottom-2 left-2 bg-white/90 text-[#111] px-2 py-0.5 text-[10px] tracking-[2px]">
                  {index === 0 ? 'FRONT' : 'BACK'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700"
          />
        )}
        {soldOut && (
          <div className="absolute top-4 right-4 bg-[#111] text-white px-3 py-1 text-xs tracking-widest">
            SOLD OUT
          </div>
        )}
        {!soldOut && !product.launchReady && (
          <div className="absolute top-4 right-4 bg-[#111]/80 text-white px-3 py-1 text-xs tracking-widest">
            COMING SOON
          </div>
        )}
        {!soldOut && product.launchReady && product.category === 'socks' && (
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
              <div className="text-sm text-[#666]">
                {product.subtitle}
                {activeColor ? ` · ${activeColor.label}` : ''}
              </div>
            )}
          </div>
          <div className="font-medium whitespace-nowrap">{product.displayPrice}</div>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="mt-4">
            <div className="text-[10px] tracking-[2px] text-[#888] mb-2">COLOUR</div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  disabled={disabled}
                  title={color.label}
                  onClick={() => setSelectedColor(color.id)}
                  className={`h-7 w-7 rounded-full border-2 transition ${
                    selectedColor === color.id
                      ? 'border-[#111] ring-2 ring-[#E8A0BF] ring-offset-1'
                      : 'border-white/80 hover:border-[#111]'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.label}
                />
              ))}
            </div>
            <div className="mt-2 text-xs text-[#666]">{activeColor?.label ?? 'White'}</div>
          </div>
        )}

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
          {soldOut ? 'SOLD OUT' : disabled ? 'BINNENKORT' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
}