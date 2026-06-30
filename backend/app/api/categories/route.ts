import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { created, fail, ok } from '@/lib/response';
import { optionsResponse } from '@/lib/cors';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

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

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('id, name, slug, description, sort_order, is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) return fail('Không lấy được danh mục', 500, error.message);

    return ok(
      [
        { id: 'all', slug: 'all', name: 'Tất cả sản phẩm' },
        ...(data || []).map((item) => ({
          id: item.slug,
          databaseId: item.id,
          slug: item.slug,
          name: item.name,
          description: item.description,
          sortOrder: item.sort_order,
          isActive: item.is_active,
        })),
      ],
      'Lấy danh mục thành công',
    );
  } catch (error) {
    return fail('Lỗi lấy danh mục', 500, error);
  }
}

export async function POST(request: NextRequest) {
  try {
    requireAdmin(request);
    const body = await request.json().catch(() => null);
    if (!body?.name) return fail('Thiếu tên danh mục', 400);

    const { data, error } = await supabaseAdmin
      .from('categories')
      .insert({
        name: body.name,
        slug: body.slug || slugify(body.name),
        description: body.description || null,
        sort_order: body.sortOrder || 0,
        is_active: body.isActive ?? true,
      })
      .select('*')
      .single();

    if (error) return fail('Không tạo được danh mục', 500, error.message);
    return created(data, 'Tạo danh mục thành công');
  } catch (error) {
    return fail('Lỗi tạo danh mục hoặc token admin không hợp lệ', 401, error);
  }
}
