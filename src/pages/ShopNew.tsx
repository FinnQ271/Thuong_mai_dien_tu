import { useState, useMemo, useEffect } from 'react';
import { categories, formatPrice, type Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import { API_BASE_URL } from '../config';


interface ShopNewProps {
  navigate: (page: string, params?: { productId?: number }) => void;
}

function ShopNew({ navigate }: ShopNewProps) {

  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products?active=true&limit=100`);
        const data = await res.json();
        if (data.success) {
          setApiProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...apiProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => {
        const categoryMap: Record<string, string> = {
          'tai-nghe': 'Tai nghe',
          'dong-ho': 'Đồng hồ',
          'loa': 'Loa',
          'phu-kien': 'Phụ kiện',
          'camera': 'Camera',
          'phu-kien-may-tinh': 'Phụ kiện máy tính',
          'man-hinh': 'Màn hình',
          'do-dung-van-phong': 'Đồ dùng văn phòng',
        };
        return product.category === categoryMap[selectedCategory] || product.categorySlug === selectedCategory;
      });
    }

    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [apiProducts, selectedCategory, sortBy, priceRange, searchQuery]);

  const handleViewDetails = (product: Product) => {
    navigate('shop-single', { productId: product.id });
  };


  return (
    <div className="shop-section">
      {/* Breadcrumbs */}
      <nav className="container mt-4 d-flex flex-wrap align-items-center gap-2 px-3">
        <div className="d-flex align-items-center gap-2">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="text-primary">
            <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 576 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
              <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
            </svg>
          </a>
          <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-muted" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted">Cửa hàng</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4">
        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-lg-3 col-md-4 mb-4">
            <aside className="filter-sidebar">
              {/* Search */}
              <div className="mb-4 filter-box-item">
                <p className="mb-3 filter-title">Tìm kiếm</p>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Tìm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div className="mb-4 filter-box-item">
                <p className="mb-3 filter-title">Danh mục</p>
                <ul className="list-unstyled">
                  {categories.map(category => (
                    <li key={category.id} className="mb-2">
                      <label className="d-flex justify-content-between align-items-center cursor-pointer">
                        <input 
                          type="radio" 
                          name="category" 
                          className="me-2"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                        />
                        <span>{category.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="mb-4 filter-box-item">
                <p className="mb-3 filter-title">Khoảng giá</p>
                <div className="px-2">
                  <input 
                    type="range" 
                    className="form-range" 
                    min="0" 
                    max="10000000" 
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  />
                  <div className="d-flex justify-content-between mt-2">
                    <span className="small text-muted">0₫</span>
                    <span className="small text-primary fw-bold">
                      {formatPrice(priceRange[1])}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mb-4 filter-box-item bg-light p-3 rounded">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Sản phẩm:</span>
                  <span className="fw-bold">{filteredProducts.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Đang chọn:</span>
                  <span className="fw-bold">{categories.find(c => c.id === selectedCategory)?.name}</span>
                </div>
              </div>
            </aside>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9 col-md-8">
            {/* Toolbar */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 pb-3 border-bottom">
              <div className="mb-3 mb-md-0">
                <p className="mb-0 text-muted">
                  Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm
                </p>
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="sortSelect" className="me-2 mb-0 text-muted">Sắp xếp:</label>
                <select 
                  className="form-select w-auto" 
                  id="sortSelect"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Phổ biến nhất</option>
                  <option value="price-low">Giá: Thấp đến cao</option>
                  <option value="price-high">Giá: Cao đến thấp</option>
                  <option value="newest">Mới nhất</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Đang tải...</span>
                </div>
                <p className="mt-2 text-muted">Đang tải danh sách sản phẩm...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-2 row-cols-md-2">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 className="text-muted">Không tìm thấy sản phẩm nào</h4>
                <p className="text-muted">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}

            {/* Pagination (static for demo) */}
            <div className="row mb-5 mt-5">
              <div className="col-lg-12">
                <div className="d-flex justify-content-center">
                  <nav aria-label="Page navigation">
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <a className="page-link" href="#" onClick={(e) => e.preventDefault()}>
                          <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </a>
                      </li>
                      <li className="page-item active"><a className="page-link" href="#" onClick={(e) => e.preventDefault()}>1</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(e) => e.preventDefault()}>2</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(e) => e.preventDefault()}>3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={(e) => e.preventDefault()}>
                          <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopNew;
