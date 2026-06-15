'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="text-[#E8A0BF] text-xs tracking-[5px] mb-4">BEDANKT</div>
        <h1 className="text-4xl md:text-5xl font-serif tracking-[-2px] text-[#111] mb-6">
          Order ontvangen
        </h1>
        <p className="text-[#666] mb-8 leading-relaxed">
          Je betaling is gelukt. We maken je Flor D&apos;Lune pieces klaar en versturen binnen 2-3 werkdagen.
        </p>
        {sessionId && (
          <p className="text-xs text-[#999] mb-8 tracking-wide">
            Referentie: {sessionId.slice(0, 20)}...
          </p>
        )}
        <a
          href="/shop"
          className="inline-block px-8 py-3 bg-[#111] text-white text-sm tracking-[2px] hover:bg-[#E8A0BF] transition"
        >
          TERUG NAAR SHOP
        </a>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F8F5]" />}>
      <SuccessContent />
    </Suspense>
  );
}