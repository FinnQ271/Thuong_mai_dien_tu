// Product interface
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categorySlug?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
  description: string;
  colors?: string[];
  sizes?: string[];
}

// Mockup product data
export const products: Product[] = [
  {
    id: 1,
    name: "Tai nghe Bluetooth Premium",
    price: 1299000,
    originalPrice: 1599000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Tai nghe",
    rating: 5,
    reviews: 128,
    inStock: true,
    discount: 19,
    description: "Tai nghe Bluetooth chất lượng cao với âm thanh sống động và thiết kế hiện đại.",
    colors: ["Đen", "Trắng", "Xanh"],
  },
  {
    id: 2,
    name: "Đồng hồ thông minh Pro",
    price: 4990000,
    originalPrice: 5990000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Đồng hồ",
    rating: 4,
    reviews: 89,
    inStock: true,
    discount: 17,
    description: "Đồng hồ thông minh với nhiều tính năng theo dõi sức khỏe và thể thao.",
    colors: ["Đen", "Bạc", "Vàng hồng"],
    sizes: ["40mm", "44mm"],
  },
  {
    id: 3,
    name: "Loa Bluetooth Mini",
    price: 890000,
    originalPrice: 1190000,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Loa",
    rating: 5,
    reviews: 256,
    inStock: true,
    discount: 25,
    description: "Loa Bluetooth nhỏ gọn với âm thanh mạnh mẽ và pin lâu.",
    colors: ["Đen", "Xanh dương", "Đỏ"],
  },
  {
    id: 4,
    name: "Ốp lưng điện thoại cao cấp",
    price: 299000,
    originalPrice: 399000,
    image: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=400&h=400&fit=crop",
    category: "Phụ kiện",
    rating: 4,
    reviews: 342,
    inStock: true,
    discount: 25,
    description: "Ốp lưng bảo vệ điện thoại với thiết kế sang trọng và chất liệu cao cấp.",
    colors: ["Trong suốt", "Đen", "Xanh navy"],
  },
  {
    id: 5,
    name: "Sạc dự phòng 20000mAh",
    price: 790000,
    originalPrice: 990000,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    category: "Phụ kiện",
    rating: 5,
    reviews: 189,
    inStock: true,
    discount: 20,
    description: "Sạc dự phòng dung lượng cao với nhiều cổng sạc và sạc nhanh.",
    colors: ["Đen", "Trắng"],
  },
  {
    id: 6,
    name: "Camera hành trình 4K",
    price: 2490000,
    originalPrice: 2990000,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop",
    category: "Camera",
    rating: 4,
    reviews: 67,
    inStock: false,
    discount: 17,
    description: "Camera hành trình chất lượng 4K với góc quay rộng và nhiều tính năng an toàn.",
    colors: ["Đen"],
  },
  {
    id: 7,
    name: "Bàn phím cơ Gaming",
    price: 1890000,
    originalPrice: 2290000,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
    category: "Phụ kiện máy tính",
    rating: 5,
    reviews: 234,
    inStock: true,
    discount: 17,
    description: "Bàn phím cơ với switch chất lượng cao, đèn LED RGB và thiết kế ergonomic.",
    colors: ["Đen", "Trắng"],
  },
  {
    id: 8,
    name: "Chuột không dây Gaming",
    price: 890000,
    originalPrice: 1090000,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    category: "Phụ kiện máy tính",
    rating: 4,
    reviews: 156,
    inStock: true,
    discount: 18,
    description: "Chuột gaming không dây với độ chính xác cao và thiết kế thoải mái.",
    colors: ["Đen", "Trắng"],
  },
  {
    id: 9,
    name: "Màn hình máy tính 27\"",
    price: 6990000,
    originalPrice: 7990000,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    category: "Màn hình",
    rating: 5,
    reviews: 89,
    inStock: true,
    discount: 13,
    description: "Màn hình 27 inch với độ phân giải 4K, tần số quét 144Hz và màu sắc chính xác.",
    colors: ["Đen"],
    sizes: ["27 inch"],
  },
  {
    id: 10,
    name: "Tai nghe True Wireless",
    price: 2190000,
    originalPrice: 2590000,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    category: "Tai nghe",
    rating: 4,
    reviews: 298,
    inStock: true,
    discount: 15,
    description: "Tai nghe true wireless với chất âm tuyệt vời và hộp sạc nhỏ gọn.",
    colors: ["Đen", "Trắng", "Xanh mint"],
  },
  {
    id: 11,
    name: "Webcam HD 1080p",
    price: 1290000,
    originalPrice: 1590000,
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop",
    category: "Phụ kiện máy tính",
    rating: 4,
    reviews: 145,
    inStock: true,
    discount: 19,
    description: "Webcam chất lượng Full HD với micro tích hợp và tự động lấy nét.",
    colors: ["Đen"],
  },
  {
    id: 12,
    name: "Đèn bàn LED thông minh",
    price: 690000,
    originalPrice: 890000,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "Đồ dùng văn phòng",
    rating: 5,
    reviews: 167,
    inStock: true,
    discount: 22,
    description: "Đèn bàn LED với nhiều chế độ ánh sáng và có thể điều chỉnh qua app.",
    colors: ["Trắng", "Đen"],
  },
];

// Categories
export const categories = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'tai-nghe', name: 'Tai nghe' },
  { id: 'dong-ho', name: 'Đồng hồ' },
  { id: 'loa', name: 'Loa' },
  { id: 'phu-kien', name: 'Phụ kiện' },
  { id: 'camera', name: 'Camera' },
  { id: 'phu-kien-may-tinh', name: 'Phụ kiện máy tính' },
  { id: 'man-hinh', name: 'Màn hình' },
  { id: 'do-dung-van-phong', name: 'Đồ dùng văn phòng' },
];

// Format price to Vietnamese currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};