import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { fail, ok } from '@/lib/response';
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

export async function OPTIONS() {
  return optionsResponse();
}

export async function GET(_request: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    const params = await Promise.resolve(context.params);
    const id = Number(params.id);
    if (!id) return fail('ID sản phẩm không hợp lệ', 400);

    const { data, error } = await supabaseAdmin
      .from('products')
      .select(productSelect)
      .eq('id', id)
      .single();

    if (error || !data) return fail('Không tìm thấy sản phẩm', 404, error?.message);
    return ok(mapProduct(data as any), 'Lấy chi tiết sản phẩm thành công');
  } catch (error) {
    return fail('Lỗi lấy chi tiết sản phẩm', 500, error);
  }
}

export async function PATCH(request: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    requireAdmin(request);
    const params = await Promise.resolve(context.params);
    const id = Number(params.id);
    if (!id) return fail('ID sản phẩm không hợp lệ', 400);

    const body = await request.json().catch(() => null);
    const updateData: Record<string, unknown> = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.price !== undefined) updateData.price = Number(body.price);
    if (body.originalPrice !== undefined) updateData.original_price = body.originalPrice;
    if (body.image !== undefined || body.imageUrl !== undefined) updateData.image_url = body.image || body.imageUrl;
    if (body.rating !== undefined) updateData.rating = Number(body.rating);
    if (body.reviews !== undefined) updateData.reviews_count = Number(body.reviews);
    if (body.stockQuantity !== undefined) updateData.stock_quantity = Number(body.stockQuantity);
    if (body.discount !== undefined) updateData.discount_percent = Number(body.discount);
    if (body.isFeatured !== undefined) updateData.is_featured = Boolean(body.isFeatured);
    if (body.isActive !== undefined) updateData.is_active = Boolean(body.isActive);
    if (body.categoryId !== undefined) updateData.category_id = body.categoryId;

    const { data, error } = await supabaseAdmin
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select('id')
      .single();

    if (error) return fail('Không cập nhật được sản phẩm', 500, error.message);
    return ok(data, 'Cập nhật sản phẩm thành công');
  } catch (error) {
    return fail('Lỗi cập nhật sản phẩm hoặc token admin không hợp lệ', 401, error);
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    requireAdmin(request);
    const params = await Promise.resolve(context.params);
    const id = Number(params.id);
    if (!id) return fail('ID sản phẩm không hợp lệ', 400);

    // Attempt physical deletion
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      // Check if it is a foreign key constraint violation (PostgreSQL code 23503)
      if (error.code === '23503') {
        // Fallback to soft delete
        const { error: updateError } = await supabaseAdmin
          .from('products')
          .update({ is_active: false })
          .eq('id', id);

        if (updateError) return fail('Không thể xóa hoặc ẩn sản phẩm', 500, updateError.message);
        return ok({ id, softDeleted: true }, 'Sản phẩm đã có trong đơn hàng nên không thể xóa hoàn toàn, hệ thống đã chuyển sang chế độ ẩn sản phẩm');
      }
      return fail('Không xoá được sản phẩm', 500, error.message);
    }
    return ok({ id, softDeleted: false }, 'Đã xóa sản phẩm thành công');
  } catch (error) {
    return fail('Lỗi xoá sản phẩm hoặc token admin không hợp lệ', 401, error);
  }
}
