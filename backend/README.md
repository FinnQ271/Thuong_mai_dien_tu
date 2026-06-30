# RivoraMart Backend Supabase

Backend này được tạo riêng cho file `thuong-mai-dien-tu-main.zip`.
Dự án gốc là React Vite frontend, dữ liệu sản phẩm đang mock ở `src/data/products.ts`, form Contact chưa lưu DB, Checkout đang lưu tạm `localStorage`. Backend này bù các API thật để kết nối Supabase.

## 1. Chuẩn bị Supabase

Vào Supabase -> SQL Editor -> New query, chạy file:

```txt
supabase/rivoramart_supabase_schema.sql
```

Tài khoản admin cao nhất được tạo bởi SQL:

```txt
Email: admin@rivoramart.com
Password: Admin@123456
Role: super_admin
Level: 100
```

Test trong Supabase SQL Editor:

```sql
select * from public.check_login('admin@rivoramart.com', 'Admin@123456');
```

## 2. Cấu hình backend

Copy file `.env.example` thành `.env`:

```bash
cp .env.example .env
```

Điền thông tin Supabase:

```env
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
FRONTEND_URL=http://localhost:5173
JWT_SECRET=mot_chuoi_bi_mat_that_dai
JWT_EXPIRES_IN=7d
```

Lưu ý: `SUPABASE_SERVICE_ROLE_KEY` chỉ để trong backend, không đưa vào React frontend.

## 3. Chạy backend

```bash
npm install
npm run dev
```

Backend chạy ở:

```txt
http://localhost:3000
```

Test nhanh:

```bash
curl http://localhost:3000/api/health
```

## 4. API public cho frontend

### Lấy sản phẩm

```http
GET /api/products
GET /api/products?category=tai-nghe
GET /api/products?search=tai%20nghe
GET /api/products?sort=price-low
GET /api/products?featured=true
```

### Lấy chi tiết sản phẩm

```http
GET /api/products/1
GET /api/product/tai-nghe-bluetooth-premium
```

### Lấy danh mục

```http
GET /api/categories
```

### Gửi liên hệ

```http
POST /api/contact
Content-Type: application/json

{
  "firstName": "Lê",
  "lastName": "Dũng",
  "email": "dung@example.com",
  "phone": "0900000000",
  "message": "Tôi cần tư vấn sản phẩm"
}
```

### Đặt hàng

```http
POST /api/orders
Content-Type: application/json

{
  "customerName": "Lê Đức Dũng",
  "customerEmail": "dung@example.com",
  "customerPhone": "0900000000",
  "shippingAddress": "Bắc Ninh",
  "paymentMethod": "cod",
  "items": [
    {
      "productId": 1,
      "productName": "Tai nghe Bluetooth Premium",
      "productImage": "https://...",
      "selectedColor": "Đen",
      "price": 1299000,
      "quantity": 1
    }
  ]
}
```

## 5. API admin

Đăng nhập admin:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@rivoramart.com",
  "password": "Admin@123456"
}
```

Response có `token`. Khi gọi API admin, gửi header:

```txt
Authorization: Bearer TOKEN_VUA_NHAN
```

Các API admin chính:

```http
GET /api/admin/dashboard
GET /api/contact
PATCH /api/admin/contacts/[id]
GET /api/orders
GET /api/orders/[id]
PATCH /api/orders/[id]
POST /api/products
PATCH /api/products/[id]
DELETE /api/products/[id]
POST /api/categories
```

## 6. Gợi ý nối frontend React Vite

Tạo file `src/services/api.ts` trong frontend:

```ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function apiGetProducts() {
  const res = await fetch(`${API_URL}/api/products`);
  const json = await res.json();
  return json.data || [];
}

export async function apiSendContact(payload: {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
```

Thêm file `.env` bên frontend:

```env
VITE_API_URL=http://localhost:3000
```

## 7. Deploy Vercel

- Backend: deploy folder này lên Vercel.
- Thêm Environment Variables giống `.env`.
- Frontend: đổi `VITE_API_URL` thành URL backend Vercel.

Ví dụ:

```env
VITE_API_URL=https://ten-backend-cua-em.vercel.app
```
