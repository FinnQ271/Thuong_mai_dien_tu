import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { created, fail, ok } from '@/lib/response';
import { optionsResponse } from '@/lib/cors';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const firstName = String(body?.firstName || body?.name || '').trim();
    const lastName = String(body?.lastName || body?.surname || '').trim();
    const email = String(body?.email || '').trim();
    const phone = String(body?.phone || '').trim();
    const subject = String(body?.subject || 'Liên hệ từ website').trim();
    const message = String(body?.message || '').trim();

    if (!email || !message) {
      return fail('Vui lòng nhập email và nội dung liên hệ', 400);
    }

    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .insert({
        first_name: firstName || null,
        last_name: lastName || null,
        email,
        phone: phone || null,
        subject,
        message,
        status: 'new',
      })
      .select('*')
      .single();

    if (error) return fail('Không lưu được liên hệ', 500, error.message);
    return created(data, 'Gửi liên hệ thành công');
  } catch (error) {
    return fail('Lỗi gửi liên hệ', 500, error);
  }
}

export async function GET(request: NextRequest) {
  try {
    requireAdmin(request);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') query = query.eq('status', status);

    const { data, error } = await query;
    if (error) return fail('Không lấy được danh sách liên hệ', 500, error.message);

    return ok(data || [], 'Lấy danh sách liên hệ thành công');
  } catch (error) {
    return fail('Lỗi lấy liên hệ hoặc token admin không hợp lệ', 401, error);
  }
}
