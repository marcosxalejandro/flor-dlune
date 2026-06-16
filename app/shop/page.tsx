'use client';

import { useState } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import CartDrawer, { type CartEntry } from '@/components/shop/CartDrawer';
import { LAUNCH_PRODUCTS, COMING_SOON_PRODUCTS } from '@/lib/products';

export default function ShopPage() {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  function addToCart(productId: string, variantId: string) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.variantId === variantId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.variantId === variantId
            ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
            : i
        );
      }
      return [...prev, { productId, variantId, quantity: 1 }];
    });
    setCartOpen(true);
    setCheckoutError(null);
  }

  function updateQuantity(productId: string, variantId: string, quantity: number) {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId
          ? { ...i, quantity: Math.min(quantity, 10) }
          : i
      )
    );
  }

  function removeFromCart(productId: string, variantId: string) {
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
  }

  async function handleCheckout() {
    setCheckingOut(true);
    setCheckoutError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Checkout mislukt');
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Checkout mislukt');
      setCheckingOut(false);
    }
  }

  return (
    <div className="shop-page min-h-screen text-[#111]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@300;400;500&display=swap');
        .shop-page {
          position: relative;
          background-color: #F8F8F5;
          font-family: 'Inter', system-ui, sans-serif;
          isolation: isolate;
        }
        .shop-page::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: -2;
          background-image: url('/background.jpg');
          background-size: cover;
          background-position: center 30%;
          background-repeat: no-repeat;
        }
        .shop-page::after {
          content: '';
          position: fixed;
          inset: 0;
          z-index: -1;
          background: linear-gradient(
            180deg,
            rgba(248, 248, 245, 0.55) 0%,
            rgba(248, 248, 245, 0.72) 45%,
            rgba(248, 248, 245, 0.88) 100%
          );
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .shop-page::before {
            position: absolute;
            background-size: 120% auto;
            background-position: center 18%;
            filter: blur(0.5px);
            transform: scale(1.02);
          }
          .shop-page::after {
            position: absolute;
            background: linear-gradient(
              180deg,
              rgba(248, 248, 245, 0.82) 0%,
              rgba(248, 248, 245, 0.9) 50%,
              rgba(248, 248, 245, 0.95) 100%
            );
          }
        }
        .heading-serif {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .product-card {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.15);
        }
        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: #E8A0BF; }
        .overlay-gradient {
          background: linear-gradient(
            to bottom,
            rgba(248, 248, 245, 0.65) 0%,
            rgba(248, 248, 245, 0.35) 35%,
            rgba(248, 248, 245, 0.75) 100%
          );
        }
      `}</style>

      <div className="bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5] fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between text-sm">
          <span className="text-xs tracking-[1.5px]">FREE SHIPPING OVER €150</span>
          <div className="flex items-center gap-x-6 text-xs tracking-[1.5px]">
            <a href="/" className="nav-link">HOME</a>
            <button type="button" onClick={() => setCartOpen(true)} className="nav-link">
              CART ({cartCount})
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5] pt-14">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="text-3xl tracking-[-1.5px]">FLOR D&apos;LUNE</a>
            <a href="/" className="text-sm px-6 py-2.5 border border-[#111] hover:bg-[#111] hover:text-white transition">
              BACK TO THE DAM-CANALS
            </a>
          </div>
        </div>
      </nav>

      <div className="relative h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overlay-gradient" />
        <div className="relative z-10 text-center px-6">
          <div className="text-[#E8A0BF] text-xs tracking-[5px] mb-4">LIVE NOW</div>
          <h1 className="heading-serif text-6xl md:text-7xl tracking-[-3px] text-[#111] leading-none mb-4">
            CAPSULE <span className="text-[#888]">0</span>
            <span className="text-[#E8A0BF]">1</span>
          </h1>
          <p className="text-lg text-[#444] max-w-md mx-auto">
            Art is how we decorate Space, Music is how we decorate Time.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pt-12 pb-24">
        <div className="mb-16">
          <div className="flex items-end justify-between mb-8 px-1">
            <div>
              <div className="text-[#E8A0BF] text-xs tracking-[3px]">NU VERKRIJGBAAR</div>
              <h2 className="heading-serif text-4xl tracking-[-1px]">summer &apos;26</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LAUNCH_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between mb-8 px-1">
            <div>
              <div className="text-[#E8A0BF] text-xs tracking-[3px]">BINNENKORT</div>
              <h2 className="heading-serif text-4xl tracking-[-1px]">more pieces</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMING_SOON_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>

        {checkoutError && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-700 text-sm text-center">
            {checkoutError}
          </div>
        )}
      </div>

      <footer className="border-t border-[#E5E5E5] py-10 text-xs text-[#666] px-8 bg-white/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4">
          <div>© FLOR D&apos;LUNE 2026 — AMSTERDAM</div>
          <div className="flex gap-x-8">
            <span>VERZENDING 2-3 DAGEN</span>
            <span>VEILIG BETALEN</span>
            <a href="/admin" className="hover:text-[#E8A0BF]">ADMIN</a>
          </div>
        </div>
      </footer>

      <CartDrawer
        items={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        checkingOut={checkingOut}
      />
    </div>
  );
}