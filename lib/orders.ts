import { promises as fs } from 'fs';
import path from 'path';

export type OrderStatus = 'paid' | 'forwarded' | 'in_production' | 'shipped' | 'failed';

export interface OrderItem {
  productId: string;
  productName: string;
  variantId: string;
  variantLabel: string;
  quantity: number;
  unitPrice: number;
  supplier: 'gelato' | 'printful';
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  phone?: string;
}

export interface Order {
  id: string;
  stripeSessionId: string;
  status: OrderStatus;
  items: OrderItem[];
  shipping: ShippingAddress;
  totalAmount: number;
  currency: string;
  supplierOrderId?: string;
  supplier?: 'gelato' | 'printful';
  createdAt: string;
  forwardedAt?: string;
  marginEstimate?: number;
}

const ORDERS_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(ORDERS_DIR, 'orders.json');

async function ensureOrdersFile(): Promise<void> {
  await fs.mkdir(ORDERS_DIR, { recursive: true });
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, '[]', 'utf-8');
  }
}

export async function loadOrders(): Promise<Order[]> {
  await ensureOrdersFile();
  const raw = await fs.readFile(ORDERS_FILE, 'utf-8');
  return JSON.parse(raw) as Order[];
}

export async function saveOrder(order: Order): Promise<void> {
  const orders = await loadOrders();
  const index = orders.findIndex((o) => o.id === order.id);
  if (index >= 0) {
    orders[index] = order;
  } else {
    orders.unshift(order);
  }
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const orders = await loadOrders();
  return orders.find((o) => o.id === id);
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  extra?: Partial<Order>
): Promise<Order | null> {
  const orders = await loadOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index < 0) return null;

  orders[index] = {
    ...orders[index],
    ...extra,
    status,
    forwardedAt: status === 'forwarded' ? new Date().toISOString() : orders[index].forwardedAt,
  };

  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  return orders[index];
}