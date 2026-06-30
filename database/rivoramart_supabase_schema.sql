-- =========================================================
-- DATABASE SUPABASE CHO DỰ ÁN THƯƠNG MẠI ĐIỆN TỬ / RIVORAMART
-- Phân tích từ file React Vite: src/data/products.ts, Contact, Checkout, Login
-- Chạy trong Supabase: SQL Editor -> New query -> Run
-- Lưu ý: Script này reset lại các bảng bên dưới. Nên chạy trên project Supabase mới.
-- =========================================================

begin;

create extension if not exists pgcrypto;

-- Xoá bảng cũ nếu có để chạy lại không bị trùng
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.contact_messages CASCADE;
DROP TABLE IF EXISTS public.wishlist_items CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.product_options CASCADE;
DROP TABLE IF EXISTS public.product_images CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.role_permissions CASCADE;
DROP TABLE IF EXISTS public.permissions CASCADE;
DROP TABLE IF EXISTS public.app_users CASCADE;
DROP TABLE IF EXISTS public.roles CASCADE;

-- =========================================================
-- 1. HỆ THỐNG PHÂN QUYỀN USER / ADMIN
-- =========================================================

create table public.roles (
  id bigserial primary key,
  code text not null unique,
  name text not null,
  level int not null default 10,
  description text,
  created_at timestamptz not null default now()
);

create table public.permissions (
  id bigserial primary key,
  code text not null unique,
  name text not null,
  description text
);

create table public.role_permissions (
  id bigserial primary key,
  role_id bigint not null references public.roles(id) on delete cascade,
  permission_id bigint not null references public.permissions(id) on delete cascade,
  unique(role_id, permission_id)
);

create table public.app_users (
  id uuid primary key default gen_random_uuid(),
  -- Nếu sau này dùng Supabase Auth, liên kết auth.users.id vào cột này
  auth_user_id uuid unique,
  role_id bigint not null references public.roles(id),
  email text not null unique,
  password_hash text not null,
  full_name text not null,
  phone text,
  avatar_url text,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- 2. DANH MỤC + SẢN PHẨM
-- =========================================================

create table public.categories (
  id bigserial primary key,
  name text not null,
  slug text not null unique,
  description text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id bigserial primary key,
  category_id bigint references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  price numeric(12,0) not null check (price >= 0),
  original_price numeric(12,0) check (original_price is null or original_price >= 0),
  image_url text,
  rating numeric(2,1) not null default 0 check (rating >= 0 and rating <= 5),
  reviews_count int not null default 0 check (reviews_count >= 0),
  stock_quantity int not null default 0 check (stock_quantity >= 0),
  in_stock boolean generated always as (stock_quantity > 0) stored,
  discount_percent int not null default 0 check (discount_percent >= 0 and discount_percent <= 100),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id bigserial primary key,
  product_id bigint not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  is_primary boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.product_options (
  id bigserial primary key,
  product_id bigint not null references public.products(id) on delete cascade,
  option_name text not null check (option_name in ('color', 'size')),
  option_value text not null,
  sort_order int not null default 0,
  unique(product_id, option_name, option_value)
);

-- =========================================================
-- 3. LIÊN HỆ, ĐƠN HÀNG, YÊU THÍCH, ĐÁNH GIÁ
-- =========================================================

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  email text not null,
  phone text,
  subject text default 'Liên hệ từ website',
  message text not null,
  status text not null default 'new' check (status in ('new', 'processing', 'resolved', 'closed')),
  admin_note text,
  handled_by uuid references public.app_users(id) on delete set null,
  handled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null unique default ('ORD-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))),
  user_id uuid references public.app_users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  shipping_address text,
  city text,
  note text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'shipping', 'completed', 'cancelled')),
  payment_method text not null default 'cod' check (payment_method in ('cod', 'bank_transfer', 'paypal', 'card')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'paid', 'refunded')),
  subtotal numeric(12,0) not null default 0 check (subtotal >= 0),
  shipping_fee numeric(12,0) not null default 0 check (shipping_fee >= 0),
  discount_amount numeric(12,0) not null default 0 check (discount_amount >= 0),
  total_amount numeric(12,0) not null default 0 check (total_amount >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id bigserial primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id bigint references public.products(id) on delete restrict,
  product_name text not null,
  product_image text,
  selected_color text,
  selected_size text,
  price numeric(12,0) not null check (price >= 0),
  quantity int not null default 1 check (quantity > 0),
  line_total numeric(12,0) generated always as (price * quantity) stored,
  created_at timestamptz not null default now()
);

create table public.wishlist_items (
  id bigserial primary key,
  user_id uuid not null references public.app_users(id) on delete cascade,
  product_id bigint not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, product_id)
);

create table public.reviews (
  id bigserial primary key,
  product_id bigint not null references public.products(id) on delete cascade,
  user_id uuid references public.app_users(id) on delete set null,
  customer_name text not null,
  rating int not null check (rating between 1 and 5),
  comment text,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- =========================================================
-- 4. TRIGGER TỰ CẬP NHẬT updated_at
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_app_users_updated_at
before update on public.app_users
for each row execute function public.set_updated_at();

create trigger trg_categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

create trigger trg_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create trigger trg_contact_messages_updated_at
before update on public.contact_messages
for each row execute function public.set_updated_at();

create trigger trg_orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

-- =========================================================
-- 5. FUNCTION KIỂM TRA ĐĂNG NHẬP CHO LOGIN CUSTOM
-- Email/password demo, hợp với trang Login hiện tại của project
-- =========================================================

create or replace function public.check_login(p_email text, p_password text)
returns table (
  user_id uuid,
  email text,
  full_name text,
  role_code text,
  role_name text,
  role_level int
)
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  return query
  select
    u.id,
    u.email,
    u.full_name,
    r.code,
    r.name,
    r.level
  from public.app_users u
  join public.roles r on r.id = u.role_id
  where lower(u.email) = lower(p_email)
    and u.password_hash = crypt(p_password, u.password_hash)
    and u.is_active = true
  limit 1;
end;
$$;

-- Nếu dùng Supabase Auth về sau: user có auth_user_id và role level >= 80 được coi là admin
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_users u
    join public.roles r on r.id = u.role_id
    where u.auth_user_id = auth.uid()
      and u.is_active = true
      and r.level >= 80
  );
$$;

-- =========================================================
-- 6. DỮ LIỆU MẪU: ROLE, ADMIN, CATEGORY, PRODUCT
-- =========================================================

insert into public.roles (code, name, level, description) values
('customer', 'Khách hàng', 10, 'Tài khoản khách hàng thông thường'),
('staff', 'Nhân viên', 50, 'Nhân viên xử lý đơn hàng và liên hệ'),
('admin', 'Quản trị viên', 80, 'Quản trị sản phẩm, đơn hàng, liên hệ'),
('super_admin', 'Quản trị cao nhất', 100, 'Toàn quyền truy cập hệ thống')
on conflict (code) do update set name = excluded.name, level = excluded.level, description = excluded.description;

insert into public.permissions (code, name, description) values
('dashboard.view', 'Xem Dashboard', 'Xem thống kê tổng quan'),
('products.manage', 'Quản lý sản phẩm', 'Thêm, sửa, xoá sản phẩm'),
('categories.manage', 'Quản lý danh mục', 'Thêm, sửa, xoá danh mục'),
('orders.manage', 'Quản lý đơn hàng', 'Xem và cập nhật đơn hàng'),
('contacts.manage', 'Quản lý liên hệ', 'Xem và xử lý phiếu liên hệ'),
('users.manage', 'Quản lý tài khoản', 'Quản lý user và phân quyền'),
('reports.view', 'Xem báo cáo', 'Xem báo cáo doanh thu'),
('settings.manage', 'Quản lý cài đặt', 'Cấu hình hệ thống'),
('all.access', 'Toàn quyền', 'Quyền cao nhất của super admin')
on conflict (code) do update set name = excluded.name, description = excluded.description;

-- Super admin có toàn bộ quyền
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
cross join public.permissions p
where r.code = 'super_admin'
on conflict (role_id, permission_id) do nothing;

-- Admin thường có quyền quản trị nghiệp vụ
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on p.code in (
  'dashboard.view', 'products.manage', 'categories.manage',
  'orders.manage', 'contacts.manage', 'reports.view'
)
where r.code = 'admin'
on conflict (role_id, permission_id) do nothing;

-- Nhân viên chỉ xử lý đơn và liên hệ
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on p.code in ('dashboard.view', 'orders.manage', 'contacts.manage')
where r.code = 'staff'
on conflict (role_id, permission_id) do nothing;

-- TÀI KHOẢN ADMIN CAO NHẤT
-- Email: admin@rivoramart.com
-- Mật khẩu: Admin@123456
insert into public.app_users (email, password_hash, full_name, phone, role_id, is_active)
values (
  'admin@rivoramart.com',
  crypt('Admin@123456', gen_salt('bf')),
  'Super Admin RivoraMart',
  '0900000000',
  (select id from public.roles where code = 'super_admin'),
  true
)
on conflict (email) do update set
  password_hash = excluded.password_hash,
  full_name = excluded.full_name,
  phone = excluded.phone,
  role_id = excluded.role_id,
  is_active = true,
  updated_at = now();

insert into public.categories (name, slug, description, sort_order) values
('Tai nghe', 'tai-nghe', 'Các sản phẩm tai nghe Bluetooth, tai nghe true wireless', 1),
('Đồng hồ', 'dong-ho', 'Đồng hồ thông minh và phụ kiện đeo tay', 2),
('Loa', 'loa', 'Loa Bluetooth, loa mini, loa di động', 3),
('Phụ kiện', 'phu-kien', 'Phụ kiện điện thoại và thiết bị số', 4),
('Camera', 'camera', 'Camera hành trình, camera công nghệ', 5),
('Phụ kiện máy tính', 'phu-kien-may-tinh', 'Bàn phím, chuột, webcam và phụ kiện PC', 6),
('Màn hình', 'man-hinh', 'Màn hình máy tính, màn hình gaming', 7),
('Đồ dùng văn phòng', 'do-dung-van-phong', 'Đồ dùng văn phòng thông minh', 8)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.products
(id, category_id, name, slug, description, price, original_price, image_url, rating, reviews_count, stock_quantity, discount_percent, is_featured)
values
(1, (select id from public.categories where slug='tai-nghe'), 'Tai nghe Bluetooth Premium', 'tai-nghe-bluetooth-premium', 'Tai nghe Bluetooth chất lượng cao với âm thanh sống động và thiết kế hiện đại.', 1299000, 1599000, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', 5, 128, 50, 19, true),
(2, (select id from public.categories where slug='dong-ho'), 'Đồng hồ thông minh Pro', 'dong-ho-thong-minh-pro', 'Đồng hồ thông minh với nhiều tính năng theo dõi sức khỏe và thể thao.', 4990000, 5990000, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', 4, 89, 35, 17, true),
(3, (select id from public.categories where slug='loa'), 'Loa Bluetooth Mini', 'loa-bluetooth-mini', 'Loa Bluetooth nhỏ gọn với âm thanh mạnh mẽ và pin lâu.', 890000, 1190000, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', 5, 256, 80, 25, true),
(4, (select id from public.categories where slug='phu-kien'), 'Ốp lưng điện thoại cao cấp', 'op-lung-dien-thoai-cao-cap', 'Ốp lưng bảo vệ điện thoại với thiết kế sang trọng và chất liệu cao cấp.', 299000, 399000, 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=400&h=400&fit=crop', 4, 342, 120, 25, true),
(5, (select id from public.categories where slug='phu-kien'), 'Sạc dự phòng 20000mAh', 'sac-du-phong-20000mah', 'Sạc dự phòng dung lượng cao với nhiều cổng sạc và sạc nhanh.', 790000, 990000, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop', 5, 189, 65, 20, false),
(6, (select id from public.categories where slug='camera'), 'Camera hành trình 4K', 'camera-hanh-trinh-4k', 'Camera hành trình chất lượng 4K với góc quay rộng và nhiều tính năng an toàn.', 2490000, 2990000, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop', 4, 67, 0, 17, false),
(7, (select id from public.categories where slug='phu-kien-may-tinh'), 'Bàn phím cơ Gaming', 'ban-phim-co-gaming', 'Bàn phím cơ với switch chất lượng cao, đèn LED RGB và thiết kế ergonomic.', 1890000, 2290000, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop', 5, 234, 45, 17, false),
(8, (select id from public.categories where slug='phu-kien-may-tinh'), 'Chuột không dây Gaming', 'chuot-khong-day-gaming', 'Chuột gaming không dây với độ chính xác cao và thiết kế thoải mái.', 890000, 1090000, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop', 4, 156, 70, 18, false),
(9, (select id from public.categories where slug='man-hinh'), 'Màn hình máy tính 27 inch', 'man-hinh-may-tinh-27-inch', 'Màn hình 27 inch với độ phân giải 4K, tần số quét 144Hz và màu sắc chính xác.', 6990000, 7990000, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop', 5, 89, 20, 13, false),
(10, (select id from public.categories where slug='tai-nghe'), 'Tai nghe True Wireless', 'tai-nghe-true-wireless', 'Tai nghe true wireless với chất âm tuyệt vời và hộp sạc nhỏ gọn.', 2190000, 2590000, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop', 4, 298, 55, 15, false),
(11, (select id from public.categories where slug='phu-kien-may-tinh'), 'Webcam HD 1080p', 'webcam-hd-1080p', 'Webcam chất lượng Full HD với micro tích hợp và tự động lấy nét.', 1290000, 1590000, 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop', 4, 145, 40, 19, false),
(12, (select id from public.categories where slug='do-dung-van-phong'), 'Đèn bàn LED thông minh', 'den-ban-led-thong-minh', 'Đèn bàn LED với nhiều chế độ ánh sáng và có thể điều chỉnh qua app.', 690000, 890000, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', 5, 167, 90, 22, false)
on conflict (id) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  price = excluded.price,
  original_price = excluded.original_price,
  image_url = excluded.image_url,
  rating = excluded.rating,
  reviews_count = excluded.reviews_count,
  stock_quantity = excluded.stock_quantity,
  discount_percent = excluded.discount_percent,
  is_featured = excluded.is_featured,
  updated_at = now();

-- Đồng bộ sequence sau khi insert id thủ công
select setval(pg_get_serial_sequence('public.products', 'id'), (select max(id) from public.products));

insert into public.product_images (product_id, image_url, alt_text, is_primary, sort_order)
select id, image_url, name, true, 1 from public.products
on conflict do nothing;

insert into public.product_options (product_id, option_name, option_value, sort_order) values
(1, 'color', 'Đen', 1), (1, 'color', 'Trắng', 2), (1, 'color', 'Xanh', 3),
(2, 'color', 'Đen', 1), (2, 'color', 'Bạc', 2), (2, 'color', 'Vàng hồng', 3), (2, 'size', '40mm', 1), (2, 'size', '44mm', 2),
(3, 'color', 'Đen', 1), (3, 'color', 'Xanh dương', 2), (3, 'color', 'Đỏ', 3),
(4, 'color', 'Trong suốt', 1), (4, 'color', 'Đen', 2), (4, 'color', 'Xanh navy', 3),
(5, 'color', 'Đen', 1), (5, 'color', 'Trắng', 2),
(6, 'color', 'Đen', 1),
(7, 'color', 'Đen', 1), (7, 'color', 'Trắng', 2),
(8, 'color', 'Đen', 1), (8, 'color', 'Trắng', 2),
(9, 'color', 'Đen', 1), (9, 'size', '27 inch', 1),
(10, 'color', 'Đen', 1), (10, 'color', 'Trắng', 2), (10, 'color', 'Xanh mint', 3),
(11, 'color', 'Đen', 1),
(12, 'color', 'Trắng', 1), (12, 'color', 'Đen', 2)
on conflict (product_id, option_name, option_value) do update set sort_order = excluded.sort_order;

-- =========================================================
-- 7. VIEW CHO ADMIN DASHBOARD
-- =========================================================

create or replace view public.v_admin_dashboard_stats as
select
  (select count(*) from public.products where is_active = true) as total_products,
  (select count(*) from public.orders) as total_orders,
  (select count(*) from public.contact_messages where status = 'new') as new_contacts,
  (select coalesce(sum(total_amount), 0) from public.orders where status in ('confirmed', 'shipping', 'completed')) as total_revenue,
  (select count(*) from public.products where stock_quantity = 0) as out_of_stock_products;

create or replace view public.v_order_details as
select
  o.id as order_id,
  o.order_code,
  o.customer_name,
  o.customer_email,
  o.customer_phone,
  o.status,
  o.payment_method,
  o.payment_status,
  o.total_amount,
  o.created_at,
  oi.product_id,
  oi.product_name,
  oi.selected_color,
  oi.selected_size,
  oi.price,
  oi.quantity,
  oi.line_total
from public.orders o
join public.order_items oi on oi.order_id = o.id;

-- =========================================================
-- 8. RLS + POLICY CƠ BẢN CHO SUPABASE
-- =========================================================

alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.app_users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_options enable row level security;
alter table public.contact_messages enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.reviews enable row level security;

-- Khách được xem dữ liệu bán hàng công khai
create policy "Public read active categories"
on public.categories for select
using (is_active = true);

create policy "Public read active products"
on public.products for select
using (is_active = true);

create policy "Public read product images"
on public.product_images for select
using (exists (select 1 from public.products p where p.id = product_id and p.is_active = true));

create policy "Public read product options"
on public.product_options for select
using (exists (select 1 from public.products p where p.id = product_id and p.is_active = true));

create policy "Public read approved reviews"
on public.reviews for select
using (is_approved = true);

-- Khách gửi liên hệ và tạo đơn hàng
create policy "Anyone can insert contact messages"
on public.contact_messages for insert
with check (true);

create policy "Anyone can insert orders"
on public.orders for insert
with check (true);

create policy "Anyone can insert order items"
on public.order_items for insert
with check (true);

create policy "Anyone can insert reviews pending approval"
on public.reviews for insert
with check (is_approved = false);

-- Admin dùng Supabase Auth hoặc backend service role có thể quản trị
create policy "Admin manage roles"
on public.roles for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage permissions"
on public.permissions for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage role permissions"
on public.role_permissions for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage users"
on public.app_users for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage categories"
on public.categories for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage products"
on public.products for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage product images"
on public.product_images for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage product options"
on public.product_options for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage contacts"
on public.contact_messages for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage orders"
on public.orders for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage order items"
on public.order_items for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage wishlist"
on public.wishlist_items for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admin manage reviews"
on public.reviews for all
using (public.is_admin())
with check (public.is_admin());

-- Quyền dùng qua Supabase REST/RPC

grant usage on schema public to anon, authenticated;
grant select on public.categories, public.products, public.product_images, public.product_options, public.reviews to anon, authenticated;
grant insert on public.contact_messages, public.orders, public.order_items, public.reviews to anon, authenticated;
grant execute on function public.check_login(text, text) to anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;
grant usage, select on all sequences in schema public to anon, authenticated;

grant select, insert, update, delete on
  public.roles,
  public.permissions,
  public.role_permissions,
  public.app_users,
  public.categories,
  public.products,
  public.product_images,
  public.product_options,
  public.contact_messages,
  public.orders,
  public.order_items,
  public.wishlist_items,
  public.reviews
to authenticated;

commit;

-- =========================================================
-- TEST NHANH SAU KHI CHẠY SQL
-- =========================================================
-- 1) Xem sản phẩm:
-- select * from public.products;
--
-- 2) Test đăng nhập admin:
-- select * from public.check_login('admin@rivoramart.com', 'Admin@123456');
--
-- 3) Xem thống kê dashboard:
-- select * from public.v_admin_dashboard_stats;
