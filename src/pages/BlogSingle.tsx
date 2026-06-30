function BlogSingle () {
    return(
        <>
        <div>
  {/* Menu Section */}
  <div className="container-fluid mt-2 mt-sm-2 mt-md-2 mt-lg-4">
    <div className="d-block d-sm-block d-md-block d-lg-flex">
      <div className="container-left">
        <div className="category-menu" style={{display: 'none'}}>
          <div className="menu-title d-none d-sm-none d-md-none d-lg-block"><i className="fas fa-bars me-2" />Jewelry Collections</div>
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
      <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-muted ms-2" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
    <div className="d-flex align-items-center gap-2 ms-1">
      <a className="text-muted text-decoration-none pointer-events-none" href="#">Blog Details</a>
    </div>
  </nav>
  {/* end breadcrumbs */}
  <section className="blog-section">
    <div className="container">
      <div className="row mt-50">
        <div className="col-lg-8">
          <article className="mb-4 bg-white p-1 p-lg-4">
            <h1 className="mb-4 font-weight-bold">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat, voluptate?
            </h1>
            <div className="mb-4 d-flex flex-wrap align-items-center">
              <div className="me-3 mb-2 mb-sm-2 mb-md-0 mb-lg-0 d-flex align-items-center border-right pr-3">
                <svg className="text-primary" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 576 512" height={20} width={20} xmlns="http://www.w3.org/2000/svg">
                  <path d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z" />
                </svg>
                <span className="text-uppercase ms-2">114 views</span>
              </div>
              <div className="me-3 mb-2 mb-sm-2 mb-md-0 mb-lg-0 d-flex align-items-center border-right pr-3">
                <svg className="text-primary" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 576 512" height={20} width={20} xmlns="http://www.w3.org/2000/svg">
                  <path d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z" />
                </svg>
                <span className="text-uppercase ms-2">3 comments</span>
              </div>
              <div className="d-flex mb-2 mb-sm-2 mb-md-0 mb-lg-0 align-items-center">
                <svg className="text-primary" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" height={20} width={20} xmlns="http://www.w3.org/2000/svg">
                  <rect width={416} height={384} x={48} y={80} fill="none" strokeLinejoin="round" strokeWidth={32} rx={48} />
                  <circle cx={296} cy={232} r={24} />
                  <circle cx={376} cy={232} r={24} />
                  <circle cx={296} cy={312} r={24} />
                  <circle cx={376} cy={312} r={24} />
                  <circle cx={136} cy={312} r={24} />
                  <circle cx={216} cy={312} r={24} />
                  <circle cx={136} cy={392} r={24} />
                  <circle cx={216} cy={392} r={24} />
                  <circle cx={296} cy={392} r={24} />
                  <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M128 48v32m256-32v32" />
                  <path fill="none" strokeLinejoin="round" strokeWidth={32} d="M464 160H48" />
                </svg>
                <span className="text-uppercase ms-2">Nov 14, 2024</span>
              </div>
            </div>
            <hr />
            <div className="blog-desc">
              <figure className="mb-3">
                <img className="img-fluid rounded" src="./assets/images/blog-1.png" alt="" />
              </figure>
              <p className="mb-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam, earum eum? Repellat vero minus laudantium earum soluta quos alias molestiae voluptatum ipsa in, pariatur consequuntur sint accusantium quia sequi. Sequi?
              </p>
              <p className="mb-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, illum. Nulla ex unde molestiae sunt eos doloremque! Esse rem labore laborum magnam commodi doloribus voluptatum voluptates natus, cum eos rerum. Aperiam nulla distinctio eaque eos assumenda aspernatur dicta veritatis dignissimos.
              </p>
              <p className="mb-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque neque corporis architecto quaerat, perspiciatis nulla velit, consequatur eveniet molestias ullam voluptates amet consequuntur ut aspernatur nam reprehenderit in nesciunt beatae ab necessitatibus repudiandae. Qui odit expedita veritatis voluptate, voluptatum sequi dolorum commodi corrupti reprehenderit fuga corporis atque ipsa ullam cupiditate?
              </p>
              <blockquote className="quote">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius debitis provident consectetur consequuntur quod, soluta in! Fugiat soluta nihil eveniet.
              </blockquote>
              <p className="mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo recusandae maxime ipsum tempore illum laborum nostrum aliquid, molestiae eos iure ut possimus non in earum magnam quidem maiores consectetur corporis praesentium nisi aperiam culpa provident. Tenetur necessitatibus itaque dicta pariatur?
              </p>
              <p className="mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aliquam ullam quas assumenda labore ea repellat voluptate nostrum quidem itaque architecto, dolorum pariatur magnam nam mollitia impedit rerum dicta earum quo debitis alias magni dignissimos nisi amet! Dolorem, excepturi dolorum.
              </p>
              <p className="mb-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium praesentium non aut, sit perspiciatis saepe sunt esse rerum, nostrum architecto laboriosam et, necessitatibus minus! Aliquid dolore non necessitatibus mollitia fugiat animi dolorem pariatur perspiciatis eius vel nesciunt deserunt inventore, sunt porro quidem voluptatum magni neque officiis rem. Eveniet, sunt assumenda?
              </p>
            </div>
          </article>
          <div className="comment-section">
            <div className="comment-box">
              <form className="mb-4">
                <div className="position-relative mb-4 w-100 overflow-hidden rounded-lg bg-white pr-3">
                  <textarea id="comment" className="form-control text-muted" placeholder="Comment" required autoComplete="off" defaultValue={""} />
                </div>
                <button className="btn btn-primary font-weight-bold px-4 py-2" type="submit">
                  Post comment
                </button>
              </form>
            </div>
            <div className="comment-title">
              <h2>Comment</h2>
            </div>
            <div className="comment-lists">
              <div className="mt-4 d-flex align-items-start">
                <div>
                  <img className="d-none d-sm-block me-3 rounded-circle shadow-sm" style={{height: 56, width: 56, overflow: 'hidden'}} src="./assets/images/client/1.png" alt="profile_logo" />
                </div>
                <div>
                  <div className="d-flex align-items-center mb-1">
                    <a className="font-weight-bold text-primary" href="#">Alina</a>
                    <span className="mx-2">·</span>
                    <span className="text-muted small">15 Nov. 09:21pm</span>
                  </div>
                  <p className="mb-2">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, est ratione earum labore, iste soluta error repudiandae, illo sapiente ipsam omnis maxime voluptates quod quo laudantium. Doloremque qui natus voluptas.
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center text-muted me-3" style={{cursor: 'pointer'}}>
                      <svg className="h-4 w-4" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0V0z" />
                        <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
                      </svg>
                      <span className="ms-1">Reply</span>
                    </div>
                    <div className="d-flex align-items-center text-muted" style={{cursor: 'pointer'}}>
                      <svg className="h-4 w-4" stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <span className="ms-1">Edit</span>
                    </div>
                  </div>
                  <div className="mt-4 d-flex align-items-start">
                    <div>
                      <img className="d-none d-sm-block me-3 rounded-circle shadow-sm" style={{height: 56, width: 56, overflow: 'hidden'}} src="./assets/images/client/2.png" alt="profile_logo" />
                    </div>
                    <div>
                      <div className="d-flex align-items-center mb-1">
                        <a className="font-weight-bold text-primary" href="#">Johne Deo</a>
                        <span className="mx-2">·</span>
                        <span className="text-muted small">Just now</span>
                      </div>
                      <small className="d-flex align-items-center text-muted mb-2">
                        <svg className="h-4 w-4" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                          <path fill="none" d="M0 0h24v24H0V0z" />
                          <path d="M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
                        </svg>
                        <span className="ms-1">Responding to</span>
                        <a className="ms-1 text-primary" href="#">Alina</a>
                      </small>
                      <p className="mb-2">
                        Alina, Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ex possimus, unde totam nulla exercitationem esse perspiciatis accusantium porro eligendi?
                      </p>
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center text-muted" style={{cursor: 'pointer'}}>
                          <svg className="h-4 w-4" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" d="M0 0h24v24H0V0z" />
                            <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
                          </svg>
                          <span className="ms-1">Reply</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="sidebar-wrap mt-5 mt-sm-5 mt-md-5 mt-lg-1">
            <div className="sidebar-blog search rounded-0 card p-4 mb-3 border-0">
              <input type="text" className="form-control rounded-0 py-2" placeholder="search" />
              <a href="#" className="btn btn-primary mt-3 rounded-0">Search</a>
            </div>
            <div className="sidebar-blog latest-post card rounded-0 border-0 p-4 mb-3">
              <h5>Latest Posts</h5>
              <div className="d-flex border-bottom py-3 latest-post-item">
                <a href="#"><img className="me-4" src="./assets/images/blog-2.png" width={87} height={65} alt="" /></a>
                <div className="ms-2">
                  <h6 className="mb-2"><a href="#">Lorem ipsum dolor sit amet</a></h6>
                  <span className="text-sm text-muted">03 Jan 2024</span>
                </div>
              </div>
              <div className="d-flex border-bottom py-3 latest-post-item">
                <a href="#"><img className="me-4" src="./assets/images/blog-3.png" width={87} height={65} alt="" /></a>
                <div className="ms-2">
                  <h6 className="my-2"><a href="#">Lorem ipsum dolor sit amet</a></h6>
                  <span className="text-sm text-muted">03 Jan 2024</span>
                </div>
              </div>
              <div className="d-flex py-3 latest-post-item">
                <a href="#"><img className="me-4" src="./assets/images/blog-4.png" width={87} height={65} alt="" /></a>
                <div className="ms-2">
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

export default BlogSingle;