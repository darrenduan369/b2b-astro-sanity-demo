import type { Product } from '../types/product';
import type { SanityProduct } from '../types/sanityProduct';

export function mapSanityProductToProduct(
  product: SanityProduct,
): Product {
  return {
    id: product._id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    price: product.price,
    featured: product.featured,
    description: product.description?.trim() || 'Contact us for more product information.',
    imageUrl: product.imageUrl,
    imageAlt: product.imageAlt?.trim() || product.name,
    seoTitle: product.seoTitle,
    seoDescription: product.seoDescription,
  };
}