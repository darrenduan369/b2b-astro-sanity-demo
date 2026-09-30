import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    slug: 'industrial-led-high-bay-light',
    name: 'Industrial LED High Bay Light',
    category: 'Lighting',
    price: 89.99,
    featured: true,
  },
  {
    id: 2,
    slug: 'outdoor-solar-flood-light',
    name: 'Outdoor Solar Flood Light',
    category: 'Lighting',
    price: 59.99,
    featured: false,
  },
  {
    id: 3,
    slug: 'portable-bluetooth-speaker',
    name: 'Portable Bluetooth Speaker',
    category: 'Electronics',
    price: 28,
    featured: true,
  },
];