import { useEffect } from "react"

type JQueryLike = {
  (selector: unknown): any
  fn?: { owlCarousel?: unknown; niceSelect?: unknown }
}

const getJQuery = (): JQueryLike | undefined => {
  const win = window as unknown as { $?: JQueryLike; jQuery?: JQueryLike }
  return win.jQuery || win.$
}

const resetOwl = ($: JQueryLike, selector: string) => {
  $(selector).each(function (this: HTMLElement) {
    const item = $(this)

    if (item.hasClass("owl-loaded")) {
      item.trigger("destroy.owl.carousel")
      item.removeClass("owl-loaded owl-hidden owl-drag")
      item.find(".owl-stage-outer").children().unwrap()
      item.find(".owl-stage, .owl-item, .owl-nav, .owl-dots").remove()
      item.removeData("owl.carousel")
    }
  })
}

const initOwl = ($: JQueryLike, selector: string, options: Record<string, unknown>) => {
  resetOwl($, selector)
  $(selector).owlCarousel(options)
}
type HomeProps = {
  navigate: (page: string, params?: { productId?: number }) => void
}

function Home({ navigate }: HomeProps) {
    void navigate

    useEffect(() => {
      const $ = getJQuery()

      if (!$ || !$.fn?.owlCarousel) {
        return
      }

      const timer = window.setTimeout(() => {
        initOwl($, ".banner-slider", {
          responsiveClass: true,
          loop: true,
          margin: 0,
          autoplay: true,
          dots: true,
          nav: false,
          responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
        })

        initOwl($, ".category-slider", {
          responsiveClass: true,
          loop: true,
          margin: 50,
          autoplay: true,
          dots: false,
          nav: false,
          responsive: { 0: { items: 3 }, 600: { items: 4 }, 992: { items: 7 }, 1200: { items: 8 } },
        })

        initOwl($, ".blog-slider", {
          responsiveClass: true,
          loop: false,
          margin: 40,
          autoplay: false,
          responsive: {
            0: { nav: false, dots: true, items: 1 },
            600: { nav: false, dots: false, items: 2 },
            1000: { nav: true, dots: false, items: 3 },
          },
        })

        initOwl($, ".new-arrivals-slider", {
          loop: true,
          margin: 15,
          nav: true,
          dots: false,
          responsive: { 0: { items: 1 }, 576: { items: 2 }, 992: { items: 3 } },
        })

        initOwl($, ".deal-slider", {
          loop: true,
          margin: 15,
          nav: true,
          dots: false,
          responsive: { 0: { items: 1 }, 576: { items: 1 }, 992: { items: 1 } },
        })

        initOwl($, ".product-slider", {
          loop: true,
          margin: 15,
          nav: false,
          dots: false,
          responsive: { 0: { items: 1 }, 576: { items: 2 }, 992: { items: 3 } },
        })

        initOwl($, ".product-recommended-slider", {
          loop: true,
          margin: 15,
          nav: true,
          dots: false,
          responsive: { 0: { items: 1 }, 576: { items: 2 }, 992: { items: 4 } },
        })
      }, 0)

      return () => {
        window.clearTimeout(timer)
        resetOwl($, ".banner-slider, .category-slider, .blog-slider, .new-arrivals-slider, .deal-slider, .product-slider, .product-recommended-slider")
      }
    }, [])
    return(
      <>
<div>

  {/* Banner Slider */}
  <div className="banner py-3">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12 col-12 mb-3 mb-lg-0">
          <div className="owl-carousel owl-theme banner-slider">
            <div className="position-relative">
              <img src="./assets/images/banner/1.png" alt="eCommerce Template" />
              <div className="banner-content position-absolute align-items-center">
                <div className="banner-title-wrap wow animate__animated animate__fadeInUp" data-wow-delay="0.2s">
                  <h3 className="banner-title"> New Arrival</h3>
                </div>
                <div className="banner-content-text">
                  <p className="text-white wow animate__animated animate__fadeInUp m-0" data-wow-delay="0.4s">APPLE WATCH</p>
                  <p className="text-white wow animate__animated animate__fadeInUp m-0 mt-2" data-wow-delay="0.6s">UPTO 60% OFF</p>
                </div>
                <div className="banner-button mt-3 wow animate__animated animate__fadeInUp" data-wow-delay="0.9s">
                  <a href="shop-single.html" className="btn btn-primary rounded-0 text-white text-uppercase ">Buy Now</a>
                </div>
              </div>
            </div>
            <div className=" position-relative ">
              <img src="./assets/images/banner/4.webp" alt="eCommerce Template" />
              <div className="banner-content position-absolute align-items-center">
                <div className="banner-title-wrap wow animate__animated animate__fadeInUp" data-wow-delay="0.2s">
                  <h3 className="banner-title">New Arrival</h3>
                </div>
                <div className="banner-content-text">
                  <p className="text-white wow animate__animated animate__fadeInUp m-0" data-wow-delay="0.4s">iPhone Pro Max</p>
                  <p className="text-white wow animate__animated animate__fadeInUp m-0 mt-2" data-wow-delay="0.6s">UPTO 65% OFF</p>
                </div>
                <div className="banner-button mt-3 wow animate__animated animate__fadeInUp" data-wow-delay="0.9s">
                  <a href="shop-single.html" className="btn btn-primary rounded-0 text-white text-uppercase">Buy Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12 col-12 d-flex flex-column justify-content-between">
          <div className="mb-2 shine position-relative">
            <img src="./assets/images/banner/5.png" className=" w-100" alt="eCommerce Template" />
            <div className="banner-content position-absolute align-items-center">
              <div className="banner-title-wrap">
                <h3 className="banner-title">Lady Bags</h3>
              </div>
              <div className="banner-content-text">
                <p>
                  <span className="text-white d-block mt-2">Sale Extended!</span>
                  <span className="d-block mt-0 mt-lg-2">
                    <span className="text-white">upto</span>
                    <span className="text-warning"><strong>50%</strong></span>
                    <span className="text-white">Off</span>
                  </span>
                </p>
              </div>
              <div className="banner-button">
                <a href="shop.html" className="btn btn-primary">Shop Now</a>
              </div>
            </div>
          </div>
          <div className="shine position-relative">
            <img src="./assets/images/banner/6.png" className=" w-100" alt="eCommerce Template" />
            <div className="banner-content position-absolute align-items-center">
              <div className="banner-title-wrap">
                <h3 className="banner-title">Lady Bags</h3>
              </div>
              <div className="banner-content-text">
                <p>
                  <span className="text-secondary d-block mt-2">Sale Extended!</span>
                  <span className="d-block mt-0 mt-lg-2">
                    <span className="text-secondary">upto</span>
                    <span className="text-warning"><strong>50%</strong></span>
                    <span className="text-secondary">Off</span>
                  </span>
                </p>
              </div>
              <div className="banner-button">
                <a href="shop.html" className="btn btn-primary">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Banner Slider */}
  <div className="feature-section mt-60">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="white-bg border px-4 py-3">
            <div className="row">
              <div className="mb-20 col-12 col-sm-12 col-md-6 col-lg-3">
                <div className="feature-item">
                  <div className="feature-icon">
                    <img src="./assets/images/icon/delivery-truck.png" className="w-100" alt="truck Icon" />
                  </div>
                  <div className="feature-info pt-3 ps-2">
                    <h4>Free Shipping</h4>
                    <p>On orders over&nbsp;<strong>$50.</strong></p>
                  </div>
                </div>
              </div>
              <div className="mb-20 col-12 col-sm-12 col-md-6 col-lg-3">
                <div className="feature-item">
                  <div className="feature-icon">
                    <img src="./assets/images/icon/loan.png" className="w-100" alt="truck Icon" />
                  </div>
                  <div className="feature-info pt-3 ps-2">
                    <h4>Money Back</h4>
                    <p>Money back in 7 days.</p>
                  </div>
                </div>
              </div>
              <div className="mb-20 col-12 col-sm-12 col-md-6 col-lg-3">
                <div className="feature-item">
                  <div className="feature-icon">
                    <img src="./assets/images/icon/credit-card.png" className="w-100" alt="truck Icon" />
                  </div>
                  <div className="feature-info pt-3 ps-2">
                    <h4>Secure Checkout</h4>
                    <p>100% Payment Secure.</p>
                  </div>
                </div>
              </div>
              <div className="mb-20 col-12 col-sm-12 col-md-6 col-lg-3">
                <div className="feature-item">
                  <div className="feature-icon">
                    <img src="./assets/images/icon/customer-service.png" className="w-100" alt="truck Icon" />
                  </div>
                  <div className="feature-info pt-3 ps-2">
                    <h4>Online Support</h4>
                    <p>Ensure the product quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Categories Section */}
  <div className="category-list mt-60">
    <div className="container">
      <div className="owl-carousel category-slider">
        <div className="item">
          <a href="shop.html">
            <img src="./assets/images/category/1.png" className="img-fluid" alt="eCommerce Template" />
            <div className="category-title d-flex justify-content-center align-items-center">
              <p className="text-nowrap mt-2 fw-normal text-black">Mobile</p>
            </div>
          </a>
        </div>
        <div className="item">
          <a href="shop.html">
            <img src="./assets/images/category/2.png" className="img-fluid" alt="eCommerce Template" />
            <div className="category-title d-flex justify-content-center align-items-center">
              <p className="text-nowrap mt-2 fw-normal text-black">Mobile</p>
            </div>
          </a>
        </div>
        <div className="item">
          <a href="shop.html">
            <img src="./assets/images/category/3.png" className="img-fluid" alt="eCommerce Template" />
            <div className="category-title d-flex justify-content-center align-items-center">
              <p className="text-nowrap mt-2 fw-normal text-black">Mobile</p>
            </div>
          </a>
        </div>
        <div className="item">
          <a href="shop.html">
            <img src="./assets/images/category/4.png" className="img-fluid" alt="eCommerce Template" />
            <div className="category-title d-flex justify-content-center align-items-center">
              <p className="text-nowrap mt-2 fw-normal text-black">Mobile</p>
            </div>
          </a>
        </div>
        <div className="item">
          <a href="shop.html">
            <img src="./assets/images/category/5.png" className="img-fluid" alt="eCommerce Template" />
            <div className="category-title d-flex justify-content-center align-items-center">
              <p className="text-nowrap mt-2 fw-normal text-black">Mobile</p>
            </div>
          </a>
        </div>
        <div className="item">
          <a href="shop.html">
            <img src="./assets/images/category/6.png" className="img-fluid" alt="eCommerce Template" />
            <div className="category-title d-flex justify-content-center align-items-center">
              <p className="text-nowrap mt-2 fw-normal text-black">Mobile</p>
            </div>
          </a>
        </div>
        <div className="item">
          <a href="shop.html">
            <img src="./assets/images/category/7.png" className="img-fluid" alt="eCommerce Template" />
            <div className="category-title d-flex justify-content-center align-items-center">
              <p className="text-nowrap mt-2 fw-normal text-black">Mobile</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  {/* End Categories Section */}
  <div className="container mt-60">
    <div className="row">
      {/* Deals Of The Day */}
      <div className="col-12 col-md-12 col-lg-6 mb-3 mb-lg-0">
        <h5 className="fw-bold fs-4 mb-4">Deals Of The Days</h5>
        <div className="owl-carousel owl-theme deal-slider">
          <div className="deal-card">
            <span className="badge-new">New Product</span>
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <div className="row g-3">
              <div className="col-md-5">
                <a href="shop-single.html">
                  <img src="assets/images/product/4.png" className="img-fluid product-img" alt="product" />
                </a>
              </div>
              <div className="col-md-7">
                <h6><a href="shop-single.html">Sumsung 80 cm (32 inch) HD Ready LED Smart Google TV</a></h6>
                <div className="rating mb-2">
                  <span className="d-flex align-items-center">
                    <span className="star-icon text-warning">★</span>
                    <span className="star-icon text-warning">★</span>
                    <span className="star-icon text-warning">★</span>
                    <span className="star-icon text-warning">★</span>
                    <span className="star-icon text-warning">★</span>
                  </span>
                </div>
                <div className="mb-2">
                  <span className="old-price">$30.00</span>
                  <span className="price">$28.50</span>
                  <span className="discount">5%</span>
                </div>
                <button className="btn btn-primary w-100 my-3">Add to cart</button>
                <p className="mt-2 small text-muted">Availability: 900 In Stock</p>
                {/* Countdown */}
                <div className="countdown" id="deal-countdown" data-second={95620}>
                  <div><strong id="days">0</strong><span>Days</span></div>
                  <div><strong id="hours">0</strong><span>Hours</span></div>
                  <div><strong id="minutes">0</strong><span>Mins</span></div>
                  <div><strong id="seconds">0</strong><span>Secs</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="deal-card">
            <span className="badge-new bg-danger">Out of stock</span>
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <div className="row g-3">
              <div className="col-md-5">
                <a href="shop-single.html">
                  <img src="assets/images/product/5.png" className="img-fluid product-img" alt="product" />
                </a>
              </div>
              <div className="col-md-7">
                <h6><a href="shop-single.html">boAt Rockerz 425 w/ 25 hrs Playtime,40 mm Drivers, BEAST
                    Mode</a></h6>
                <div className="rating mb-2">
                  <span className="d-flex align-items-center">
                    <span className="star-icon text-warning">★</span>
                    <span className="star-icon text-warning">★</span>
                    <span className="star-icon text-warning">★</span>
                    <span className="star-icon text-warning">★</span>
                    <span className="star-icon text-warning">★</span>
                  </span>
                </div>
                <div className="mb-2">
                  <span className="old-price">$30.00</span>
                  <span className="price">$28.50</span>
                  <span className="discount">5%</span>
                </div>
                <button className="btn btn-primary w-100 my-3">Add to cart</button>
                <p className="mt-2 small text-muted">Availability: 900 In Stock</p>
                {/* Countdown */}
                <div className="countdown" id="deal-countdown" data-second={105620}>
                  <div><strong id="days">0</strong><span>Days</span></div>
                  <div><strong id="hours">0</strong><span>Hours</span></div>
                  <div><strong id="minutes">0</strong><span>Mins</span></div>
                  <div><strong id="seconds">0</strong><span>Secs</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* New Arrivals */}
      <div className="col-12 col-md-12 col-lg-6">
        <h5 className="fw-bold fs-4 mb-4">New Arrivals</h5>
        <div className="owl-carousel owl-theme new-arrivals-slider">
          {/* Product Item */}
          <div className="product-card">
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/1.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Lenovo Vibe S1 Lite</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="old-price">$20.00</span>
              <span className="price">$18.00</span>
              <span className="discount">-10%</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <span className="badge-new bg-danger">Out of stock</span>
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/2.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Bjorn Tee SS Jack &amp; Jones</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="old-price">$10.00</span>
              <span className="price">$9.20</span>
              <span className="discount">-8%</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/7.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Afteroom Dining Chair</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="price">$11.90</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/3.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Afteroom Dining Chair</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="price">$11.90</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/5.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Afteroom Dining Chair</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="price">$11.90</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="container mt-60">
    <div className="row g-3">
      <div className="col-md-3">
        <div className="promo-box d-flex flex-column">
          <div>
            <h5>New Arrival</h5>
            <h3><a href="shop-single.html">iPhone Pro 14 Max</a></h3>
            <p className="mb-1">Starting from:</p>
            <p className="price">$429.99</p>
          </div>
          <a href="shop-single.html" className="text-center">
            <img src="assets/images/product/17.png" className="img-fluid mt-3" alt="iPhone" />
          </a>
        </div>
      </div>
      <div className="col-md-9">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 section-title">Laptop &amp; Macbook</h5>
          <a href="shop.html" className="text-decoration-none view-all">View All</a>
        </div>
        <div className="owl-carousel owl-theme product-slider">
          <div className="product-card">
            <span className="badge-new">New Product</span>
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/4.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Lenovo Vibe S1 Lite</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="old-price">$20.00</span>
              <span className="price">$18.00</span>
              <span className="discount">-10%</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <span className="badge-new bg-danger">Out of stock</span>
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/10.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Bjorn Tee SS Jack &amp; Jones</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="old-price">$10.00</span>
              <span className="price">$9.20</span>
              <span className="discount">-8%</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/11.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Afteroom Dining Chair</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="price">$11.90</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/12.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Afteroom Dining Chair</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="price">$11.90</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/14.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Afteroom Dining Chair</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="price">$11.90</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="container mt-60">
    <div className="row g-3">
      <div className="col-md-3">
        <div className="promo-box d-flex flex-column">
          <div>
            <h5>New Arrival</h5>
            <h3><a href="shop-single.html">MarQ 80 cm (32 inch) HD</a></h3>
            <p className="mb-1">Starting from:</p>
            <p className="price">$429.99</p>
          </div>
          <a href="shop-single.html" className="text-center">
            <img src="assets/images/product/14.png" className="img-fluid mt-3" alt="iPhone" />
          </a>
        </div>
      </div>
      <div className="col-md-9">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 section-title">Electronics</h5>
          <a href="shop.html" className="text-decoration-none view-all">View All</a>
        </div>
        <div className="owl-carousel owl-theme product-slider">
          <div className="product-card">
            <span className="badge-new">New Product</span>
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/12.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Lenovo Vibe S1 Lite</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="old-price">$20.00</span>
              <span className="price">$18.00</span>
              <span className="discount">-10%</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <span className="badge-new bg-danger">Out of stock</span>
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/13.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Bjorn Tee SS Jack &amp; Jones</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="old-price">$10.00</span>
              <span className="price">$9.20</span>
              <span className="discount">-8%</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/15.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Afteroom Dining Chair</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="price">$11.90</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/12.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Afteroom Dining Chair</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="price">$11.90</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
          <div className="product-card">
            <span className="wishlist-icon"><i className="fas fa-heart" /></span>
            <a href="shop-single.html">
              <img src="assets/images/product/14.png" className="img-fluid mb-2 product-img" alt="product" />
            </a>
            <h6><a href="shop-single.html">Afteroom Dining Chair</a></h6>
            <div className="rating">
              <span className="d-flex align-items-center">
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
                <span className="star-icon text-warning">★</span>
              </span>
            </div>
            <div>
              <span className="price">$11.90</span>
            </div>
            <button className="btn btn-primary cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="hero-banner-area mt-60">
    <div className="container">
      <div className="row">
        {/* Single */}
        <div className="col-lg-4 col-sm-6 mb-4">
          <div className="hero-banner-item">
            <img src="assets/images/banner/banner1.png" alt="banner" />
            <div className="hero-banner-item-overly">
              <div className="hero-banner-item-overly-full">
                <h4>Super Sale</h4>
                <h3>New Collection</h3>
                <a className="btn btn-primary btn-sm mt-2" href="shop.html">shop now</a>
              </div>
            </div>
          </div>
        </div>
        {/* Single */}
        <div className="col-lg-4 col-sm-6 mb-4">
          <div className="hero-banner-item">
            <img src="assets/images/banner/banner2.png" alt="banner" />
            <div className="hero-banner-item-overly">
              <div className="hero-banner-item-overly-full">
                <h3>New Collection</h3>
                <h4>Super Sale</h4>
                <a className="btn btn-primary btn-sm mt-2" href="shop.html">shop now</a>
              </div>
            </div>
          </div>
        </div>
        {/* Single */}
        <div className="col-lg-4 col-sm-6 mb-4">
          <div className="hero-banner-item">
            <img src="assets/images/banner/banner3.png" alt="banner" />
            <div className="hero-banner-item-overly">
              <div className="hero-banner-item-overly-full">
                <h4>Super Sale</h4>
                <h3>New Collection</h3>
                <a className="btn btn-primary btn-sm mt-2" href="shop.html">shop now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="container mt-60">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="mb-0 section-title">Recommended for You</h5>
    </div>
    <div className="owl-carousel owl-theme product-recommended-slider">
      <div className="product-card">
        <span className="badge-new bg-danger">Out of stock</span>
        <span className="wishlist-icon"><i className="fas fa-heart" /></span>
        <a href="shop-single.html">
          <img src="assets/images/product/4.png" className="img-fluid mb-2 product-img" alt="product" />
        </a>
        <h6><a href="shop-single.html">Lenovo Vibe S1 Lite</a></h6>
        <div className="rating">
          <span className="d-flex align-items-center">
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
          </span>
        </div>
        <div>
          <span className="old-price">$20.00</span>
          <span className="price">$18.00</span>
          <span className="discount">-10%</span>
        </div>
        <button className="btn btn-primary cart-btn">Add to Cart</button>
      </div>
      <div className="product-card">
        <span className="wishlist-icon"><i className="fas fa-heart" /></span>
        <a href="shop-single.html">
          <img src="assets/images/product/2.png" className="img-fluid mb-2 product-img" alt="product" />
        </a>
        <h6><a href="shop-single.html">Mouse Lenovo</a></h6>
        <div className="rating">
          <span className="d-flex align-items-center">
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
          </span>
        </div>
        <div>
          <span className="old-price">$20.00</span>
          <span className="price">$18.00</span>
          <span className="discount">-10%</span>
        </div>
        <button className="btn btn-primary cart-btn">Add to Cart</button>
      </div>
      <div className="product-card">
        <span className="wishlist-icon"><i className="fas fa-heart" /></span>
        <a href="shop-single.html">
          <img src="assets/images/product/5.png" className="img-fluid mb-2 product-img" alt="product" />
        </a>
        <h6><a href="shop-single.html">MI head phone</a></h6>
        <div className="rating">
          <span className="d-flex align-items-center">
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
          </span>
        </div>
        <div>
          <span className="old-price">$20.00</span>
          <span className="price">$18.00</span>
          <span className="discount">-10%</span>
        </div>
        <button className="btn btn-primary cart-btn">Add to Cart</button>
      </div>
      <div className="product-card">
        <span className="badge-new bg-danger">Out of stock</span>
        <span className="wishlist-icon"><i className="fas fa-heart" /></span>
        <a href="shop-single.html">
          <img src="assets/images/product/6.png" className="img-fluid mb-2 product-img" alt="product" />
        </a>
        <h6><a href="shop-single.html">Back cover for mi</a></h6>
        <div className="rating">
          <span className="d-flex align-items-center">
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
          </span>
        </div>
        <div>
          <span className="old-price">$20.00</span>
          <span className="price">$18.00</span>
          <span className="discount">-10%</span>
        </div>
        <button className="btn btn-primary cart-btn">Add to Cart</button>
      </div>
      <div className="product-card">
        <span className="badge-new bg-danger">Out of stock</span>
        <span className="wishlist-icon"><i className="fas fa-heart" /></span>
        <a href="shop-single.html">
          <img src="assets/images/product/7.png" className="img-fluid mb-2 product-img" alt="product" />
        </a>
        <h6><a href="shop-single.html">Lenovo Vibe S1 Lite</a></h6>
        <div className="rating">
          <span className="d-flex align-items-center">
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
            <span className="star-icon text-warning">★</span>
          </span>
        </div>
        <div>
          <span className="old-price">$20.00</span>
          <span className="price">$18.00</span>
          <span className="discount">-10%</span>
        </div>
        <button className="btn btn-primary cart-btn">Add to Cart</button>
      </div>
    </div>
  </div>
  {/* Start Blog Section */}
  <div className="blog-section mt-60">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 section-title">Latest Blog</h5>
      </div>
      <div className="owl-carousel  owl-theme blog-slider">
        <div className="blog-item p-1">
          <div className="blog-wraper">
            <div className="blog-header">
              <a href="blog-single.html">
                <div className="img-zoom">
                  <img src="./assets/images/blog-1.png" alt="eCommerce Html Template" className="img-fluid w-100" />
                </div>
              </a>
            </div>
            <div className="blog-body pb-4 px-3 pt-1 position-relative">
              <div className="blog-date"><i className="bi bi-calendar" /><span className="ml-2">Nov 12, 2023</span>
              </div>
              <div>
                <div className="h5 blog-title mt-3">
                  <a href="blog-single.html" className="text-inherit">Lorem ipsum dolor sit amet
                    consectetur</a>
                </div>
                <div className="blog-desc my-2">
                  <p className="text-inherit">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur, aperiam?</p>
                </div>
                <div className="text-muted mt-2">
                  <a href="blog-single.html" className="read-more">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-item p-1">
          <div className="blog-wraper">
            <div className="blog-header">
              <a href="blog-single.html">
                <div className="img-zoom">
                  <img src="./assets/images/blog-2.png" alt="eCommerce Html Template" className="img-fluid w-100" />
                </div>
              </a>
            </div>
            <div className="blog-body pb-4 px-3 pt-1 position-relative">
              <div className="blog-date"><i className="bi bi-calendar" /><span className="ml-2">Nov 12, 2023</span>
              </div>
              <div>
                <div className="h5 blog-title mt-3">
                  <a href="blog-single.html" className="text-inherit">Lorem ipsum dolor sit amet
                    consectetur</a>
                </div>
                <div className="blog-desc my-2">
                  <p className="text-inherit">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur, aperiam?</p>
                </div>
                <div className="text-muted mt-2">
                  <a href="blog-single.html" className="read-more">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-item p-1">
          <div className="blog-wraper">
            <div className="blog-header">
              <a href="blog-single.html">
                <div className="img-zoom">
                  <img src="./assets/images/blog-3.png" alt="eCommerce Html Template" className="img-fluid w-100" />
                </div>
              </a>
            </div>
            <div className="blog-body pb-4 px-3 pt-1 position-relative">
              <div className="blog-date"><i className="bi bi-calendar" /><span className="ml-2">Nov 12, 2023</span>
              </div>
              <div>
                <div className="h5 blog-title mt-3">
                  <a href="blog-single.html" className="text-inherit">Lorem ipsum dolor sit amet
                    consectetur</a>
                </div>
                <div className="blog-desc my-2">
                  <p className="text-inherit">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur, aperiam?</p>
                </div>
                <div className="text-muted mt-2">
                  <a href="blog-single.html" className="read-more">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-item p-1">
          <div className="blog-wraper">
            <div className="blog-header">
              <a href="blog-single.html">
                <div className="img-zoom">
                  <img src="./assets/images/blog-4.png" alt="eCommerce Html Template" className="img-fluid w-100" />
                </div>
              </a>
            </div>
            <div className="blog-body pb-4 px-3 pt-1 position-relative">
              <div className="blog-date"><i className="bi bi-calendar" /><span className="ml-2">Nov 12, 2023</span>
              </div>
              <div>
                <div className="h5 blog-title mt-3">
                  <a href="blog-single.html" className="text-inherit">Lorem ipsum dolor sit amet
                    consectetur</a>
                </div>
                <div className="blog-desc my-2">
                  <p className="text-inherit">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur, aperiam?</p>
                </div>
                <div className="text-muted mt-2">
                  <a href="blog-single.html" className="read-more">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-item p-1">
          <div className="blog-wraper">
            <div className="blog-header">
              <a href="blog-single.html">
                <div className="img-zoom">
                  <img src="./assets/images/blog-5.png" alt="eCommerce Html Template" className="img-fluid w-100" />
                </div>
              </a>
            </div>
            <div className="blog-body pb-4 px-3 pt-1 position-relative">
              <div className="blog-date"><i className="bi bi-calendar" /><span className="ml-2">Nov 12, 2023</span>
              </div>
              <div>
                <div className="h5 blog-title mt-3">
                  <a href="blog-single.html" className="text-inherit">Lorem ipsum dolor sit amet
                    consectetur</a>
                </div>
                <div className="blog-desc my-2">
                  <p className="text-inherit">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur, aperiam?</p>
                </div>
                <div className="text-muted mt-2">
                  <a href="blog-single.html" className="read-more">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</>
)
}

export default Home;