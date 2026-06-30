# PHÂN TÍCH DỰ ÁN

Dự án gốc là frontend React Vite cho website thương mại điện tử RivoraMart. Dữ liệu sản phẩm ban đầu được lưu dạng mock trong `src/data/products.ts`. Các chức năng như Contact, Checkout, Login/Admin chưa có cơ sở dữ liệu thật nên cần bổ sung Supabase và backend API.

## Cơ sở dữ liệu Supabase đã thiết kế

Các bảng chính:

- `roles`: vai trò người dùng.
- `permissions`: quyền chức năng.
- `role_permissions`: gán quyền cho vai trò.
- `app_users`: tài khoản người dùng/admin.
- `categories`: danh mục sản phẩm.
- `products`: sản phẩm.
- `product_images`: ảnh sản phẩm.
- `product_options`: tuỳ chọn sản phẩm.
- `contact_messages`: phiếu liên hệ khách hàng.
- `orders`: đơn hàng.
- `order_items`: chi tiết đơn hàng.
- `wishlist_items`: sản phẩm yêu thích.
- `reviews`: đánh giá sản phẩm.

## Backend đã tạo

Backend Next.js API dùng Supabase Service Role Key để kết nối CSDL. Backend xử lý:

- Đăng nhập admin.
- Lấy danh sách sản phẩm.
- Lấy chi tiết sản phẩm.
- Quản lý danh mục.
- Gửi và quản lý liên hệ.
- Tạo và quản lý đơn hàng.
- Thống kê dashboard admin.

## Admin cao nhất

```txt
Email: admin@rivoramart.com
Mật khẩu: Admin@123456
Role: super_admin
Level: 100
```
