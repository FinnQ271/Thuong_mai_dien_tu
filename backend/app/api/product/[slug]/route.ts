import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { fail, ok } from '@/lib/response';
import { optionsResponse } from '@/lib/cors';
import { mapProduct } from '@/lib/products';

export const dynamic = 'force-dynamic';

const productSelect = `
  id,
  name,
  slug,
  description,
  price,
  original_price,
  image_url,
  rating,
  reviews_count,
  stock_quantity,
  in_stock,
  discount_percent,
  is_featured,
  is_active,
  categories(name, slug),
  product_options(option_name, option_value, sort_order)
`;

export async function OPTIONS() {
  return optionsResponse();
}

export async function GET(_request: NextRequest, context: { params: { slug: string } | Promise<{ slug: string }> }) {
  try {
    const params = await Promise.resolve(context.params);
    const slug = decodeURIComponent(params.slug || '').trim();
    if (!slug) return fail('Slug sản phẩm không hợp lệ', 400);

    const { data, error } = await supabaseAdmin
      .from('products')
      .select(productSelect)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) return fail('Không tìm thấy sản phẩm', 404, error?.message);
    return ok(mapProduct(data as any), 'Lấy sản phẩm theo slug thành công');
  } catch (error) {
    return fail('Lỗi lấy sản phẩm theo slug', 500, error);
  }
}
