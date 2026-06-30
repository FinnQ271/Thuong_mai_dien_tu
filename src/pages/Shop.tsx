function Shop () {
    return(
        <>
        <div>
  {/* Menu Section */}
  <div className="container mt-2 mt-sm-2 mt-md-2 mt-lg-4">
    <div className="d-block d-sm-block d-md-block d-lg-flex">
      <div className="container-left">
        <div className="category-menu" style={{display: 'none'}}>
          <div className="menu-title d-none d-sm-none d-md-none d-lg-block"><i className="fas fa-bars mr-2" />Jewelry Collections</div>
          <ul className="list-unstyled">
            <li>
              <a href="#" className="more-menu">Accessory Types</a>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="more-menu">Chokers</a>
                  <ul className="list-unstyled">
                    <li><a href="#">Gold Choker</a></li>
                    <li><a href="#">Silver Choker</a></li>
                  </ul>
                </li>
                <li><a href="#">Pendants</a></li>
                <li><a href="#">Chains</a></li>
                <li><a href="#">Collar Necklaces</a></li>
              </ul>
            </li>
            <li><a href="#">Pearls</a></li>
            <li><a href="#">Silver Pieces</a></li>
            <li>
              <a href="#" className="more-menu">Chain Jewelry</a>
              <ul className="list-unstyled">
                <li><a href="#">Pendants</a></li>
                <li><a href="#">Bracelets</a></li>
                <li><a href="#">Belly Chains</a></li>
                <li><a href="#">Nose Rings</a></li>
              </ul>
            </li>
            <li><a href="#">Cufflinks</a></li>
            <li><a href="#">Black Cardamom Jewelry</a></li>
            <li><a href="#">Fancy Earrings</a></li>
            <li><a href="#">Platinum Pieces</a></li>
            <li><a href="#">Gold Items</a></li>
            <li><a href="#">Toe Rings</a></li>
            <li><a href="#">Featured Items</a></li>
          </ul>
        </div>
      </div>
      <div className="container-right" />
    </div>
  </div>
  {/* /Menu Section End */}
  {/* breadcrumbs */}
  <nav className="container mt-4 mt-sm-4 mt-md-4 mt-lg-3 d-flex flex-wrap align-items-center gap-2 px-3">
    <div className="d-flex align-items-center gap-2">
      <a href="index.html">
        <svg className="text-primary" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 576 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
          <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
        </svg>
      </a>
      <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-muted ml-2" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
    <div className="d-flex align-items-center gap-2 ml-1">
      <a className="text-muted text-decoration-none pointer-events-none" href="#">Shop</a>
    </div>
  </nav>
  {/* end breadcrumbs */}
  <div className="shop-section">
    {/* section */}
    <div className="mb-5 mt-50">
      {/* container */}
      <div className="container">
        {/* row */}
        <div className="row gx-10">
          {/* col */}
          <div className="col-lg-3 col-md-4 mb-2 order-2 order-sm-2 order-md-2 order-lg-1">
            <aside className="offcanvas-lg offcanvas-start" tabIndex={-1} id="filter-section" aria-labelledby="navbar-defaultLabel">
              <div className="offcanvas-header d-lg-none">
                <h2 className="fw-semibold fs-3">Filter</h2>
                <button type="button" className="btn-close" id="filter-section-close" />
              </div>
              <div className="offcanvas-body p-lg-0">
                <div className="flex-grow-1">
                  <div className="mb-4 border-bottom pb-3 filter-box-item">
                    <p className="mb-3 filter-title">Category</p>
                    <hr />
                    <div className="mt-4 filter-category">
                      <ul className="list-unstyled">
                        <li><a href="#">Chokers</a><span className="p-count">(5)</span></li>
                        <li><a href="#">Pendants</a><span className="p-count">(5)</span></li>
                        <li><a href="#">Chains</a><span className="p-count">(5)</span></li>
                        <li><a href="#">Collar Necklaces</a><span className="p-count">(5)</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="mb-4 border-bottom pb-3 filter-box-item">
                    <p className="mb-3 filter-title">Filter by price</p>
                    <hr />
                    <div className="mt-4">
                      <div id="priceRange" className="mb-4" />
                      <small className="text-muted">Price:</small>
                      <span id="priceRange-value" className="small" />
                    </div>
                  </div>
                  <div className="mb-4 border-bottom pb-3 filter-box-item">
                    {/* Color */}
                    <p className="mb-3 filter-title">Color</p>
                    <hr />
                    <div className="mt-4">
                      <div className="form-check mb-2 d-flex justify-content-between">
                        <div>
                          <input className="form-check-input" type="checkbox" defaultValue="" id="tRed" defaultChecked />
                          <label className="form-check-label" htmlFor="tRed">Red</label>
                        </div>
                        <span className="p-count">(5)</span>
                      </div>
                      <div className="form-check mb-2 d-flex justify-content-between">
                        <div>
                          <input className="form-check-input" type="checkbox" defaultValue="" id="tBlue" />
                          <label className="form-check-label" htmlFor="tBlue">Blue</label>
                        </div>
                        <span className="p-count">(2)</span>
                      </div>
                      <div className="form-check mb-2 d-flex justify-content-between">
                        <div>
                          <input className="form-check-input" type="checkbox" defaultValue="" id="tBlack" />
                          <label className="form-check-label" htmlFor="tBlack">Black</label>
                        </div>
                        <span className="p-count">(2)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 border-bottom pb-3 filter-box-item">
                    {/* Size */}
                    <p className="mb-3 filter-title">Size</p>
                    <hr />
                    <div className="mt-4">
                      <div className="form-check mb-2 d-flex justify-content-between">
                        <div>
                          <input className="form-check-input" type="checkbox" defaultValue="" id="tSmall" defaultChecked />
                          <label className="form-check-label" htmlFor="tSmall">Small</label>
                        </div>
                        <span className="p-count">(2)</span>
                      </div>
                      <div className="form-check mb-2 d-flex justify-content-between">
                        <div>
                          <input className="form-check-input" type="checkbox" defaultValue="Medium" id="tMedium" />
                          <label className="form-check-label" htmlFor="tMedium">Medium</label>
                        </div>
                        <span className="p-count">(2)</span>
                      </div>
                      <div className="form-check mb-2 d-flex justify-content-between">
                        <div>
                          <input className="form-check-input" type="checkbox" defaultValue="Large" id="tLarge" />
                          <label className="form-check-label" htmlFor="tLarge">Large</label>
                        </div>
                        <span className="p-count">(2)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 border-bottom pb-3 filter-box-item">
                    {/* Rating */}
                    <p className="mb-3 filter-title">Rating</p>
                    <hr />
                    <div className="mt-4">
                      <div className="form-check mb-2 d-flex justify-content-between">
                        <div>
                          <input className="form-check-input" type="checkbox" defaultValue="" id="rating5" />
                          <label className="form-check-label" htmlFor="rating5">
                            <i className="fas fa-star text-warning" />
                            <i className="fas fa-star text-warning" />
                            <i className="fas fa-star text-warning" />
                            <i className="fas fa-star text-warning" />
                            <i className="fas fa-star text-warning" />
                          </label>
                        </div>
                        <span className="p-count">(2)</span>
                      </div>
                      <div className="form-check mb-2 d-flex justify-content-between">
                        <div>
                          <input className="form-check-input" type="checkbox" defaultValue="" id="rating4" />
                          <label className="form-check-label" htmlFor="rating4">
                            <i className="fas fa-star text-warning" />
                            <i className="fas fa-star text-warning" />
                            <i className="fas fa-star text-warning" />
                            <i className="fas fa-star text-warning" />
                            <i className="far fa-star text-warning" />
                          </label>
                        </div>
                        <span className="p-count">(2)</span>
                      </div>
                      <div className="form-check mb-2 d-flex justify-content-between">
                        <div>
                          <input className="form-check-input" type="checkbox" defaultValue="" id="rating3" />
                          <label className="form-check-label" htmlFor="rating3">
                            <i className="fas fa-star text-warning" />
                            <i className="fas fa-star text-warning" />
                            <i className="fas fa-star text-warning" />
                            <i className="far fa-star text-warning" />
                            <i className="far fa-star text-warning" />
                          </label>
                        </div>
                        <span className="p-count">(2)</span>
                      </div>
                      <div className="form-check mb-2 d-flex justify-content-between">
                        <div>
                          <input className="form-check-input" type="checkbox" defaultValue="" id="rating2" />
                          <label className="form-check-label" htmlFor="rating2">
                            <i className="fas fa-star text-warning" />
                            <i className="fas fa-star text-warning" />
                            <i className="far fa-star text-warning" />
                            <i className="far fa-star text-warning" />
                            <i className="far fa-star text-warning" />
                          </label>
                        </div>
                        <span className="p-count">(2)</span>
                      </div>
                      <div className="form-check mb-2 d-flex justify-content-between">
                        <div>
                          <input className="form-check-input" type="checkbox" defaultValue="" id="ratingOne" />
                          <label className="form-check-label" htmlFor="ratingOne">
                            <i className="fas fa-star text-warning" />
                            <i className="far fa-star text-warning" />
                            <i className="far fa-star text-warning" />
                            <i className="far fa-star text-warning" />
                            <i className="far fa-star text-warning" />
                          </label>
                        </div>
                        <span className="p-count">(2)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <section className="col-lg-9 col-md-12 order-1 order-sm-1 order-md-1 order-lg-2">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2">
              <div className="mb-3 mb-md-0">
                <p className="mb-0">There are 100 products</p>
              </div>
              <div className="d-flex align-items-center">
                <div className="d-lg-none me-2">
                  <a className="btn border px-4 text-muted" type="button" data-bs-toggle="offcanvas" data-bs-target="#filter-section" aria-controls="filter-section" aria-label="Toggle navigation">
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter me-2">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    <span className="d-none d-md-inline-block d-lg-inline-block">Filters</span>
                  </a>
                </div>
                <div className="d-flex align-items-center">
                  <label htmlFor="sortSelect" className="me-2 mb-0" style={{whiteSpace: 'nowrap'}}>Sort by:</label>
                  <select className="form-select w-auto" id="sortSelect">
                    <option value="popular">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="product mt-4">
              <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-1">
                <div className="col mb-3">
                  <div className="product-card">
                    <span className="badge-new bg-danger">Out of stock</span>
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
                </div>
                <div className="col mb-3">
                  <div className="product-card">
                    <span className="badge-new bg-danger">Out of stock</span>
                    <span className="wishlist-icon"><i className="fas fa-heart" /></span>
                    <a href="shop-single.html">
                      <img src="assets/images/product/2.png" className="img-fluid mb-2 product-img" alt="product" />
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
                <div className="col mb-3">
                  <div className="product-card">
                    <span className="wishlist-icon"><i className="fas fa-heart" /></span>
                    <a href="shop-single.html">
                      <img src="assets/images/product/3.png" className="img-fluid mb-2 product-img" alt="product" />
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
                <div className="col mb-3">
                  <div className="product-card">
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
                </div>
                <div className="col mb-3">
                  <div className="product-card">
                    <span className="wishlist-icon"><i className="fas fa-heart" /></span>
                    <a href="shop-single.html">
                      <img src="assets/images/product/5.png" className="img-fluid mb-2 product-img" alt="product" />
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
                <div className="col mb-3">
                  <div className="product-card">
                    <span className="wishlist-icon"><i className="fas fa-heart" /></span>
                    <a href="shop-single.html">
                      <img src="assets/images/product/6.png" className="img-fluid mb-2 product-img" alt="product" />
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
            </div>
            <div className="row mb-5 my-5">
              <div className="col-lg-12">
                <div className="my-4 border rounded d-flex p-3 align-items-center justify-content-between">
                  <ul className="d-flex align-items-center list-unstyled mb-0 pagination">
                    <li className="text-muted">
                      <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                        <line x1={19} y1={12} x2={5} y2={12} />
                        <polyline points="12 19 5 12 12 5" />
                      </svg>
                    </li>
                    <li className="rounded bg-primary">
                      <a href="#" className="text-white">1</a>
                    </li>
                    <li className="cursor-pointer  rounded"><a href="#">2</a></li>
                    <li className="cursor-pointer rounded"><a href="#">3</a></li>
                    <li className="cursor-pointer rounded">
                      <a href="#">
                        <svg className="text-primary" stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                          <line x1={5} y1={12} x2={19} y2={12} />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                  <div className="d-none d-lg-flex text-right mr-3">Showing 1 - 6 of 7 items</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</div>

     
        </>
    )
}

export default Shop;