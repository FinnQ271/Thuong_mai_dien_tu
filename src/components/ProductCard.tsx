import { useState } from 'react';
import type { Product } from '../data/products';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) return;

    setIsAdding(true);
    addToCart(product);
    
    // Show success feedback
    setShowSuccess(true);
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(false);
    }, 1500);
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
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

  return (
    <div className="col mb-3">
      <div className="product-card">
        {!product.inStock && (
          <span className="badge-new bg-danger">Hết hàng</span>
        )}
        {product.discount && product.inStock && (
          <span className="badge-new bg-success">-{product.discount}%</span>
        )}
        
        <span className="wishlist-icon" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }} style={{ cursor: 'pointer' }}>
          <i className={isInWishlist(product.id) ? 'fas fa-heart text-danger' : 'far fa-heart'} />
        </span>
        
        <a href="#" onClick={(e) => { e.preventDefault(); handleViewDetails(); }}>
          <img 
            src={product.image} 
            className="img-fluid mb-2 product-img" 
            alt={product.name}
            style={{ 
              objectFit: 'cover', 
              height: '200px', 
              width: '100%',
              borderRadius: '8px'
            }}
          />
        </a>
        
        <h6>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); handleViewDetails(); }}
            className="text-decoration-none text-dark"
            title={product.name}
          >
            {product.name}
          </a>
        </h6>
        
        <div className="rating">
          <span className="d-flex align-items-center">
            {renderStars(product.rating)}
          </span>
          <span className="text-muted small ms-2">({product.reviews})</span>
        </div>
        
        <div className="price-section">
          {product.originalPrice && (
            <span className="old-price text-decoration-line-through text-muted me-2">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="price text-primary fw-bold">
            {formatPrice(product.price)}
          </span>
        </div>
        
        <button 
          className={`btn cart-btn ${product.inStock ? 'btn-primary' : 'btn-secondary'}`}
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
              <i className="fas fa-shopping-cart me-2"></i>
              Thêm vào giỏ
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;