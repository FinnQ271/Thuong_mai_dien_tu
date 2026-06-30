import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  navigate: (page: string) => void;
}

function Header({ navigate }: HeaderProps) {
    const { getTotalItems } = useCart();
    const { getTotalWishlistItems } = useWishlist();
    const { currentUser, logout, isAdmin } = useAuth();
    return(
        <>
          {/* Header Section Start */}
  <header>
    <div className="top-header">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 d-none d-sm-none p-0 d-md-none d-lg-block">
            <ul className="list-unstyled m-0 d-flex p-0 top-header-menu">
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("home"); }}>Trang chủ</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("about"); }}>Về chúng tôi</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("contact"); }}>Liên hệ</a></li>
            </ul>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 p-0 d-none d-sm-none d-md-none d-lg-flex justify-content-end">
            <ul className="list-unstyled m-0 d-flex p-0 top-header-menu">
              <li>
                <div className="country">
                  <select className="nice-option">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
              </li>
              <li>
                <div className="lang">
                  <select className="nice-option">
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="middle-header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-1 col-sm-1 col-md-1 col-lg-1 d-block d-sm-block d-md-block d-lg-none">
            <button className="navbar-toggler border-0 collapsed" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbar-default" aria-controls="navbar-default" aria-label="Toggle navigation">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="icon-hamburger" fill="none" viewBox="0 0 18 16" width="20px" height="20px">
                <path d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z" fill="currentColor">
                </path>
              </svg>
            </button>
          </div>
          <div className="col-8 col-sm-8 col-md-8 col-lg-3 order-1 order-lg-1 d-flex justify-content-start">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("home"); }}>
              <img src="./assets/images/logo.png" alt="logo" width={180} height="auto" sizes="(max-width: 360px) 50vw, 180px" />
            </a>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 order-3 order-lg-2 mt-3 mt-lg-0 d-none d-lg-block">
            <div className="input-group search-container">
              <input type="text" className="form-control header-search" placeholder="Tìm kiếm sản phẩm..." />
              <select id="searchSelect" className="form-select flex-shrink-0">
                <option>Tất cả danh mục</option>
                <option>Trái cây & Rau củ</option>
                <option>Máy tính xách tay</option>
                <option>Điện thoại thông minh</option>
                <option>TV & Màn hình</option>
                <option>Máy ảnh</option>
                <option>Tai nghe</option>
                <option>Bộ đàm</option>
                <option>Máy in</option>
                <option>Máy chơi game</option>
                <option>Trò chơi</option>
                <option>Lưu trữ</option>
              </select>
              <span className="input-group-text text-black bg-primary">
                <svg aria-hidden="true" fill="none" focusable="false" width={24} height={24} className="icon-search" viewBox="0 0 24 24">
                  <path d="M10.364 3a7.364 7.364 0 1 0 0 14.727 7.364 7.364 0 0 0 0-14.727Z" stroke="#fff" strokeWidth="1.5" strokeMiterlimit={10} />
                  <path d="M15.857 15.858 21 21.001" stroke="#fff" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>
          <div className="col-3 col-sm-3 col-md-3 col-lg-3 order-2 order-lg-3 d-flex justify-content-end">
            <div>
              <div className="list-inline  d-flex mt-2">
                <div className="list-inline-item d-none d-lg-block dropdown">
                  {currentUser ? (
                    <>
                      <a href="#" className="text-muted dropdown-toggle d-flex align-items-center gap-1 text-decoration-none" id="userMenuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-account" width={25} height={25} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx={12} cy={7} r={4} />
                        </svg>
                        <span className="small fw-semibold ms-1">{currentUser.fullName}</span>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userMenuDropdown">
                        {isAdmin && (
                          <li>
                            <a className="dropdown-item fw-bold text-primary" href="#" onClick={(e) => { e.preventDefault(); navigate("admin-dashboard"); }}>
                              <i className="fas fa-chart-line me-2"></i>Dashboard Admin
                            </a>
                          </li>
                        )}
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                          <a className="dropdown-item text-danger" href="#" onClick={(e) => { e.preventDefault(); logout(); navigate("home"); }}>
                            <i className="fas fa-sign-out-alt me-2"></i>Đăng xuất
                          </a>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate("login"); }} className="text-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon-account" width={25} height={25} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx={12} cy={7} r={4} />
                      </svg>
                    </a>
                  )}
                </div>
                <div className="list-inline-item d-none d-lg-block">
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate("wishlist"); }} className="text-muted position-relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon-wishlist" width={25} height={25} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                      </path>
                    </svg>
                    <span className="position-absolute top-0 start-100 translate-middle badge badge-count rounded-pill bg-primary">
                      {getTotalWishlistItems()}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </a>
                </div>
                <div className="list-inline-item d-block d-lg-none">
                  <a href="#" data-bs-toggle="modal" data-bs-target="#searchModal">
                    <svg aria-hidden="true" fill="none" focusable="false" width={24} height={24} className="icon-search" viewBox="0 0 24 24">
                      <path d="M10.364 3a7.364 7.364 0 1 0 0 14.727 7.364 7.364 0 0 0 0-14.727Z" stroke="#000" strokeWidth="1.5" strokeMiterlimit={10} />
                      <path d="M15.857 15.858 21 21.001" stroke="#000" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" />
                    </svg>
                  </a>
                  <div className="search-container">
                    {/* Mobile, table Search Modal */}
                    <div className="modal fade" id="searchModal" tabIndex={-1} aria-hidden="true">
                      <div className="modal-dialog modal-xl">
                        <div className="modal-content rounded-0">
                          <div className="modal-body">
                            <div className="row">
                              <div className="input-group">
                            <input type="text" className="form-control header-search" placeholder="Tìm kiếm..." />
                                <select id="searchSelect" className="form-select flex-shrink-0">
                              <option>Tất cả danh mục</option>
                              <option>Trái cây & Rau củ</option>
                              <option>Máy tính xách tay</option>
                              <option>Điện thoại thông minh</option>
                              <option>TV & Màn hình</option>
                              <option>Máy ảnh</option>
                              <option>Tai nghe</option>
                              <option>Bộ đàm</option>
                              <option>Máy in</option>
                              <option>Máy chơi game</option>
                              <option>Trò chơi</option>
                              <option>Lưu trữ</option>
                                </select>
                                <span className="input-group-text text-black bg-primary">
                                  <svg aria-hidden="true" fill="none" focusable="false" width={24} height={24} className="icon-search" viewBox="0 0 24 24">
                                    <path d="M10.364 3a7.364 7.364 0 1 0 0 14.727 7.364 7.364 0 0 0 0-14.727Z" stroke="#fff" strokeWidth="1.5" strokeMiterlimit={10} />
                                    <path d="M15.857 15.858 21 21.001" stroke="#fff" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-inline-item me-3 me-lg-0">
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate("cart"); }} className="text-muted position-relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon-cart" width={25} height={25} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx={9} cy={21} r={1} />
                      <circle cx={20} cy={21} r={1} />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6">
                      </path>
                    </svg>
                    <span className="position-absolute top-0 start-100 translate-middle badge badge-count rounded-pill bg-primary">
                      {getTotalItems()}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Navs */}
    <div className="header-bottom">
      <nav className="navbar navbar-expand-lg navbar-light navbar-default py-0 px-0" aria-label="Offcanvas navbar large">
        <div className="container">
          <div className="offcanvas offcanvas-start" tabIndex={-1} id="navbar-default" aria-labelledby="navbar-defaultLabel">
            <div className="offcanvas-header">
              {currentUser ? (
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon-account" width={25} height={25} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                    <span className="ms-2 fw-semibold">{currentUser.fullName}</span>
                  </div>
                  <div className="mt-2 d-flex gap-2">
                    {isAdmin && (
                      <button className="btn btn-sm btn-primary py-1 px-2" data-bs-dismiss="offcanvas" onClick={() => navigate("admin-dashboard")}>Admin</button>
                    )}
                    <button className="btn btn-sm btn-outline-danger py-1 px-2" data-bs-dismiss="offcanvas" onClick={() => { logout(); navigate("home"); }}>Đăng xuất</button>
                  </div>
                </div>
              ) : (
                <a href="#" onClick={(e) => { e.preventDefault(); navigate("login"); }} className="text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon-account" width={25} height={25} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                  <span className="ms-2 fw-semibold">Đăng nhập & Đăng ký</span>
                </a>
              )}
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body">
              <div className="d-block d-lg-none mb-4">
                <a className="btn btn-primary w-100 d-flex justify-content-center align-items-center collapsed" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <span className="me-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" className="icon icon-element">
                      <path d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52ZM22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77ZM10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52ZM10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Tất cả danh mục
                </a>
                <div className="mt-2 collapse" id="collapseExample">
                  <div className="card card-body">
                    <ul className="mb-0 list-unstyled">
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Phụ kiện Laptop</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Phụ kiện điện thoại</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Phụ kiện máy ảnh</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Trò chơi</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Thiết bị đeo thông minh</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Nhà thông minh</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Máy tính bảng</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row w-100 mx-0 py-0 p-0">
                <div className="col-12 col-sm-12 col-md-12 col-lg-3 py-0 px-0 mx-0">
                  <div className="dropdown d-none d-lg-block categories-section-lg">
                    <button className="btn w-100 text-nowrap department-all d-flex" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <svg viewBox="0 0 32 32" className="mt-1" xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="#000">
                        <path d="M17.5,11h-3a2,2,0,0,1-2-2V6a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2V9A2,2,0,0,1,17.5,11Z" />
                        <path d="M9,11H6A2,2,0,0,1,4,9V6A2,2,0,0,1,6,4H9a2,2,0,0,1,2,2V9A2,2,0,0,1,9,11Z" />
                        <path d="M26,11H23a2,2,0,0,1-2-2V6a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2V9A2,2,0,0,1,26,11Z" />
                        <path d="M17.5,28h-3a2,2,0,0,1-2-2V23a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2v3A2,2,0,0,1,17.5,28Z" />
                        <path d="M9,28H6a2,2,0,0,1-2-2V23a2,2,0,0,1,2-2H9a2,2,0,0,1,2,2v3A2,2,0,0,1,9,28Z" />
                        <path d="M26,28H23a2,2,0,0,1-2-2V23a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2v3A2,2,0,0,1,26,28Z" />
                        <path d="M17.5,19.5h-3a2,2,0,0,1-2-2v-3a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2v3A2,2,0,0,1,17.5,19.5Z" />
                        <path d="M9,19.5H6a2,2,0,0,1-2-2v-3a2,2,0,0,1,2-2H9a2,2,0,0,1,2,2v3A2,2,0,0,1,9,19.5Z" />
                        <path d="M26,19.5H23a2,2,0,0,1-2-2v-3a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2v3A2,2,0,0,1,26,19.5Z" />
                      </svg>
                      <span className="ms-4">Tất cả danh mục</span>
                    </button>
                    <ul className="dropdown-menu p-0 m-0 custom-dropdown" aria-labelledby="dropdownMenuButton1">
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Phụ kiện Laptop</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Phụ kiện điện thoại</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Phụ kiện máy ảnh</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Trò chơi</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Thiết bị đeo thông minh</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Nhà thông minh</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Máy tính bảng</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-9 overflow-x-auto px-0">
                  <div className="menu-item-list">
                    <ul className="navbar-nav align-items-start align-items-lg-center  py-0">
                      <li className="nav-item dropdown me-0 me-lg-2">
                        <a className="nav-link " href="#" onClick={(e) => { e.preventDefault(); navigate("home"); }}>Trang chủ</a>
                      </li>
                      <li className="nav-item dropdown  me-0 me-lg-2">
                        <a className="nav-link text-nowrap" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Ưu đãi hôm nay</a>
                      </li>
                      <li className="nav-item dropdown me-0 me-lg-2">
                        <a className="nav-link text-nowrap" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Khuyến mãi hè</a>
                      </li>
                      <li className="nav-item dropdown me-0 me-lg-2">
                        <a className="nav-link text-nowrap" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Cửa hàng</a>
                      </li>
                      <li className="nav-item dropdown dropdown-fullwidth me-0 me-lg-2">
                        <a className="nav-link dropdown-toggle text-nowrap" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Danh mục lớn</a>
                        <div className="dropdown-menu pb-0">
                          <div className="row p-2 p-lg-4">
                            <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                              <h6 className="text-primary ps-3">Phụ kiện Laptop</h6>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Chuột</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Bàn phím</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>USB</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Thẻ nhớ</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Bộ định tuyến</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Pin</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Bộ sạc</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>UPS</a>
                            </div>
                            <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                              <h6 className="text-primary ps-3">Phụ kiện điện thoại</h6>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Miếng dán màn hình</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Ốp lưng</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Cáp sạc</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Củ sạc</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Ống kính camera</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Đèn flash</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Sạc dự phòng</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>USB OTG</a>
                            </div>
                            <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                              <h6 className="text-primary ps-3">Phụ kiện máy ảnh</h6>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Máy ảnh lấy liền</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Flycam</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>DSLR</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Đèn flash máy ảnh</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Action Cam</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Ống kính</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Chân máy</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Máy ảnh du lịch</a>
                            </div>
                            <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                              <h6 className="text-primary ps-3">Camera Accessories</h6>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Instant Camera</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Drone</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>DSLR</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Flashes</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Sports & Action</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Camera Lens</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Camera tripods</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Point & Shoot</a>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="nav-item dropdown dropdown-fullwidth me-0 me-lg-2">
                        <a className="nav-link dropdown-toggle text-nowrap" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Trang</a>
                        <div className="dropdown-menu pb-0">
                          <div className="row p-2 p-lg-4">
                            <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                              <h6 className="text-primary ps-3">Cửa hàng</h6>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop"); }}>Danh sách sản phẩm</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("shop-single"); }}>Chi tiết sản phẩm</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("wishlist"); }}>Danh sách yêu thích</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("cart"); }}>Giỏ hàng</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("checkout"); }}>Thanh toán</a>
                            </div>
                            <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                              <h6 className="text-primary ps-3">Tài khoản</h6>
                              {currentUser ? (
                                <>
                                  <span className="dropdown-item text-muted disabled">Xin chào, {currentUser.fullName}</span>
                                  {isAdmin && (
                                    <a className="dropdown-item fw-bold text-primary" href="#" onClick={(e) => { e.preventDefault(); navigate("admin-dashboard"); }}>Dashboard Admin</a>
                                  )}
                                  <a className="dropdown-item text-danger" href="#" onClick={(e) => { e.preventDefault(); logout(); navigate("home"); }}>Đăng xuất</a>
                                </>
                              ) : (
                                <>
                                  <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("login"); }}>Đăng nhập</a>
                                  <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("signup"); }}>Đăng ký</a>
                                </>
                              )}
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("login"); }}>Quên mật khẩu</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("login"); }}>Tài khoản của tôi</a>
                            </div>
                            <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                              <h6 className="text-primary ps-3">Tin tức</h6>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("blog"); }}>Blog</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("blog-single"); }}>Chi tiết bài viết</a>
                            </div>
                            <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                              <h6 className="text-primary ps-3">Khác</h6>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("about"); }}>Về chúng tôi</a>
                              <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate("contact"); }}>Liên hệ</a>
                            </div>
                          </div>
                        </div>
                      </li>
                      {isAdmin && (
                        <li className="nav-item me-0 me-lg-2">
                          <a className="nav-link text-nowrap fw-semibold text-primary" href="#" onClick={(e) => { e.preventDefault(); navigate("admin-dashboard"); }}>
                            Admin
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    {/* Navs */}
  </header>
  {/* Header Section End */}
        </>
    )
}

export default Header
