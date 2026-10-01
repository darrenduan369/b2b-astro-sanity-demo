export interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  featured: boolean;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
}