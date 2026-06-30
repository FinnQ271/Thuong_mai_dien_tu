import { useCart } from '../context/CartContext';
import type { CartItem } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface CartNewProps {
  navigate: (page: string) => void;
}

function CartNew({ navigate }: CartNewProps) {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getCartSubtotal,
    getCartDiscount,
    getCartShipping,
    getCartTotal,
    getTotalItems
  } = useCart();

  const { currentUser } = useAuth();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Mã giảm giá không hợp lệ');
      setPromoApplied(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-section">
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
          <span className="text-muted">Giỏ hàng</span>
        </nav>

        <div className="container mt-5 py-5 text-center">
          <i className="fas fa-shopping-cart fa-4x text-muted mb-4"></i>
          <h3 className="text-muted">Giỏ hàng của bạn đang trống</h3>
          <p className="text-muted mb-4">Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng</p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => navigate('shop')}
          >
            <i className="fas fa-shopping-bag me-2"></i>
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-section">
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
        <span className="text-muted">Giỏ hàng</span>
      </nav>

      <div className="container mt-4">
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="fas fa-shopping-cart me-2"></i>
                    Giỏ hàng ({getTotalItems()} sản phẩm)
                  </h5>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={clearCart}
                  >
                    <i className="fas fa-trash me-1"></i>
                    Xóa tất cả
                  </button>
                </div>
              </div>
              <div className="card-body">
                {cartItems.map((item: CartItem) => (
                  <div key={item.product.id} className="cart-item mb-3 pb-3 border-bottom">
                    <div className="row align-items-center">
                      {/* Product Info */}
                      <div className="col-md-5 mb-3 mb-md-0">
                        <div className="d-flex align-items-center">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="rounded me-3"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                          <div>
                            <h6 className="mb-1">
                              <a href="#" className="text-decoration-none text-dark">
                                {item.product.name}
                              </a>
                            </h6>
                            <small className="text-muted">
                              Mã: #PRD{item.product.id.toString().padStart(5, '0')}
                            </small>
                            {item.selectedColor && (
                              <div className="small text-muted">
                                Màu: {item.selectedColor}
                              </div>
                            )}
                            {item.selectedSize && (
                              <div className="small text-muted">
                                Kích thước: {item.selectedSize}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-md-2 mb-3 mb-md-0">
                        <div className="text-primary fw-bold">
                          {formatPrice(item.product.price)}
                        </div>
                        {item.product.originalPrice && item.product.originalPrice !== item.product.price && (
                          <small className="text-muted text-decoration-line-through">
                            {formatPrice(item.product.originalPrice)}
                          </small>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="col-md-3 mb-3 mb-md-0">
                        <div className="qty-container d-inline-flex align-items-center">
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <input 
                            type="number" 
                            className="form-control form-control-sm text-center mx-2"
                            style={{ width: '60px' }}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                            min="1"
                          />
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="col-md-2">
                        <div className="text-primary fw-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <button 
                          className="btn btn-sm btn-link text-danger p-0 mt-1"
                          onClick={() => handleRemoveItem(item.product.id)}
                        >
                          <i className="fas fa-trash me-1"></i>
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '100px' }}>
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">
                  <i className="fas fa-receipt me-2"></i>
                  Tổng đơn hàng
                </h5>
              </div>
              <div className="card-body">
                {/* Promo Code */}
                <form onSubmit={handleApplyPromo} className="mb-4">
                  <label className="form-label">Mã giảm giá</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Nhập mã giảm giá"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={promoApplied || !promoCode}
                    >
                      Áp dụng
                    </button>
                  </div>
                  {promoApplied && (
                    <small className="text-success">
                      <i className="fas fa-check me-1"></i>
                      Mã giảm giá đã được áp dụng!
                    </small>
                  )}
                  {promoError && (
                    <small className="text-danger">
                      <i className="fas fa-exclamation-triangle me-1"></i>
                      {promoError}
                    </small>
                  )}
                </form>

                {/* Summary */}
                <ul className="list-unstyled">
                  <li className="d-flex justify-content-between py-2 border-bottom">
                    <span>Tạm tính</span>
                    <span className="fw-bold">{formatPrice(getCartSubtotal())}</span>
                  </li>
                  <li className="d-flex justify-content-between py-2 border-bottom">
                    <span>Giảm giá</span>
                    <span className="text-danger">
                      -{formatPrice(getCartDiscount())}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between py-2 border-bottom">
                    <span>Phí vận chuyển</span>
                    <span className="fw-bold">
                      {getCartShipping() === 0 ? (
                        <span className="text-success">Miễn phí</span>
                      ) : (
                        formatPrice(getCartShipping())
                      )}
                    </span>
                  </li>
                  {promoApplied && (
                    <li className="d-flex justify-content-between py-2 border-bottom">
                      <span>Mã SAVE10</span>
                      <span className="text-danger">
                        -{formatPrice(getCartTotal() * 0.1)}
                      </span>
                    </li>
                  )}
                </ul>

                {/* Total */}
                <div className="d-flex justify-content-between py-3 mt-3 border-top">
                  <h5 className="mb-0">Tổng cộng</h5>
                  <h5 className="mb-0 text-primary">
                    {promoApplied 
                      ? formatPrice(getCartTotal() * 0.9) 
                      : formatPrice(getCartTotal())
                    }
                  </h5>
                </div>

                {/* Checkout Button */}
                <button 
                  className="btn btn-primary btn-lg w-100 mb-3"
                  onClick={() => {
                    if (!currentUser) {
                      localStorage.setItem('redirect_to_checkout', 'true');
                      alert('Vui lòng đăng nhập để tiến hành thanh toán!');
                      navigate('login');
                    } else {
                      navigate('checkout');
                    }
                  }}
                >
                  <i className="fas fa-credit-card me-2"></i>
                  Tiến hành thanh toán
                </button>

                {/* Continue Shopping */}
                <button 
                  className="btn btn-outline-secondary w-100"
                  onClick={() => navigate('shop')}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Tiếp tục mua sắm
                </button>

                {/* Shipping Info */}
                <div className="mt-4 p-3 bg-light rounded">
                  <small className="text-muted">
                    <i className="fas fa-truck me-2"></i>
                    Miễn phí vận chuyển cho đơn hàng từ 500.000₫
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartNew;