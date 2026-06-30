import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { created, fail, ok } from '@/lib/response';
import { optionsResponse } from '@/lib/cors';
import { requireAdmin } from '@/lib/auth';
import type { OrderInputItem } from '@/types';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    const customerName = String(body?.customerName || body?.name || '').trim();
    const customerEmail = String(body?.customerEmail || body?.email || '').trim();
    const customerPhone = String(body?.customerPhone || body?.phone || '').trim();
    const shippingAddress = String(body?.shippingAddress || body?.address || '').trim();
    const city = String(body?.city || '').trim();
    const note = String(body?.note || '').trim();
    const paymentMethod = String(body?.paymentMethod || 'cod').trim();
    const items = (Array.isArray(body?.items) ? body.items : []) as OrderInputItem[];

    if (!customerName || !customerEmail || !customerPhone) {
      return fail('Vui lòng nhập tên, email và số điện thoại đặt hàng', 400);
    }

    if (!items.length) {
      return fail('Giỏ hàng đang trống, không thể tạo đơn hàng', 400);
    }

    const normalizedItems = items.map((item) => ({
      productId: item.productId,
      productName: String(item.productName || '').trim(),
      productImage: item.productImage || null,
      selectedColor: item.selectedColor || null,
      selectedSize: item.selectedSize || null,
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 1),
    }));

    const invalidItem = normalizedItems.find((item) => !item.productName || item.price < 0 || item.quantity <= 0);
    if (invalidItem) {
      return fail('Thông tin sản phẩm trong đơn hàng không hợp lệ', 400);
    }

    const subtotal = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = body?.shippingFee !== undefined ? Number(body.shippingFee) : subtotal >= 500000 ? 0 : 30000;
    const discountAmount = Number(body?.discountAmount || 0);
    const totalAmount = Math.max(subtotal + shippingFee - discountAmount, 0);

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        shipping_address: shippingAddress || null,
        city: city || null,
        note: note || null,
        payment_method: paymentMethod,
        payment_status: 'unpaid',
        status: 'pending',
        subtotal,
        shipping_fee: shippingFee,
        discount_amount: discountAmount,
        total_amount: totalAmount,
      })
      .select('*')
      .single();

    if (orderError || !order) return fail('Không tạo được đơn hàng', 500, orderError?.message);

    const orderItems = normalizedItems.map((item) => ({
      order_id: order.id,
      product_id: item.productId || null,
      product_name: item.productName,
      product_image: item.productImage,
      selected_color: item.selectedColor,
      selected_size: item.selectedSize,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemError } = await supabaseAdmin.from('order_items').insert(orderItems);

    if (itemError) {
      await supabaseAdmin.from('orders').delete().eq('id', order.id);
      return fail('Không tạo được chi tiết đơn hàng', 500, itemError.message);
    }

    return created({ order, items: orderItems }, 'Đặt hàng thành công');
  } catch (error) {
    return fail('Lỗi tạo đơn hàng', 500, error);
  }
}

export async function GET(request: NextRequest) {
  try {
    requireAdmin(request);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') query = query.eq('status', status);

    const { data, error } = await query;
    if (error) return fail('Không lấy được danh sách đơn hàng', 500, error.message);

    return ok(data || [], 'Lấy danh sách đơn hàng thành công');
  } catch (error) {
    return fail('Lỗi lấy đơn hàng hoặc token admin không hợp lệ', 401, error);
  }
}
