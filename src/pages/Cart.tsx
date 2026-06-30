function Cart () {
    return(
        <>
        <div>
  {/* Menu Section */}
  <div className="container-fluid mt-2 mt-sm-2 mt-md-2 mt-lg-4">
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
            <li><a href="#">Fancy Earrings</a></li >
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
      <a className="text-muted text-decoration-none pointer-events-none" href="#">Cart</a>
    </div>
  </nav>
  {/* end breadcrumbs */}
  <section className="cart-section px-3">
    <div className="container mt-50 px-4">
      <div className="mb-6 row">
        <div className="col-12 col-lg-7 mb-4 mb-lg-0">
          <div className="mb-4 row d-none d-sm-none d-md-none d-lg-block">
            <div className="col-lg-12">
              <div className="row"> 
                <div className="col-lg-4">
                  <b>Product</b>
                </div>
                <div className="col-lg-2">
                  <b>Price</b>
                </div>
                <div className="col-lg-3">
                  <b>Quantity</b>
                </div>
                <div className="col-lg-3">
                  <b>Total</b>
                </div>
              </div>
            </div>
          </div>
          <div className="products mt-3">
            {/* Product 1 */}
            <div className="position-relative product-item row mb-4 rounded-lg bg-white pt-3 shadow-sm mr-1">
              <div className="col-12 col-sm-6 col-lg-4 mb-3 mb-sm-3 mb-md-3 md-lg-0">
                <b className="mb-2 d-block d-xl-none">Product</b>
                <div className=" d-flex w-100">
                  <figure className="rounded-lg">
                    <img src="./assets/images/product/2.png" className="rounded" width={60} alt="img" />
                  </figure>
                  <div className="ml-2 w-100">
                    <a className="font-weight-bold text-dark" href="#">
                      Lorem, ipsum.
                    </a>
                    <div className="mt-2">
                      <small>#PRD36585</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-2 mb-3 mb-sm-3 mb-md-3 md-lg-0">
                <b className="mb-2 d-block d-xl-none">Price</b>
                <div>
                  <span className="font-weight-bold text-primary">$120.00</span>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 mb-3 mb-sm-3 mb-md-3 md-lg-0">
                <b className="mb-2 d-block d-xl-none">Quantity</b>
                <div className="qty-container">
                  <button className="qty-btn-minus count-decreament" type="button"><i className="fas fa-minus" /></button>
                  <input type="number" name="qty" defaultValue={1} className="input-qty input-cornered" />
                  <button className="qty-btn-plus count-increament" type="button"><i className="fas fa-plus" /></button>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 mb-3 mb-sm-3 mb-md-3 md-lg-0">
                <b className="mb-2 d-block d-xl-none">Total</b>
                <span className="font-weight-bold text-primary">$120.00</span>
              </div>
              <button className="btn btn-primary position-absolute close-cart">
                <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </button>
            </div>
            {/* Product 2 */}
            <div className="position-relative product-item row mb-4 rounded-lg bg-white pt-3 shadow-sm mr-1">
              <div className="col-12 col-sm-6 col-lg-4 mb-3 mb-sm-3 mb-md-3 md-lg-0">
                <b className="mb-2 d-block d-xl-none">Product</b>
                <div className=" d-flex w-100">
                  <figure className="rounded-lg">
                    <img src="./assets/images/product/2.png" className="rounded" width={60} alt="img" />
                  </figure>
                  <div className="ml-2 w-100">
                    <a className="font-weight-bold text-dark" href="#">
                      Lorem, ipsum.
                    </a>
                    <div className="mt-2">
                      <small>#PRD36585</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-2 mb-3 mb-sm-3 mb-md-3 md-lg-0">
                <b className="mb-2 d-block d-xl-none">Price</b>
                <div>
                  <span className="font-weight-bold text-primary">$120.00</span>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 mb-3 mb-sm-3 mb-md-3 md-lg-0">
                <b className="mb-2 d-block d-xl-none">Quantity</b>
                <div className="qty-container">
                  <button className="qty-btn-minus count-decreament" type="button"><i className="fas fa-minus" /></button>
                  <input type="number" name="qty" defaultValue={1} className="input-qty input-cornered" />
                  <button className="qty-btn-plus count-increament" type="button"><i className="fas fa-plus" /></button>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 mb-3 mb-sm-3 mb-md-3 md-lg-0">
                <b className="mb-2 d-block d-xl-none">Total</b>
                <span className="font-weight-bold text-primary">$120.00</span>
              </div>
              <button className="btn btn-primary position-absolute close-cart">
                <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5  ps-lg-5">
          <div className="delivery-summary">
            <div className="mb-4 box-title d-flex flex-wrap align-items-center justify-content-between border-bottom-2  pb-1">
              <h1 className="h4 font-weight-bold text-dark position-relative m-0 mb-1 title-under-line">
                Order Total
              </h1>
            </div>
            <form className="d-flex">
              <div className="position-relative w-100">
                <input type="text" id="code" className="form-control rounded-0" placeholder="Promo code" autoComplete="off" />
              </div>
              <button className="btn btn-primary apply-coupon text-white rounded-0" type="submit">Apply</button>
            </form>
            <div className="mt-4 bg-white ">
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between">
                  Items <span className="text-dark">$690.00</span>
                </li>
                <li className="d-flex justify-content-between">
                  Discount <span className="text-danger">-$330.00</span>
                </li>
                <li className="d-flex justify-content-between">
                  Shipping <span className="text-dark">$8.00</span>
                </li>
                <li className="d-flex justify-content-between font-weight-bold text-uppercase text-dark">
                  Total to pay <span>$368.00</span>
                </li>
              </ul>
              <a href="checkout.html" className="btn btn-primary mt-2 w-100 text-center font-weight-bold custom-btn-p">Checkout</a>
            </div>
          </div>
        </div>
      </div>
    </div></section>
</div>

        </>
    )
}

export default Cart;