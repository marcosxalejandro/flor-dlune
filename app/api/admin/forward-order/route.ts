import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders } from '@/lib/stripe-orders';
import { markOrderForwarded } from '@/lib/stripe-orders';
import { forwardOrderToSuppliers, formatOrderForManualEntry } from '@/lib/suppliers';

function isAuthorized(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_SECRET;
  if (!adminKey) return false;
  const auth = req.headers.get('authorization');
  return auth === `Bearer ${adminKey}`;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { orderId } = await req.json();
  if (!orderId) {
    return NextResponse.json({ error: 'orderId verplicht' }, { status: 400 });
  }

  const orders = await getAllOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    return NextResponse.json({ error: 'Order niet gevonden' }, { status: 404 });
  }

  if (order.status === 'forwarded') {
    return NextResponse.json({ error: 'Order al doorgestuurd', order });
  }

  const results = await forwardOrderToSuppliers(order);
  const allSuccess = results.every((r) => r.success);
  const anyManual = results.some((r) => r.manualRequired);
  const supplierOrderId = results.map((r) => r.supplierOrderId).filter(Boolean).join(',');

  if (allSuccess) {
    await markOrderForwarded(order.stripeSessionId, supplierOrderId);
    const updated = { ...order, status: 'forwarded' as const, supplierOrderId, forwardedAt: new Date().toISOString() };
    return NextResponse.json({ success: true, results, order: updated });
  }

  return NextResponse.json({
    success: false,
    results,
    manualEntry: anyManual ? formatOrderForManualEntry(order) : undefined,
    order,
  });
}