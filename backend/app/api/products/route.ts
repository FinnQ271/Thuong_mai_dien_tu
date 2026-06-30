import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { fail, ok, paginated, created } from '@/lib/response';
import { optionsResponse } from '@/lib/cors';
import { requireAdmin } from '@/lib/auth';
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

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export async function OPTIONS() {
  return optionsResponse();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get('page') || 1), 1);
    const limit = Math.min(Math.max(Number(searchParams.get('limit') || 20), 1), 100);
    const search = searchParams.get('search')?.trim() || '';
    const category = searchParams.get('category')?.trim() || '';
    const sort = searchParams.get('sort') || 'popular';
    const featured = searchParams.get('featured');
    const active = searchParams.get('active') || 'true';
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabaseAdmin
      .from('products')
      .select(productSelect, { count: 'exact' });

    if (active !== 'all') query = query.eq('is_active', active === 'true');
    if (search) query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    if (featured === 'true') query = query.eq('is_featured', true);

    if (category && category !== 'all') {
      const { data: categoryRow, error: categoryError } = await supabaseAdmin
        .from('categories')
        .select('id')
        .eq('slug', category)
        .single();

      if (categoryError || !categoryRow) {
        return paginated([], { page, limit, total: 0, totalPages: 0 }, 'Không tìm thấy danh mục');
      }

      query = query.eq('category_id', categoryRow.id);
    }

    switch (sort) {
      case 'price-low':
        query = query.order('price', { ascending: true });
        break;
      case 'price-high':
        query = query.order('price', { ascending: false });
        break;
      case 'newest':
        query = query.order('id', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating', { ascending: false });
        break;
      case 'popular':
      default:
        query = query.order('reviews_count', { ascending: false });
        break;
    }

    const { data, count, error } = await query.range(from, to);
    if (error) return fail('Không lấy được danh sách sản phẩm', 500, error.message);

    const total = count || 0;
    return paginated(
      (data || []).map((item) => mapProduct(item as any)),
      { page, limit, total, totalPages: Math.ceil(total / limit) },
      'Lấy danh sách sản phẩm thành công',
    );
  } catch (error) {
    return fail('Lỗi lấy danh sách sản phẩm', 500, error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireAdmin(request);

    const body = await request.json().catch(() => null);
    if (!body?.name || body?.price === undefined) {
      return fail('Thiếu tên sản phẩm hoặc giá sản phẩm', 400);
    }

    let categoryId = body.categoryId || null;
    if (!categoryId && body.categorySlug) {
      const { data: categoryRow } = await supabaseAdmin
        .from('categories')
        .select('id')
        .eq('slug', body.categorySlug)
        .single();
      categoryId = categoryRow?.id || null;
    }

    let slug = body.slug || slugify(body.name);
    
    // Resolve duplicate slug conflict
    const { data: existingProduct } = await supabaseAdmin
      .from('products')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (existingProduct) {
      slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert({
        category_id: categoryId,
        name: body.name,
        slug,
        description: body.description || '',
        price: Number(body.price),
        original_price: body.originalPrice ?? null,
        image_url: body.image || body.imageUrl || null,
        rating: body.rating ?? 0,
        reviews_count: body.reviews ?? 0,
        stock_quantity: body.stockQuantity ?? 0,
        discount_percent: body.discount ?? 0,
        is_featured: Boolean(body.isFeatured),
        is_active: body.isActive ?? true,
      })
      .select('id')
      .single();

    if (error) return fail('Không tạo được sản phẩm', 500, error.message);

    const optionRows = [
      ...(Array.isArray(body.colors) ? body.colors.map((value: string, index: number) => ({ product_id: product.id, option_name: 'color', option_value: value, sort_order: index + 1 })) : []),
      ...(Array.isArray(body.sizes) ? body.sizes.map((value: string, index: number) => ({ product_id: product.id, option_name: 'size', option_value: value, sort_order: index + 1 })) : []),
    ];

    if (optionRows.length) {
      await supabaseAdmin.from('product_options').insert(optionRows);
    }

    if (body.image || body.imageUrl) {
      await supabaseAdmin.from('product_images').insert({
        product_id: product.id,
        image_url: body.image || body.imageUrl,
        alt_text: body.name,
        is_primary: true,
        sort_order: 1,
      });
    }

    return created(product, 'Tạo sản phẩm thành công');
  } catch (error) {
    return fail('Lỗi tạo sản phẩm hoặc token admin không hợp lệ', 401, error);
  }
}
