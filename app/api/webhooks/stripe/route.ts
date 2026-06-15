import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductById } from '@/lib/products';
import { saveOrder, type Order, type OrderItem } from '@/lib/orders';
import { getStripe } from '@/lib/stripe';
import { estimateMargin, forwardOrderToSuppliers } from '@/lib/suppliers';

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret niet geconfigureerd' }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Geen signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const sessionEvent = event.data.object as Stripe.Checkout.Session;
    const session = await getStripe().checkout.sessions.retrieve(sessionEvent.id);
    const order = await buildOrderFromSession(session);
    await saveOrder(order);

    if (process.env.AUTO_FORWARD_ORDERS === 'true') {
      const results = await forwardOrderToSuppliers(order);
      const allSuccess = results.every((r) => r.success);
      if (allSuccess) {
        order.status = 'forwarded';
        order.forwardedAt = new Date().toISOString();
        await saveOrder(order);
      }
    }
  }

  return NextResponse.json({ received: true });
}

async function buildOrderFromSession(session: Stripe.Checkout.Session): Promise<Order> {
  const items: OrderItem[] = [];
  const orderItemsMeta = session.metadata?.orderItems ?? '';

  for (const entry of orderItemsMeta.split('|').filter(Boolean)) {
    const [productId, variantId, qtyStr] = entry.split(':');
    const product = getProductById(productId);
    const variant = product?.variants.find((v) => v.id === variantId);
    if (!product || !variant) continue;

    items.push({
      productId,
      productName: product.name,
      variantId,
      variantLabel: variant.label,
      quantity: parseInt(qtyStr, 10) || 1,
      unitPrice: product.price,
      supplier: product.supplier,
    });
  }

  const collected = session.collected_information?.shipping_details;
  const address = collected?.address ?? session.customer_details?.address;
  const customerName = collected?.name ?? session.customer_details?.name ?? 'Onbekend';

  const order: Order = {
    id: `FDL-${Date.now().toString(36).toUpperCase()}`,
    stripeSessionId: session.id,
    status: 'paid',
    items,
    shipping: {
      name: customerName,
      line1: address?.line1 ?? '',
      line2: address?.line2 ?? undefined,
      city: address?.city ?? '',
      postalCode: address?.postal_code ?? '',
      country: address?.country ?? 'NL',
      email: session.customer_details?.email ?? session.customer_email ?? '',
      phone: session.customer_details?.phone ?? undefined,
    },
    totalAmount: session.amount_total ?? 0,
    currency: session.currency ?? 'eur',
    createdAt: new Date().toISOString(),
    marginEstimate: 0,
  };

  order.marginEstimate = estimateMargin(order);
  return order;
}