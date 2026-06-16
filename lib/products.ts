export type ProductCategory = 'shirt' | 'cap' | 'socks';
export type GelatoFulfillment = 'dtg' | 'embroidery';

export const CAPSULE_COLOR_OPTIONS = [
  { id: 'white', label: 'White', hex: '#F5F5F0' },
  { id: 'black', label: 'Black', hex: '#1C1C1C' },
  { id: 'blue', label: 'Blue', hex: '#2E4A7A' },
  { id: 'green', label: 'Green', hex: '#3D6B4F' },
  { id: 'grey', label: 'Grey', hex: '#9A9A9A' },
  { id: 'brown', label: 'Brown', hex: '#6B4423' },
  { id: 'lightbrown', label: 'Light Brown', hex: '#C9A27A' },
] as const;

export interface ProductVariant {
  id: string;
  label: string;
  size?: string;
  color?: string;
  /** Gelato productUid for this size/color/print combo — from dashboard catalog */
  gelatoProductUid?: string;
  /** Embroidery thread hex colors (max 6) — e.g. white logo on black shirt */
  embroideryThreadColors?: string[];
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
  /** Optional extra views, e.g. front & back of the same garment */
  images?: string[];
  category: ProductCategory;
  supplier: 'gelato' | 'printful';
  /** Gelato productUid or Printful sync variant ID — fill after supplier setup */
  supplierProductId?: string;
  /** How Gelato fulfills this product when forwarding API orders */
  gelatoFulfillment?: GelatoFulfillment;
  variants: ProductVariant[];
  colors?: { id: string; label: string; hex: string }[];
  launchReady: boolean;
  soldOut?: boolean;
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
    subtitle: 'Oversized Fit',
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
    colors: [...CAPSULE_COLOR_OPTIONS],
    launchReady: true,
    soldOut: true,
  },
  {
    id: 'capsule-02-tee',
    name: 'Capsule 02 Tee',
    brandLabel: "FLOR D'LUNE",
    subtitle: 'Black · Front & Back Print',
    price: 6200,
    displayPrice: '€62',
    image: '/images/products/tshirts/capsule-02-tee-front.jpg',
    images: [
      '/images/products/tshirts/capsule-02-tee-front.jpg',
      '/images/products/tshirts/capsule-02-tee-back.jpg',
    ],
    category: 'shirt',
    supplier: 'gelato',
    gelatoFulfillment: 'dtg',
    variants: [
      {
        id: 's',
        label: 'S',
        size: 'S',
        gelatoProductUid:
          'apparel_product_gca_t-shirt_gsc_oversized_gcu_mens_gqa_prm_gsi_s_gco_white_gpr_4-4_shaka-wear_shgdd',
      },
      {
        id: 'm',
        label: 'M',
        size: 'M',
        gelatoProductUid:
          'apparel_product_gca_t-shirt_gsc_oversized_gcu_mens_gqa_prm_gsi_m_gco_white_gpr_4-4_shaka-wear_shgdd',
      },
      {
        id: 'l',
        label: 'L',
        size: 'L',
        gelatoProductUid:
          'apparel_product_gca_t-shirt_gsc_oversized_gcu_mens_gqa_prm_gsi_l_gco_white_gpr_4-4_shaka-wear_shgdd',
      },
      {
        id: 'xl',
        label: 'XL',
        size: 'XL',
        gelatoProductUid:
          'apparel_product_gca_t-shirt_gsc_oversized_gcu_mens_gqa_prm_gsi_xl_gco_white_gpr_4-4_shaka-wear_shgdd',
      },
    ],
    launchReady: true,
    soldOut: true,
  },
  {
    id: 'ufo-corduroy-cap',
    name: 'Capsule 01 Salvator Mundi Cap',
    brandLabel: "FLOR D'LUNE",
    subtitle: 'Black',
    price: 3500,
    displayPrice: '€35',
    image: '/images/products/caps/IMG_3089.JPG',
    category: 'cap',
    supplier: 'gelato',
    variants: [{ id: 'onesize', label: 'One Size' }],
    launchReady: true,
    soldOut: true,
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
    colors: [...CAPSULE_COLOR_OPTIONS],
    launchReady: true,
    soldOut: true,
  },
];

export const COMING_SOON_PRODUCTS: Product[] = [
  {
    id: 'angelito-pin',
    name: 'Angelito ~ Pin',
    subtitle: 'Coming Soon',
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
    name: 'Carl Jung w/ his Red Book Collectible',
    subtitle: 'Coming Soon',
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
    name: 'Angelito ~ Mensajero',
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

export function getGelatoProductUid(productId: string, variantId: string): string | undefined {
  const product = getProductById(productId);
  const variant = product?.variants.find((v) => v.id === variantId);
  return variant?.gelatoProductUid ?? product?.supplierProductId;
}

export function getGelatoVariant(productId: string, variantId: string) {
  const product = getProductById(productId);
  const variant = product?.variants.find((v) => v.id === variantId);
  if (!product || !variant) return undefined;
  return { product, variant };
}

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(0)}`;
}