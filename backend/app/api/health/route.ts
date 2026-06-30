import { supabaseAdmin } from '@/lib/supabase';
import { fail, ok } from '@/lib/response';
import { optionsResponse } from '@/lib/cors';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return optionsResponse();
}

export async function GET() {
  try {
    const { error } = await supabaseAdmin.from('products').select('id', { count: 'exact', head: true });
    if (error) return fail('Không kết nối được Supabase', 500, error.message);

    return ok({ status: 'running', supabase: 'connected', time: new Date().toISOString() }, 'Backend hoạt động tốt');
  } catch (error) {
    return fail('Lỗi kiểm tra backend', 500, error);
  }
}
