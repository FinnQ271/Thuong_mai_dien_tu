function About () {
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
      <a href="/">
        <svg className="text-primary" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 576 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
          <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
        </svg>
      </a>
      <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-muted ml-2" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
    <div className="d-flex align-items-center gap-2 ml-1">
      <a className="text-muted text-decoration-none pointer-events-none" href="#">About</a>
    </div>
  </nav>
  {/* end breadcrumbs */}
  <section className="about-section">
    <div className="container mt-50">
      <div className="text-center">
        <h1>About Us</h1>
      </div>
      <div className="about-desc mt-4">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi eligendi quam dicta rem, voluptatibus architecto iste laborum non natus doloremque consequuntur inventore voluptatem, nisi exercitationem temporibus expedita repellendus molestias praesentium veritatis dolorem sed odit tenetur. Officia autem reiciendis dignissimos non vel impedit, dicta molestias nostrum cumque sequi, porro quaerat adipisci nemo earum. Magnam esse dolore culpa aut. Nemo, sequi? Veniam reprehenderit, animi optio harum laboriosam dolores ipsam! Perferendis id iusto neque nulla ipsa, corrupti, fugit vero accusantium fugiat non aspernatur perspiciatis odio rem unde sapiente! Aperiam ratione dolores veritatis aliquam mollitia ipsum consectetur ad assumenda ducimus sint, ea nulla suscipit.</p>
      </div>
    </div>
  </section>
</div>

        </>
    )
}

export default About;