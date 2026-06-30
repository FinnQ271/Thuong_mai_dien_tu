function Footer () {
    return(
        <>
        <footer className="mt-70">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 mb-4 mb-md-0">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-12">
              <div className="footer_logo">
                <img loading="lazy" src="./assets/images/logo.png" className="logo" alt="easy shop" />
              </div>
              <div className="mt-4">
                <p>Lorem ipsum, or lipsum as it is sometimes kno wn, is dummy text used in laying out print,
                  gra phic or web designs the passage.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-12">
              <div className="footer_newsletter pe-lg-5">
                <h4 className="text-uppercase">Newsletter</h4>
                <div className="input-group">
                  <input id="searchInput" className="form-control w-50" type="text" placeholder="Your email address" />
                  <button type="button" className="btn btn-primary bg-gradient">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-3 mb-md-0">
          <div className="row">
            <div className="col-6">
              <div className="footer_menu">
                <h4 className="footer_title">My Account</h4>
                <ul className="m-0 p-0 list-unstyled">
                  <li><a href="#">Orders</a></li>
                  <li><a href="#">Wishlist</a></li>
                  <li><a href="#">Track Order</a></li>
                  <li><a href="#">Manage Account</a></li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <div className="footer_menu">
                <h4 className="footer_title">Information</h4>
                <ul className="m-0 p-0 list-unstyled">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Return Policy</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="footer_download">
            <div className="row">
              <div className="col-lg-6 col-lg-12">
                <h4 className="footer_title">Contact</h4>
                <div className="footer_contact">
                  <p>
                    <span className="icn"><i className="fa-solid fa-location-dot" /></span>
                    Widgetify Inc. 456 Gadget Avenue <br />
                    Techtown, TX 67890 <br />
                    United States of America
                  </p>
                  <p className="phn">
                    <span className="icn"><i className="fa-solid fa-phone" /></span>
                    (987) 654-3210, (555) 123-4567
                  </p>
                  <p className="eml">
                    <span className="icn"><i className="fa-solid fa-envelope" /></span>
                    info@example.com
                  </p>
                </div>
              </div>
              <div className="footer_social col-lg-6 col-lg-12">
                <div className="footer_icon d-flex mt-1">
                  <a href="#" className="facebook pe-3"><i className="fa-brands fa-facebook" /></a>
                  <a href="#" className="twitter pe-3"><i className="fa-brands fa-x-twitter" /></a>
                  <a href="#" className="instagram pe-3"><i className="fa-brands fa-instagram" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
        </>
    )
}

export default Footer;