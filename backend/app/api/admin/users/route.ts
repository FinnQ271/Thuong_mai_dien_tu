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
    requireAdmin(request);

    // Fetch users joined with their role details
    const { data: users, error } = await supabaseAdmin
      .from('app_users')
      .select('id, email, full_name, phone, avatar_url, is_active, last_login_at, created_at, roles(id, code, name, level)')
      .order('created_at', { ascending: false });

    if (error) return fail('Không lấy được danh sách người dùng', 500, error.message);

    return ok(users || [], 'Lấy danh sách người dùng thành công');
  } catch (error) {
    return fail('Lỗi lấy danh sách người dùng hoặc token admin không hợp lệ', 401, error);
  }
}
