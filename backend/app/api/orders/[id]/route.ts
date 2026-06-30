import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { fail, ok } from '@/lib/response';
import { optionsResponse } from '@/lib/cors';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return optionsResponse();
}

export async function GET(request: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    requireAdmin(request);
    const params = await Promise.resolve(context.params);
    const id = params.id;

    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', id)
      .single();

    if (error || !data) return fail('Không tìm thấy đơn hàng', 404, error?.message);
    return ok(data, 'Lấy chi tiết đơn hàng thành công');
  } catch (error) {
    return fail('Lỗi lấy đơn hàng hoặc token admin không hợp lệ', 401, error);
  }
}

export async function PATCH(request: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    requireAdmin(request);
    const params = await Promise.resolve(context.params);
    const body = await request.json().catch(() => null);
    const allowedStatuses = ['pending', 'confirmed', 'shipping', 'completed', 'cancelled'];
    const allowedPaymentStatuses = ['unpaid', 'paid', 'refunded'];
    const updateData: Record<string, unknown> = {};

    if (body?.status !== undefined) {
      if (!allowedStatuses.includes(body.status)) return fail('Trạng thái đơn hàng không hợp lệ', 400);
      updateData.status = body.status;
    }

    if (body?.paymentStatus !== undefined) {
      if (!allowedPaymentStatuses.includes(body.paymentStatus)) return fail('Trạng thái thanh toán không hợp lệ', 400);
      updateData.payment_status = body.paymentStatus;
    }

    if (body?.note !== undefined) updateData.note = body.note;

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(updateData)
      .eq('id', params.id)
      .select('*')
      .single();

    if (error) return fail('Không cập nhật được đơn hàng', 500, error.message);
    return ok(data, 'Cập nhật đơn hàng thành công');
  } catch (error) {
    return fail('Lỗi cập nhật đơn hàng hoặc token admin không hợp lệ', 401, error);
  }
}
