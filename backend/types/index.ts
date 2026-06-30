export type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type JwtUser = {
  userId: string;
  email: string;
  fullName: string;
  roleCode: string;
  roleName: string;
  roleLevel: number;
};

export type ProductApiItem = {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  category: string;
  categorySlug?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stockQuantity: number;
  discount?: number;
  description: string;
  colors?: string[];
  sizes?: string[];
  isFeatured?: boolean;
  isActive?: boolean;
};

export type OrderInputItem = {
  productId?: number;
  productName: string;
  productImage?: string;
  selectedColor?: string;
  selectedSize?: string;
  price: number;
  quantity: number;
};
