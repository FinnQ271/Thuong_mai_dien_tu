import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';
import { fail, created } from '@/lib/response';
import { optionsResponse } from '@/lib/cors';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = String(body?.email || '').trim().toLowerCase();
    const password = String(body?.password || '');
    const fullName = String(body?.fullName || body?.name || '').trim();
    const phone = String(body?.phone || '').trim();

    if (!email || !password || !fullName) {
      return fail('Vui lòng điền đầy đủ email, mật khẩu và họ tên', 400);
    }

    // 1. Check if email already exists
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('app_users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (checkError) {
      return fail('Lỗi hệ thống khi kiểm tra email', 500, checkError.message);
    }

    if (existingUser) {
      return fail('Email này đã được sử dụng bởi tài khoản khác', 400);
    }

    // 2. Fetch default 'customer' role
    const { data: role, error: roleError } = await supabaseAdmin
      .from('roles')
      .select('id')
      .eq('code', 'customer')
      .single();

    if (roleError || !role) {
      return fail('Không tìm thấy vai trò khách hàng mặc định trong cơ sở dữ liệu', 500, roleError?.message);
    }

    // 3. Hash the password with bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user in database
    const { data: newUser, error: insertError } = await supabaseAdmin
      .from('app_users')
      .insert({
        email,
        password_hash: hashedPassword,
        full_name: fullName,
        phone: phone || null,
        role_id: role.id,
        is_active: true,
      })
      .select('id, email, full_name')
      .single();

    if (insertError || !newUser) {
      return fail('Đăng ký tài khoản thất bại', 500, insertError?.message);
    }

    return created({ user: newUser }, 'Đăng ký tài khoản thành công!');
  } catch (error) {
    return fail('Lỗi đăng ký tài khoản', 500, error);
  }
}
