export type ProductCategory = 'shirt' | 'cap' | 'socks';

export interface ProductVariant {
  id: string;
  label: string;
  size?: string;
}

export interface Product {
  id: string;
  name: string;
  /** Pink caps brand line shown under the product title */
  brandLabel?: string;
  subtitle: string;
  price: number; // EUR cents
  displayPrice: string;
  image: string;
  category: ProductCategory;
  supplier: 'gelato' | 'printful';
  /** Gelato productUid or Printful sync variant ID — fill after supplier setup */
  supplierProductId?: string;
  variants: ProductVariant[];
  launchReady: boolean;
}

/**
 * Edit product names, prices, and images here.
 * After Gelato/Printful setup, add supplierProductId per product.
 */
export const LAUNCH_PRODUCTS: Product[] = [
  {
    id: 'signature-bonsai-tee',
    name: 'Capsule 01 Tee',
    brandLabel: "FLOR D'LUNE",
    subtitle: 'White',
    price: 6200,
    displayPrice: '€62',
    image: '/images/products/tshirts/48950EC9-DA29-4E19-AC83-52DC09E926C3.JPG',
    category: 'shirt',
    supplier: 'gelato',
    variants: [
      { id: 's', label: 'S', size: 'S' },
      { id: 'm', label: 'M', size: 'M' },
      { id: 'l', label: 'L', size: 'L' },
      { id: 'xl', label: 'XL', size: 'XL' },
    ],
    launchReady: true,
  },
  {
    id: 'ufo-corduroy-cap',
    name: 'Salvator Capsule 01 Salvator Mundi Cap',
    brandLabel: "FLOR D'LUNE",
    subtitle: 'Black',
    price: 3500,
    displayPrice: '€35',
    image: '/images/products/caps/IMG_3089.JPG',
    category: 'cap',
    supplier: 'gelato',
    variants: [{ id: 'onesize', label: 'One Size' }],
    launchReady: true,
  },
  {
    id: 'cherry-blossom-socks',
    name: 'Capsule 01 Socks',
    brandLabel: "FLOR D'LUNE",
    subtitle: 'Premium Cotton',
    price: 2500,
    displayPrice: '€25',
    image: '/images/products/socks/IMG_3190.JPG',
    category: 'socks',
    supplier: 'printful',
    variants: [
      { id: 's', label: 'S (36-39)', size: 'S' },
      { id: 'm', label: 'M (40-43)', size: 'M' },
      { id: 'l', label: 'L (44-47)', size: 'L' },
    ],
    launchReady: true,
  },
];

export const COMING_SOON_PRODUCTS: Product[] = [
  {
    id: 'angelito-pin',
    name: 'Angelito ~ Pin',
    subtitle: "Flor D'Lune",
    price: 14500,
    displayPrice: '€145',
    image: '/images/products/pins/pin01.jpg',
    category: 'shirt',
    supplier: 'gelato',
    variants: [{ id: 'onesize', label: 'One Size' }],
    launchReady: false,
  },
  {
    id: 'blossom-wool-coat',
    name: 'Blossom Wool Coat',
    subtitle: 'Limited Edition',
    price: 28500,
    displayPrice: '€285',
    image: '/images/products/other/IMG_3025.JPG',
    category: 'shirt',
    supplier: 'gelato',
    variants: [{ id: 'm', label: 'M', size: 'M' }],
    launchReady: false,
  },
  {
    id: 'sacred-silk-shirt',
    name: 'Sacred Silk Shirt',
    subtitle: 'Coming Soon',
    price: 13500,
    displayPrice: '€135',
    image: '/images/products/pins/pin02.jpg',
    category: 'shirt',
    supplier: 'gelato',
    variants: [{ id: 'm', label: 'M', size: 'M' }],
    launchReady: false,
  },
];

export function getProductById(id: string): Product | undefined {
  return [...LAUNCH_PRODUCTS, ...COMING_SOON_PRODUCTS].find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(0)}`;
}