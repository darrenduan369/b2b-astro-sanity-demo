import type { SanityProduct } from '../types/sanityProduct';

export function isSanityProduct(
  value: unknown,
): value is SanityProduct {
  if (
    typeof value !== 'object' ||
    value === null
  ) {
    return false;
  }

  const product =
    value as Record<string, unknown>;

  return (
    typeof product._id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.slug === 'string' &&
    typeof product.category === 'string' &&
    typeof product.price === 'number' &&
    typeof product.featured === 'boolean' &&
    (
      product.description === undefined ||
      typeof product.description === 'string'
    ) &&
    (
      product.imageUrl === undefined ||
      typeof product.imageUrl === 'string'
    )
  );
}