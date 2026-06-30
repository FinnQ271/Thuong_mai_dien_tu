import { useState } from "react";
import { API_BASE_URL } from "../config";

interface SignupProps {
  navigate: (page: string) => void;
}

function Signup ({ navigate }: SignupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, fullName, phone }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMsg("Đăng ký tài khoản thành công! Đang chuyển hướng sang đăng nhập...");
        setTimeout(() => {
          navigate("login");
        }, 1500);
      } else {
        setErrorMsg(result.message || "Đăng ký thất bại.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMsg("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

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
<section className="auth-section mt-5">
  <div className="mt-4">
    <div className="mb-4 d-flex align-items-center justify-content-center gap-2">
      <img className="h-7" src="./assets/images/logo.png" alt="logo" style={{height: '1.75rem'}} />
    </div>
    <h2 className="mb-4 text-center h5 font-weight-bold text-secondary">
      Tạo tài khoản mới
    </h2>

    {errorMsg && (
      <div className="alert alert-danger text-center mb-3 py-2 small rounded">
        {errorMsg}
      </div>
    )}

    {successMsg && (
      <div className="alert alert-success text-center mb-3 py-2 small rounded">
        {successMsg}
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <div className="form-group position-relative mb-4">
        <input 
          type="text" 
          className="form-control py-2" 
          placeholder="Họ tên *" 
          required 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="form-group position-relative mb-4">
        <input 
          type="email" 
          id="input-email" 
          className="form-control py-2" 
          placeholder="Email *" 
          required 
          autoComplete="off" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group position-relative mb-4">
        <input 
          type="text" 
          className="form-control py-2" 
          placeholder="Số điện thoại" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="form-group position-relative mb-4">
        <input 
          type="password" 
          className="form-control input-password py-2" 
          placeholder="Mật khẩu *" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group position-relative mb-3">
        <input 
          type="password" 
          className="form-control input-password py-2" 
          placeholder="Xác nhận mật khẩu *" 
          required 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="d-flex align-items-center gap-2">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" defaultValue="" id="checkChecked" defaultChecked />
          <label className="form-check-label" htmlFor="checkChecked">
            Tôi đồng ý với các
          </label>
        </div>
        <a className="text-primary" href="#">điều khoản bảo mật</a>
      </div>
      <button className="btn btn-primary btn-block font-weight-bold custom-btn-p mt-3" type="submit" disabled={isLoading}>
        {isLoading ? "Đang xử lý..." : "Đăng ký"}
      </button>
    </form>
      <div className="my-4 d-flex align-items-center text-center">
        <span className="w-100 border-bottom border-secondary" />
        <span className="mx-2 text-uppercase small">Or</span>
        <span className="w-100 border-bottom border-secondary" />
      </div>
      <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
        <a href="#" className="mr-4 mb-3 py-3 btn btn-light w-100 d-flex align-items-center justify-content-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={30} height={30} viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
          </svg>
        </a>
        <a href="#" className="mr-4 mb-3 btn py-3 btn-light w-100 d-flex align-items-center justify-content-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={30} height={30} viewBox="0 0 48 48">
            <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse">
              <stop offset={0} stopColor="#2aa4f4" />
              <stop offset={1} stopColor="#007ad9" />
            </linearGradient>
            <path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z" />
            <path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z" />
          </svg>
        </a>
        <a href="#" className="btn mb-3 py-3 btn-light w-100 d-flex align-items-center justify-content-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={30} height={30}>
            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.2 1.87.86 2.33.66.07-.52.28-.86.51-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.03 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>
      <p className="mt-4 text-center">
        You have an account?
        <a className="text-primary" href="login.html">Sign In</a>
      </p>
    </div>
  </section>
</div>

        </>
    )
}

export default Signup;