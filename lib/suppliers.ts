import type { Order } from './orders';

export interface SupplierForwardResult {
  success: boolean;
  supplierOrderId?: string;
  message: string;
  manualRequired?: boolean;
}

const PRODUCTION_COST_ESTIMATE: Record<string, number> = {
  shirt: 1400,
  cap: 1200,
  socks: 900,
};

export function estimateMargin(order: Order): number {
  const productionCost = order.items.reduce((sum, item) => {
    const category = item.productId.includes('tee')
      ? 'shirt'
      : item.productId.includes('cap')
        ? 'cap'
        : 'socks';
    return sum + (PRODUCTION_COST_ESTIMATE[category] ?? 1200) * item.quantity;
  }, 0);
  const shippingEstimate = 450;
  return order.totalAmount - productionCost - shippingEstimate;
}

export async function forwardToGelato(order: Order): Promise<SupplierForwardResult> {
  const apiKey = process.env.GELATO_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      manualRequired: true,
      message: 'GELATO_API_KEY niet ingesteld. Maak account op dashboard.gelato.com en voeg API key toe.',
    };
  }

  try {
    const response = await fetch('https://order.gelatoapis.com/v4/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({
        orderType: 'order',
        referenceId: order.id,
        customerReferenceId: order.stripeSessionId,
        currency: 'EUR',
        shippingAddress: {
          firstName: order.shipping.name.split(' ')[0] ?? order.shipping.name,
          lastName: order.shipping.name.split(' ').slice(1).join(' ') || '-',
          addressLine1: order.shipping.line1,
          addressLine2: order.shipping.line2 ?? '',
          city: order.shipping.city,
          postCode: order.shipping.postalCode,
          country: order.shipping.country,
          email: order.shipping.email,
          phone: order.shipping.phone ?? '',
        },
        items: order.items
          .filter((i) => i.supplier === 'gelato')
          .map((item) => ({
            itemReferenceId: `${order.id}-${item.productId}`,
            productUid: item.productId,
            quantity: item.quantity,
          })),
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { success: false, message: `Gelato fout: ${err}` };
    }

    const data = await response.json();
    return {
      success: true,
      supplierOrderId: data.id ?? data.orderId,
      message: 'Order doorgestuurd naar Gelato',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Onbekende Gelato fout',
    };
  }
}

export async function forwardToPrintful(order: Order): Promise<SupplierForwardResult> {
  const apiKey = process.env.PRINTFUL_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      manualRequired: true,
      message: 'PRINTFUL_API_KEY niet ingesteld. Maak account op printful.com en voeg API key toe.',
    };
  }

  const printfulItems = order.items.filter((i) => i.supplier === 'printful');
  if (printfulItems.length === 0) {
    return { success: true, message: 'Geen Printful items in deze order' };
  }

  try {
    const response = await fetch('https://api.printful.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        external_id: order.id,
        recipient: {
          name: order.shipping.name,
          address1: order.shipping.line1,
          address2: order.shipping.line2 ?? '',
          city: order.shipping.city,
          zip: order.shipping.postalCode,
          country_code: order.shipping.country,
          email: order.shipping.email,
          phone: order.shipping.phone ?? '',
        },
        items: printfulItems.map((item) => ({
          name: item.productName,
          quantity: item.quantity,
          retail_price: (item.unitPrice / 100).toFixed(2),
        })),
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { success: false, message: `Printful fout: ${err}` };
    }

    const data = await response.json();
    return {
      success: true,
      supplierOrderId: String(data.result?.id ?? ''),
      message: 'Order doorgestuurd naar Printful',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Onbekende Printful fout',
    };
  }
}

export async function forwardOrderToSuppliers(order: Order): Promise<SupplierForwardResult[]> {
  const results: SupplierForwardResult[] = [];

  const hasGelato = order.items.some((i) => i.supplier === 'gelato');
  const hasPrintful = order.items.some((i) => i.supplier === 'printful');

  if (hasGelato) results.push(await forwardToGelato(order));
  if (hasPrintful) results.push(await forwardToPrintful(order));

  return results;
}

export function formatOrderForManualEntry(order: Order): string {
  const lines = [
    `=== FLOR D'LUNE ORDER ${order.id} ===`,
    `Datum: ${new Date(order.createdAt).toLocaleString('nl-NL')}`,
    `Totaal: €${(order.totalAmount / 100).toFixed(2)}`,
    `Geschatte marge: €${(estimateMargin(order) / 100).toFixed(2)}`,
    '',
    'KLANT:',
    `  ${order.shipping.name}`,
    `  ${order.shipping.line1}`,
    order.shipping.line2 ? `  ${order.shipping.line2}` : '',
    `  ${order.shipping.postalCode} ${order.shipping.city}`,
    `  ${order.shipping.country}`,
    `  ${order.shipping.email}`,
    order.shipping.phone ? `  ${order.shipping.phone}` : '',
    '',
    'PRODUCTEN:',
    ...order.items.map(
      (i) =>
        `  - ${i.quantity}x ${i.productName} (${i.variantLabel}) → ${i.supplier.toUpperCase()}`
    ),
  ];
  return lines.filter(Boolean).join('\n');
}