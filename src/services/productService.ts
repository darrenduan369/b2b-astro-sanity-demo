import { sanityClient } from '../lib/sanity/client';

import {
  PRODUCTS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
} from '../lib/sanity/queries';

import type { SanityProduct } from '../types/sanityProduct';
import type { Product } from '../types/product';
import { isSanityProduct } from '../validators/sanityProductValidator';

import { mapSanityProductToProduct } from '../mappers/productMapper';

export async function fetchProducts(): Promise<Product[]> {
  const data =
    await sanityClient.fetch<unknown[]>(
      PRODUCTS_QUERY,
    );

  return data.map((item, index) => {
    if (!isSanityProduct(item)) {
      throw new Error(
        `Invalid Sanity product at index ${index}`,
      );
    }

    return mapSanityProductToProduct(item);
  });
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const data =
    await sanityClient.fetch<unknown[]>(
      FEATURED_PRODUCTS_QUERY,
    );

  return data.map((item, index) => {
    if (!isSanityProduct(item)) {
      throw new Error(
        `Invalid featured Sanity product at index ${index}`,
      );
    }

    return mapSanityProductToProduct(item);
  });
}

export async function fetchProductBySlug(
  slug: string,
): Promise<Product | null> {
  const data =
    await sanityClient.fetch<unknown>(
      PRODUCT_BY_SLUG_QUERY,
      {
        slug,
      },
    );

  if (data === null) {
    return null;
  }

  if (!isSanityProduct(data)) {
    throw new Error(
      `Invalid Sanity product for slug: ${slug}`,
    );
  }

  return mapSanityProductToProduct(data);
}