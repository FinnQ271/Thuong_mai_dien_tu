# Hướng dẫn sửa lỗi Vercel: `vite: command not found`

Lỗi này thường xảy ra khi Vercel không cài được package `vite`, hoặc bạn deploy nhầm thư mục nên Vercel không thấy `package.json`.

## Cách đúng nhất

Khi đẩy lên GitHub, thư mục gốc của repository phải chứa trực tiếp các file này:

- `package.json`
- `package-lock.json`
- `index.html`
- `src/`
- `vite.config.ts`
- `vercel.json`

Không để kiểu:

```txt
RivoraMart_Vercel_Ready/
└── RivoraMart/
    ├── package.json
    ├── src/
    └── ...
```

Nếu repo đang bị như trên, vào Vercel → Project Settings → General → Root Directory → chọn `RivoraMart`, hoặc đẩy lại bản ZIP mới này vì bản này đã để `package.json` ở ngoài cùng.

## Cấu hình trên Vercel

- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

## Chạy thử trên máy

```bash
npm install
npm run build
npm run preview
```


## Fix lỗi Owl Carousel trên Vercel

Nếu Console báo:

```txt
Uncaught SyntaxError: Unexpected token '<'
$(...).owlCarousel is not a function
```

Nguyên nhân là trình duyệt đang gọi nhầm/mất file Owl Carousel JS. Bản này đã sửa đường dẫn trong `index.html` sang:

```html
<link rel="stylesheet" href="/assets/css/owl.carousel.min.css">
<link rel="stylesheet" href="/assets/css/owl.theme.default.min.css">
<script src="/assets/js/owl.carousel.min.js"></script>
```

Sau khi đẩy lại GitHub và Redeploy trên Vercel, hãy mở DevTools → Network → Disable cache rồi refresh lại trang.
