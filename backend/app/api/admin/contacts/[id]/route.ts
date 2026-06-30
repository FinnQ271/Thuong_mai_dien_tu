import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { fail, ok } from '@/lib/response';
import { optionsResponse } from '@/lib/cors';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return optionsResponse();
}

export async function PATCH(request: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    const user = requireAdmin(request);
    const params = await Promise.resolve(context.params);
    const body = await request.json().catch(() => null);
    const allowedStatuses = ['new', 'processing', 'resolved', 'closed'];

    if (body?.status && !allowedStatuses.includes(body.status)) {
      return fail('Trạng thái liên hệ không hợp lệ', 400);
    }

    const updateData: Record<string, unknown> = {};
    if (body?.status !== undefined) updateData.status = body.status;
    if (body?.adminNote !== undefined) updateData.admin_note = body.adminNote;

    if (body?.status === 'resolved' || body?.status === 'closed') {
      updateData.handled_by = user.userId;
      updateData.handled_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .update(updateData)
      .eq('id', params.id)
      .select('*')
      .single();

    if (error) return fail('Không cập nhật được liên hệ', 500, error.message);
    return ok(data, 'Cập nhật liên hệ thành công');
  } catch (error) {
    return fail('Lỗi cập nhật liên hệ hoặc token admin không hợp lệ', 401, error);
  }
}
