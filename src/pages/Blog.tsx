function Blog () {
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
      <a className="text-muted text-decoration-none pointer-events-none" href="#">Blog</a>
    </div>
  </nav>
  {/* end breadcrumbs */}
  <section className="blog-section">
    <div className="container">
      <div className="row mt-50">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-5">
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
                    <div className="blog-date"><i className="bi bi-calendar" /><span className="ml-2">Nov 12, 2023</span></div>
                    <div>
                      <div className="h5 blog-title mt-3">
                        <a href="blog-single.html" className="text-inherit">Lorem ipsum dolor sit amet consectetur</a>
                      </div>
                      <div className="blog-desc my-2">
                        <p className="text-inherit">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, aperiam?</p>
                      </div>
                      <div className="text-muted mt-2">
                        <a href="blog-single.html" className="read-more">Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mb-5">
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
                    <div className="blog-date"><i className="bi bi-calendar" /><span className="ml-2">Nov 12, 2023</span></div>
                    <div>
                      <div className="h5 blog-title mt-3">
                        <a href="blog-single.html" className="text-inherit">Lorem ipsum dolor sit amet consectetur</a>
                      </div>
                      <div className="blog-desc my-2">
                        <p className="text-inherit">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, aperiam?</p>
                      </div>
                      <div className="text-muted mt-2">
                        <a href="blog-single.html" className="read-more">Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mb-5">
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
                    <div className="blog-date"><i className="bi bi-calendar" /><span className="ml-2">Nov 12, 2023</span></div>
                    <div>
                      <div className="h5 blog-title mt-3">
                        <a href="blog-single.html" className="text-inherit">Lorem ipsum dolor sit amet consectetur</a>
                      </div>
                      <div className="blog-desc my-2">
                        <p className="text-inherit">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, aperiam?</p>
                      </div>
                      <div className="text-muted mt-2">
                        <a href="blog-single.html" className="read-more">Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mb-5">
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
                    <div className="blog-date"><i className="bi bi-calendar" /><span className="ml-2">Nov 12, 2023</span></div>
                    <div>
                      <div className="h5 blog-title mt-3">
                        <a href="blog-single.html" className="text-inherit">Lorem ipsum dolor sit amet consectetur</a>
                      </div>
                      <div className="blog-desc my-2">
                        <p className="text-inherit">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, aperiam?</p>
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
          <div className="row mb-5">
            <div className="col-lg-12">
              <div className="my-4 d-flex border py-4 px-2 align-items-center justify-content-between">
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
        </div>
        <div className="col-lg-4">
          <div className="sidebar-wrap mt-1">
            <div className="sidebar-blog search rounded-0 card p-4 mb-3 border-0">
              <input type="text" className="form-control rounded-0 py-2" placeholder="search" />
              <a href="#" className="btn btn-primary mt-3 rounded-0">Search</a>
            </div>
            <div className="sidebar-blog latest-post card rounded-0 border-0 p-4 mb-3">
              <h5>Latest Posts</h5>
              <div className="d-flex border-bottom py-3 latest-post-item">
                <a href="#"><img className="mr-4" src="./assets/images/blog-1.png" width={87} height={65} alt="" /></a>
                <div className="ms-4">
                  <h6 className="mb-2"><a href="#">Lorem ipsum dolor sit amet</a></h6>
                  <span className="text-sm text-muted">03 Jan 2024</span>
                </div>
              </div>
              <div className="d-flex border-bottom py-3 latest-post-item">
                <a href="#"><img className="mr-4" src="./assets/images/blog-2.png" width={87} height={65} alt="" /></a>
                <div className="ms-4">
                  <h6 className="my-2"><a href="#">Lorem ipsum dolor sit amet</a></h6>
                  <span className="text-sm text-muted">03 Jan 2024</span>
                </div>
              </div>
              <div className="d-flex py-3 latest-post-item">
                <a href="#"><img className="mr-4" src="./assets/images/blog-3.png" width={87} height={65} alt="" /></a>
                <div className="ms-4">
                  <h6 className="my-2"><a href="#">Lorem ipsum dolor sit amet</a></h6>
                  <span className="text-sm text-muted">03 Jan 2024</span>
                </div>
              </div>
            </div>
            <div className="sidebar-blog bg-white rounded-0 tags p-4 mb-3">
              <h5 className="mb-4">Tags</h5>
              <a href="#">Mobile</a>
              <a href="#">Laptop</a>
              <a href="#">Fashion</a>
              <a href="#">Toys</a>
              <a href="#">Kids</a>
              <a href="#">Women</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

        </>
    )
}

export default Blog