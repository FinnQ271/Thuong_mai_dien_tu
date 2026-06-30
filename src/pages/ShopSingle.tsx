import { useState, useEffect } from 'react';
import { formatPrice, type Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ShopSingleProps {
  productId?: number;
  navigate: (page: string, params?: { productId?: number }) => void;
}

function ShopSingle({ productId, navigate }: ShopSingleProps) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return;
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/products/${productId}`);
        const data = await res.json();
        if (data.success && data.data) {
          const foundProduct = data.data;
          setProduct(foundProduct);
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
          }
          if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0]);
          }

          // Fetch related products
          if (foundProduct.categorySlug) {
            const relatedRes = await fetch(`http://localhost:3000/api/products?category=${foundProduct.categorySlug}&limit=5`);
            const relatedData = await relatedRes.json();
            if (relatedData.success) {
              setRelatedProducts(relatedData.data);
            }
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product || !product.inStock) return;

    setIsAdding(true);
    // Đảm bảo truyền đúng cấu trúc mà CartContext yêu cầu
    // Nếu CartContext của bạn chỉ nhận product, hãy kiểm tra lại hàm addToCart trong CartContext.tsx
    if (typeof addToCart === 'function') {
      addToCart(product, quantity, selectedColor, selectedSize);
    }
    
    setShowSuccess(true);
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    if (!product || !product.inStock) return;
    if (typeof addToCart === 'function') {
      addToCart(product, quantity, selectedColor, selectedSize);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`star-icon ${i <= rating ? 'text-warning' : 'text-muted'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-2 text-muted">Đang tải chi tiết sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h3>Sản phẩm không tồn tại</h3>
        <p className="text-muted">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <a href="#" className="btn btn-primary mt-3" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
          Quay lại
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="container mt-4 d-flex flex-wrap align-items-center gap-2 px-3">
        <div className="d-flex align-items-center gap-2">
          <a href="#" className="text-primary" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 576 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
              <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
            </svg>
          </a>
          <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-muted" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
        <div className="d-flex align-items-center gap-2">
          <a href="#" className="text-muted text-decoration-none" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>
            Cửa hàng
          </a>
          <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-muted" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-muted">{product.name}</span>
        </div>
      </nav>

      {/* Product Details */}
      <div className="product-details">
        <div className="container">
          <section className="mt-5">
            <div className="row">
              {/* Product Images */}
              <div className="col-12 col-lg-5 px-2 px-sm-2 px-md-2 px-lg-0">
                <div className="product-container">
                  <div className="main-image-container mb-3">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="img-fluid rounded"
                      style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                    />
                  </div>
                  {/* Thumbnail placeholders - using same image for demo */}
                  <div className="d-flex gap-2">
                    {[1, 2, 3, 4].map((_, idx) => (
                      <div 
                        key={idx}
                        className={`thumbnail ${idx === selectedImage ? 'active' : ''}`}
                        onClick={() => setSelectedImage(idx)}
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          cursor: 'pointer',
                          border: idx === selectedImage ? '2px solid #0d6efd' : '1px solid #dee2e6',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}
                      >
                        <img 
                          src={product.image} 
                          alt={`${product.name} ${idx + 1}`}
                          className="img-fluid"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="col-md-12 col-lg-7 px-2 px-sm-2 px-md-2 px-lg-0">
                <div className="col-lg-12 col-md-12 mb-4">
                  <div className="mb-2 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span>
                        {renderStars(product.rating)}
                      </span>
                      <small className="text-muted ms-2">({product.reviews} đánh giá)</small>
                    </div>
                    <span className={`badge p-2 text-white ${product.inStock ? 'badge-success' : 'badge-danger'}`}>
                      {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                  </div>
                  
                  <h1 className="h4 font-weight-semibold text-secondary mb-3">
                    {product.name}
                  </h1>
                  
                  <div className="my-2 d-flex align-items-center">
                    <span className="text-primary h4 font-weight-bold">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-muted ms-2">
                          <s>{formatPrice(product.originalPrice)}</s>
                        </span>
                        {product.discount && (
                          <span className="badge badge-danger px-2 ms-2">-{product.discount}%</span>
                        )}
                    </>
                    )}
                  </div>
                  
                  <div className="mb-3 border-bottom pb-3">
                    <p className="text-muted">
                      {product.description}
                    </p>
                  </div>

                  {/* Size Selection */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="my-3 size-section">
                      <span className="font-weight-bold text-secondary">Kích thước:</span>
                      <div className="size-custom-radios mt-2">
                        {product.sizes.map((size) => (
                          <div key={size} className="size-item">
                            <input 
                              type="radio" 
                              id={`size-${size}`} 
                              name="size" 
                              value={size}
                              checked={selectedSize === size}
                              onChange={() => setSelectedSize(size)}
                            />
                            <label htmlFor={`size-${size}`}>
                              <span>{size}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Selection */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="my-3 color-section">
                      <span className="font-weight-bold text-secondary">Màu sắc:</span>
                      <div className="custom-radios mt-2">
                        {product.colors.map((color) => (
                          <div key={color} className="color-item">
                            <input 
                              type="radio" 
                              id={`color-${color}`} 
                              name="color" 
                              value={color}
                              checked={selectedColor === color}
                              onChange={() => setSelectedColor(color)}
                            />
                            <label htmlFor={`color-${color}`}>
                              <span>{color}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity and Add to Cart */}
                  <div className="my-3">
                    <span className="font-weight-bold text-secondary">Số lượng:</span>
                    <div className="d-flex mt-2 align-items-center">
                      <div className="qty-container">
                        <button 
                          className="qty-btn-minus" 
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <i className="fas fa-minus" />
                        </button>
                        <input 
                          type="number" 
                          name="qty" 
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="input-qty input-cornered"
                          style={{ width: '60px', textAlign: 'center' }}
                        />
                        <button 
                          className="qty-btn-plus" 
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <i className="fas fa-plus" />
                        </button>
                      </div>
                      <button 
                        className="btn btn-primary ms-3 py-2"
                        onClick={handleAddToCart}
                        disabled={!product.inStock || isAdding}
                      >
                        {isAdding ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Đang thêm...
                          </>
                        ) : showSuccess ? (
                          <>
                            <i className="fas fa-check me-2"></i>
                            Đã thêm!
                          </>
                        ) : (
                          <>
                            <i className="fa fa-shopping-cart me-2" />
                            Thêm vào giỏ
                          </>
                        )}
                      </button>
                      <button 
                        className="btn btn-danger ms-2 py-2"
                        onClick={handleBuyNow}
                        disabled={!product.inStock}
                      >
                        <i className="fa-solid fa-fire me-2" />
                        Mua ngay
                      </button>
                    </div>
                  </div>

                  <div className="my-3 border-bottom pb-3">
                    <a href="#" className="text-decoration-none" onClick={(e) => e.preventDefault()}>
                      <i className="far fa-heart me-2" />
                      Thêm vào yêu thích
                    </a>
                  </div>

                  <div className="my-3 d-flex align-items-center">
                    <span className="font-weight-bold text-secondary">Danh mục:</span>
                    <a href="#" className="text-primary ml-1 text-decoration-none">{product.category}</a>
                  </div>

                  <div className="my-3">
                    <span className="font-weight-bold text-secondary">Chia sẻ lên:</span>
                    <div className="mt-2 d-flex align-items-center">
                      <a href="#" className="btn btn-outline-primary me-2">
                        <i className="fab fa-facebook" />
                      </a>
                      <a href="#" className="btn btn-outline-dark me-2">
                        <i className="fab fa-twitter" />
                      </a>
                      <a href="#" className="btn btn-outline-success me-2">
                        <i className="fab fa-whatsapp" />
                      </a>
                      <a href="#" className="btn btn-outline-primary">
                        <i className="fab fa-pinterest" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Product Description Tab */}
          <section className="mt-5">
            <div className="product-detail-review">
              <div className="row">
                <div className="col-md-12">
                  <ul className="nav nav-pills" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a 
                        className="nav-link active" 
                        id="product-tab1" 
                        data-bs-toggle="tab" 
                        data-bs-target="#product-tab-panel-1" 
                        href="#product-tab-panel-1" 
                        role="tab" 
                        aria-controls="product-tab-pane" 
                        aria-selected="true"
                      >
                        Chi tiết sản phẩm
                      </a>
                    </li>
                    <li className="nav-item">
                      <a 
                        className="nav-link" 
                        id="product-tab2" 
                        data-bs-toggle="tab" 
                        data-bs-target="#product-tab-panel-2" 
                        href="#product-tab-panel-2" 
                        role="tab" 
                        aria-controls="product-tab-pane" 
                        aria-selected="true"
                      >
                        Thông tin thêm
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="product-tab-panel-1" role="tabpanel" aria-labelledby="product-tab" tabIndex={0}>
                      <div className="my-4">
                        <h5>Mô tả sản phẩm</h5>
                        <p className="text-muted">{product.description}</p>
                        <p className="text-muted">
                          Sản phẩm chính hãng, chất lượng cao với chế độ bảo hành uy tín. 
                          Giao hàng toàn quốc, thanh toán khi nhận hàng.
                        </p>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="product-tab-panel-2" role="tabpanel" aria-labelledby="product-tab" tabIndex={0}>
                      <div className="my-4">
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                            <table className="table table-striped">
                              <tbody>
                                <tr>
                                  <th>Mã sản phẩm</th>
                                  <td>SP-{product.id.toString().padStart(4, '0')}</td>
                                </tr>
                                <tr>
                                  <th>Danh mục</th>
                                  <td>{product.category}</td>
                                </tr>
                                <tr>
                                  <th>Đánh giá</th>
                                  <td>{product.rating} ★ ({product.reviews} đánh giá)</td>
                                </tr>
                                <tr>
                                  <th>Tình trạng</th>
                                  <td>{product.inStock ? 'Còn hàng' : 'Hết hàng'}</td>
                                </tr>
                                {product.discount && (
                                  <tr>
                                    <th>Giảm giá</th>
                                    <td>{product.discount}%</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Products */}
          <section className="my-5">
            <div className="related-product">
              <div className="mb-4 d-flex align-items-center justify-content-between pb-2">
                <h2 className="h4 font-weight-bold text-secondary position-relative pb-2 mb-0 section-title">
                  Sản phẩm liên quan
                </h2>
              </div>
              <div className="row">
                {relatedProducts
                  .filter(p => p.id !== product.id)
                  .slice(0, 4)
                  .map(relatedProduct => (
                    <div key={relatedProduct.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                      <div className="product-card h-100">
                        {!relatedProduct.inStock && (
                          <span className="badge-new bg-danger">Hết hàng</span>
                        )}
                        {relatedProduct.discount && relatedProduct.inStock && (
                          <span className="badge-new bg-success">-{relatedProduct.discount}%</span>
                        )}
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('shop-single', { productId: relatedProduct.id }); }}>
                          <img 
                            src={relatedProduct.image} 
                            className="img-fluid mb-2 product-img" 
                            alt={relatedProduct.name}
                            style={{ objectFit: 'cover', height: '180px', width: '100%', borderRadius: '8px' }}
                          />
                        </a>
                        <h6>
                          <a 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); navigate('shop-single', { productId: relatedProduct.id }); }}
                            className="text-decoration-none text-dark"
                          >
                            {relatedProduct.name}
                          </a>
                        </h6>
                        <div className="rating">
                          <span className="d-flex align-items-center">
                            {renderStars(relatedProduct.rating)}
                          </span>
                          <span className="text-muted small ms-2">({relatedProduct.reviews})</span>
                        </div>
                        <div className="price-section">
                          <span className="price text-primary fw-bold">
                            {formatPrice(relatedProduct.price)}
                          </span>
                        </div>
                        <button 
                          className="btn btn-primary cart-btn w-100"
                          onClick={() => addToCart && addToCart(relatedProduct)}
                          disabled={!relatedProduct.inStock}
                        >
                          <i className="fas fa-shopping-cart me-2" />
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ShopSingle;