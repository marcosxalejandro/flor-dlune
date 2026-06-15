import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/products';
import { getStripe, isStripeConfigured } from '@/lib/stripe';

interface CheckoutItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: 'Stripe is nog niet geconfigureerd. Voeg STRIPE_SECRET_KEY toe aan .env.local' },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const items: CheckoutItem[] = body.items ?? [];

    if (!items.length) {
      return NextResponse.json({ error: 'Winkelwagen is leeg' }, { status: 400 });
    }

    const lineItems = [];
    const orderMeta: string[] = [];

    for (const item of items) {
      const product = getProductById(item.productId);
      if (!product || !product.launchReady) {
        return NextResponse.json({ error: `Product niet beschikbaar: ${item.productId}` }, { status: 400 });
      }

      const variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant) {
        return NextResponse.json({ error: `Variant niet gevonden: ${item.variantId}` }, { status: 400 });
      }

      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            description: `${product.subtitle} — ${variant.label}`,
            images: product.image.startsWith('http')
              ? [product.image]
              : [`${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flordlune.com'}${product.image}`],
            metadata: {
              productId: product.id,
              variantId: variant.id,
              supplier: product.supplier,
            },
          },
          unit_amount: product.price,
        },
        quantity: Math.min(Math.max(item.quantity, 1), 10),
      });

      orderMeta.push(`${product.id}:${variant.id}:${item.quantity}`);
    }

    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      payment_method_types: ['card', 'ideal'],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
      shipping_address_collection: {
        allowed_countries: ['NL', 'BE', 'DE', 'FR', 'GB', 'ES', 'IT', 'AT', 'CH', 'SE', 'DK', 'NO', 'US'],
      },
      phone_number_collection: { enabled: true },
      locale: 'nl',
      metadata: {
        orderItems: orderMeta.join('|'),
        source: 'flordlune-shop',
      },
      payment_intent_data: {
        metadata: {
          orderItems: orderMeta.join('|'),
        },
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout mislukt' },
      { status: 500 }
    );
  }
}