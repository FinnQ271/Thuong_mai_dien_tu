# Hướng Dẫn Sử Dụng - Hệ Thống Cửa Hàng Trực Tuyến

## Tổng Quan

Dự án đã được nâng cấp với hệ thống danh sách sản phẩm mockup và luồng mua hàng hoàn chỉnh. Dưới đây là các tính năng chính:

## 🎯 Tính Năng Chính

### 1. **Danh Sách Sản Phẩm (ShopNew)**
- **12 sản phẩm mẫu** với thông tin chi tiết:
  - Tên sản phẩm
  - Giá tiền (VND)
  - Giá gốc (có gạch ngang nếu có giảm giá)
  - Hình ảnh
  - Đánh giá sao (1-5 sao)
  - Số lượng đánh giá
  - Trạng thái còn hàng/hết hàng
  - Phần trăm giảm giá

### 2. **Bộ Lọc & Sắp Xếp**
- **Lọc theo danh mục**: Tai nghe, Đồng hồ, Loa, Phụ kiện, Camera, Phụ kiện máy tính, Màn hình, Đồ dùng văn phòng
- **Lọc theo khoảng giá**: Sử dụng thanh trượt từ 0đ đến 10,000,000đ
- **Tìm kiếm**: Tìm theo tên hoặc mô tả sản phẩm
- **Sắp xếp**:
  - Phổ biến nhất
  - Giá: Thấp đến cao
  - Giá: Cao đến thấp
  - Mới nhất
  - Đánh giá cao nhất

### 3. **Giỏ Hàng (CartNew)**
- **Thêm vào giỏ**: Click nút "Thêm vào giỏ" trên product card
- **Quản lý giỏ hàng**:
  - Tăng/giảm số lượng
  - Xóa sản phẩm
  - Xóa tất cả
- **Mã giảm giá**: Sử dụng mã `SAVE10` để được giảm 10%
- **Tính toán tự động**:
  - Tạm tính
  - Giảm giá (từ giá gốc)
  - Phí vận chuyển (miễn phí cho đơn từ 500,000₫)
  - Tổng cộng

### 4. **Product Card Component**
- **Hiệu ứng hover**: Sản phẩm nổi lên khi di chuột
- **Badge trạng thái**:
  - Màu đỏ: "Hết hàng"
  - Màu xanh: Giảm giá (hiển thị % giảm)
- **Nút thêm vào giỏ**:
  - Hiệu ứng loading khi đang thêm
  - Thông báo "Đã thêm!" khi thành công
  - Vô hiệu hóa khi sản phẩm hết hàng
- **Nút wishlist**: Icon tim để thêm vào danh sách yêu thích

## 📁 Cấu Trúc File

```
src/
├── data/
│   └── products.ts          # Dữ liệu sản phẩm mẫu & utility functions
├── context/
│   └── CartContext.tsx      # Context API quản lý giỏ hàng
├── components/
│   ├── ProductCard.tsx      # Component hiển thị sản phẩm
│   ├── Header.tsx           # Header với navigation
│   └── Footer.tsx           # Footer
├── pages/
│   ├── ShopNew.tsx          # Trang danh sách sản phẩm mới
│   ├── CartNew.tsx          # Trang giỏ hàng mới
│   ├── Shop.tsx             # Trang shop cũ (backup)
│   ├── Cart.tsx             # Trang cart cũ (backup)
│   └── ...                  # Các trang khác
├── App.tsx                  # Main app component
├── index.css                # Global styles
└── main.tsx                 # Entry point
```

## 🚀 Cách Sử Dụng

### Chạy Ứng Dụng

```bash
# Cài đặt dependencies (nếu chưa)
npm install

# Chạy development server
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5174/`

### Luồng Mua Hàng

1. **Xem danh sách sản phẩm**:
   - Truy cập trang Shop (mặc định)
   - Sử dụng bộ lọc bên trái để tìm sản phẩm
   - Hover vào sản phẩm để xem hiệu ứng

2. **Thêm vào giỏ hàng**:
   - Click nút "Thêm vào giỏ" trên product card
   - Sản phẩm sẽ được thêm vào giỏ với số lượng = 1
   - Nếu sản phẩm đã có trong giỏ, số lượng sẽ tăng lên

3. **Xem giỏ hàng**:
   - Click icon giỏ hàng trên header (có badge số lượng)
   - Hoặc click "Giỏ hàng: X sản phẩm" trên trang shop
   - Xem chi tiết giỏ hàng với đầy đủ thông tin

4. **Quản lý giỏ hàng**:
   - Tăng/giảm số lượng bằng nút +/- hoặc nhập trực tiếp
   - Xóa sản phẩm bằng nút "Xóa"
   - Áp dụng mã giảm giá `SAVE10` để được giảm 10%
   - Click "Tiến hành thanh toán" để đến trang checkout

5. **Thanh toán**:
   - Nhập thông tin giao hàng
   - Chọn phương thức thanh toán
   - Xác nhận đơn hàng

## 💡 Các Tính Năng Nâng Cao

### Cart Context API
- **State Management**: Quản lý trạng thái giỏ hàng toàn cục
- **Persistent**: Có thể mở rộng để lưu giỏ hàng vào localStorage
- **Type-safe**: Full TypeScript support

### Responsive Design
- **Mobile-first**: Tối ưu cho mobile
- **Bootstrap Grid**: Sử dụng hệ thống grid của Bootstrap
- **Adaptive Images**: Hình ảnh responsive

### Performance
- **useMemo**: Tối ưu việc filter/sort sản phẩm
- **useCallback**: Tối ưu các hàm trong cart context
- **Lazy loading**: Có thể mở rộng cho hình ảnh

## 🔧 Customization

### Thêm Sản Phẩm Mới

Thêm vào file `src/data/products.ts`:

```typescript
{
  id: 13,
  name: "Tên sản phẩm",
  price: 1000000,
  originalPrice: 1200000,
  image: "url-hinh-anh",
  category: "Danh mục",
  rating: 5,
  reviews: 100,
  inStock: true,
  discount: 17,
  description: "Mô tả sản phẩm",
  colors: ["Đen", "Trắng"],
  sizes: ["S", "M", "L"],
}
```

### Thay Đổi Màu Sắc

Sửa CSS variables trong `src/index.css`:

```css
:root {
  --primary-color: #0d6efd;    /* Màu chính */
  --success-color: #198754;    /* Màu thành công */
  --danger-color: #dc3545;     /* Màu lỗi/nguy hiểm */
}
```

### Thêm Bộ Lọc Mới

Thêm vào component `ShopNew.tsx`:

```typescript
// Thêm state
const [newFilter, setNewFilter] = useState('');

// Thêm vào filteredProducts logic
result = result.filter(product => 
  // điều kiện lọc
);
```

## 🐛 Troubleshooting

### Lỗi TypeScript
Nếu gặp lỗi về import type, đảm bảo sử dụng:
```typescript
import type { Product } from '../data/products';
```

### Lỗi CSS không hiển thị
Kiểm tra file `index.css` đã được import trong `main.tsx`:
```typescript
import './index.css'
```

### Giỏ hàng không hoạt động
Đảm bảo `CartProvider` đã wrap toàn bộ app trong `App.tsx`:
```typescript
<CartProvider>
  <App />
</CartProvider>
```

## 📝 Lưu Ý

1. **Dữ liệu mẫu**: Tất cả sản phẩm là mockup, hình ảnh từ Unsplash
2. **Thanh toán**: Chưa tích hợp payment gateway thực tế
3. **Backend**: Chưa có backend, dữ liệu lưu trên client
4. **Authentication**: Chưa có đăng nhập/đăng ký thực tế

## 🔮 Mở Rộng Trong Tương Lai

- [ ] Tích hợp backend API
- [ ] Thêm authentication (JWT)
- [ ] Lưu giỏ hàng vào localStorage/database
- [ ] Thêm product detail page đầy đủ
- [ ] Tích hợp payment gateway (VNPay, Momo, etc.)
- [ ] Thêm email confirmation
- [ ] Order tracking
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Product comparison
- [ ] Quick view modal
- [ ] Image zoom on product detail

## 👨‍💻 Developer Notes

### Công Nghệ Sử Dụng
- **React 18** với TypeScript
- **Vite** làm build tool
- **Bootstrap 5** cho UI framework
- **Context API** cho state management
- **React Hooks** (useState, useContext, useMemo, useCallback)

### Best Practices
- Type-safe với TypeScript
- Component-based architecture
- Separation of concerns
- Responsive design
- Accessibility considerations

---

**Enjoy coding! 🚀**