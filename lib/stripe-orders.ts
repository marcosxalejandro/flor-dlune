import { getProductById } from './products';
import { getStripe } from './stripe';
import type { Order, OrderItem } from './orders';
import { loadOrders, saveOrder } from './orders';
import { estimateMargin } from './suppliers';

function parseOrderItems(meta: string): OrderItem[] {
  const items: OrderItem[] = [];
  for (const entry of meta.split('|').filter(Boolean)) {
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
  return items;
}

export async function buildOrderFromStripeSession(
  session: Awaited<ReturnType<ReturnType<typeof getStripe>['checkout']['sessions']['retrieve']>>
): Promise<Order> {
  const items = parseOrderItems(session.metadata?.orderItems ?? '');
  const collected = session.collected_information?.shipping_details;
  const address = collected?.address ?? session.customer_details?.address;

  return {
    id: `FDL-${session.id.slice(-8).toUpperCase()}`,
    stripeSessionId: session.id,
    status: (session.metadata?.forwarded === 'true' ? 'forwarded' : 'paid') as Order['status'],
    items,
    shipping: {
      name: collected?.name ?? session.customer_details?.name ?? 'Onbekend',
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
    supplierOrderId: session.metadata?.supplierOrderId,
    createdAt: new Date((session.created ?? 0) * 1000).toISOString(),
    marginEstimate: 0,
  };
}

export async function getAllOrders(): Promise<Order[]> {
  const localOrders = await loadOrders().catch(() => [] as Order[]);

  if (!process.env.STRIPE_SECRET_KEY) {
    return localOrders;
  }

  try {
    const stripe = getStripe();
    const sessions = await stripe.checkout.sessions.list({
      limit: 50,
      status: 'complete',
      expand: ['data.line_items'],
    });

    const stripeOrders = await Promise.all(
      sessions.data
        .filter((s) => s.metadata?.source === 'flordlune-shop')
        .map(async (s) => {
          const full = await stripe.checkout.sessions.retrieve(s.id);
          const order = await buildOrderFromStripeSession(full);
          order.marginEstimate = estimateMargin(order);
          return order;
        })
    );

    const merged = new Map<string, Order>();
    for (const o of stripeOrders) merged.set(o.stripeSessionId, o);
    for (const o of localOrders) merged.set(o.stripeSessionId, o);

    return Array.from(merged.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return localOrders;
  }
}

export async function markOrderForwarded(
  stripeSessionId: string,
  supplierOrderId: string
): Promise<void> {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
  await stripe.checkout.sessions.update(stripeSessionId, {
    metadata: {
      ...session.metadata,
      forwarded: 'true',
      supplierOrderId,
    },
  });

  const local = await loadOrders().catch(() => [] as Order[]);
  const match = local.find((o) => o.stripeSessionId === stripeSessionId);
  if (match) {
    await saveOrder({
      ...match,
      status: 'forwarded',
      forwardedAt: new Date().toISOString(),
      supplierOrderId,
    });
  }
}