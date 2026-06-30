import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { fail, ok } from '@/lib/response';
import { optionsResponse } from '@/lib/cors';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return optionsResponse();
}

export async function GET(request: NextRequest) {
  try {
    const user = requireAdmin(request);

    const { data: stats, error: statsError } = await supabaseAdmin
      .from('v_admin_dashboard_stats')
      .select('*')
      .single();

    if (statsError) return fail('Không lấy được thống kê dashboard', 500, statsError.message);

    const { data: latestOrders } = await supabaseAdmin
      .from('orders')
      .select('id, order_code, customer_name, status, payment_status, total_amount, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    const { data: latestContacts } = await supabaseAdmin
      .from('contact_messages')
      .select('id, first_name, last_name, email, subject, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    return ok({ user, stats, latestOrders: latestOrders || [], latestContacts: latestContacts || [] }, 'Lấy dashboard thành công');
  } catch (error) {
    return fail('Lỗi dashboard hoặc token admin không hợp lệ', 401, error);
  }
}
