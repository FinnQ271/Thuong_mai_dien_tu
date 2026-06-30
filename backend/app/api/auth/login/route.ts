import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';
import { fail, ok } from '@/lib/response';
import { optionsResponse } from '@/lib/cors';
import { signToken } from '@/lib/auth';
import type { JwtUser } from '@/types';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = String(body?.email || '').trim().toLowerCase();
    const password = String(body?.password || '');

    if (!email || !password) {
      return fail('Vui lòng nhập email và mật khẩu', 400);
    }

    // Query user by email, joining role details
    const { data: userRow, error } = await supabaseAdmin
      .from('app_users')
      .select('id, email, password_hash, full_name, is_active, roles(id, code, name, level)')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      return fail('Lỗi khi truy vấn tài khoản', 500, error.message);
    }

    if (!userRow) {
      return fail('Email hoặc mật khẩu không đúng', 401);
    }

    if (!userRow.is_active) {
      return fail('Tài khoản đã bị tạm khóa', 403);
    }

    // Verify password hash in JavaScript
    const passwordMatch = await bcrypt.compare(password, userRow.password_hash);
    if (!passwordMatch) {
      return fail('Email hoặc mật khẩu không đúng', 401);
    }

    // Prepare token payload
    const roles: any = userRow.roles;
    const user: JwtUser = {
      userId: userRow.id,
      email: userRow.email,
      fullName: userRow.full_name,
      roleCode: roles?.code || 'customer',
      roleName: roles?.name || 'Khách hàng',
      roleLevel: roles?.level || 10,
    };

    // Update last login
    await supabaseAdmin
      .from('app_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', user.userId);

    return ok({ user, token: signToken(user) }, 'Đăng nhập thành công');
  } catch (error) {
    return fail('Lỗi đăng nhập', 500, error);
  }
}
