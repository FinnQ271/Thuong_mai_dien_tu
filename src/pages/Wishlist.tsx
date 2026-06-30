import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

interface WishlistProps {
  onViewDetails?: (product: any) => void;
}

function Wishlist({ onViewDetails }: WishlistProps) {
  const { wishlistItems } = useWishlist();

  return (
    <>
      {/* Breadcrumb */}
      <nav className="container mt-4 d-flex align-items-center gap-2 px-3">
        <a href="#" className="text-decoration-none text-muted">
          Trang chủ
        </a>

        <span>/</span>

        <span className="fw-bold">Wishlist</span>
      </nav>

      {/* Wishlist */}
      <section className="wishlist-section py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">
              Sản phẩm yêu thích ({wishlistItems.length})
            </h3>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-5">
              <i
                className="far fa-heart text-muted mb-3"
                style={{ fontSize: "60px" }}
              ></i>

              <h5>Chưa có sản phẩm yêu thích</h5>

              <p className="text-muted">
                Hãy nhấn vào biểu tượng trái tim để thêm sản phẩm.
              </p>
            </div>
          ) : (
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
              {wishlistItems.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Wishlist;
