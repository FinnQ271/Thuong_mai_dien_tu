# RIVORAMART - FULL BÀI FRONTEND + BACKEND + SUPABASE

## 1. Nội dung trong file ZIP

File này gồm 3 phần chính:

- `frontend/`: giao diện React Vite của dự án thương mại điện tử.
- `backend/`: backend Next.js API kết nối Supabase.
- `database/rivoramart_supabase_schema.sql`: file tạo cơ sở dữ liệu Supabase.

## 2. Tài khoản admin quyền cao nhất

```txt
Email: admin@rivoramart.com
Mật khẩu: Admin@123456
Quyền: super_admin
Level: 100
```

## 3. Tạo cơ sở dữ liệu trên Supabase

Vào Supabase:

```txt
Supabase > SQL Editor > New query
```

Copy toàn bộ nội dung file:

```txt
database/rivoramart_supabase_schema.sql
```

Sau đó bấm `Run`.

Test tài khoản admin bằng SQL:

```sql
select * from public.check_login('admin@rivoramart.com', 'Admin@123456');
```

## 4. Chạy backend Next.js

Mở terminal:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Mở file `.env` và điền thông tin Supabase:

```env
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
FRONTEND_URL=http://localhost:5173
JWT_SECRET=mot_chuoi_bi_mat_that_dai
JWT_EXPIRES_IN=7d
```

Backend chạy ở:

```txt
http://localhost:3000
```

Test backend:

```bash
curl http://localhost:3000/api/health
```

## 5. Chạy frontend React Vite

Mở terminal khác:

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy ở:

```txt
http://localhost:5173
```

## 6. Các API chính của backend

```txt
GET  /api/health
POST /api/auth/login

GET  /api/products
GET  /api/products/:id
GET  /api/product/:slug
POST /api/products
PATCH /api/products/:id
DELETE /api/products/:id

GET  /api/categories
POST /api/categories

POST /api/contact
GET  /api/contact

POST /api/orders
GET  /api/orders
GET  /api/orders/:id
PATCH /api/orders/:id

GET  /api/admin/dashboard
PATCH /api/admin/contacts/:id
```

## 7. Ghi chú quan trọng

- Chạy SQL Supabase trước.
- Sau đó chạy backend.
- Cuối cùng chạy frontend.
- Không đưa `SUPABASE_SERVICE_ROLE_KEY` lên GitHub công khai.
- Nếu deploy Vercel, cần thêm biến môi trường ở phần Project Settings > Environment Variables.
