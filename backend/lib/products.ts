import type { ProductApiItem } from '@/types';

type ProductRow = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string | number;
  original_price: string | number | null;
  image_url: string | null;
  rating: string | number | null;
  reviews_count: number | null;
  stock_quantity: number | null;
  in_stock: boolean | null;
  discount_percent: number | null;
  is_featured: boolean | null;
  is_active: boolean | null;
  categories?: { name?: string | null; slug?: string | null } | null;
  product_options?: Array<{ option_name: string; option_value: string; sort_order: number | null }>;
};

export const mapProduct = (row: ProductRow): ProductApiItem => {
  const options = row.product_options || [];
  const colors = options
    .filter((option) => option.option_name === 'color')
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .map((option) => option.option_value);

  const sizes = options
    .filter((option) => option.option_name === 'size')
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .map((option) => option.option_value);

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    price: Number(row.price),
    originalPrice: row.original_price === null ? null : Number(row.original_price),
    image: row.image_url || '',
    category: row.categories?.name || 'Chưa phân loại',
    categorySlug: row.categories?.slug || undefined,
    rating: Number(row.rating || 0),
    reviews: row.reviews_count || 0,
    inStock: Boolean(row.in_stock),
    stockQuantity: row.stock_quantity || 0,
    discount: row.discount_percent || 0,
    description: row.description || '',
    colors: colors.length ? colors : undefined,
    sizes: sizes.length ? sizes : undefined,
    isFeatured: Boolean(row.is_featured),
    isActive: Boolean(row.is_active),
  };
};
