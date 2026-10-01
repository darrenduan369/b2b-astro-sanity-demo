export const PRODUCTS_QUERY = `
  *[_type == "product"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    price,
    featured,
    description,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }
`;

export const FEATURED_PRODUCTS_QUERY = `
  *[
    _type == "product" &&
    featured == true
  ] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    price,
    featured,
    description,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }
`;

export const PRODUCT_BY_SLUG_QUERY = `
  *[
    _type == "product" &&
    slug.current == $slug
  ][0] {
    _id,
    name,
    "slug": slug.current,
    category,
    price,
    featured,
    description,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }
`;