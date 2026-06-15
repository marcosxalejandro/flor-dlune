import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders } from '@/lib/stripe-orders';

function isAuthorized(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_SECRET;
  if (!adminKey) return false;
  const auth = req.headers.get('authorization');
  return auth === `Bearer ${adminKey}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orders = await getAllOrders();
  return NextResponse.json({ orders });
}