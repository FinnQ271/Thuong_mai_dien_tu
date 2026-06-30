import { useEffect, useState } from "react"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import Footer from "./components/Footer"
import Header from "./components/Header"
import About from "./pages/About"
import Blog from "./pages/Blog"
import BlogSingle from "./pages/BlogSingle"
import CartNew from "./pages/CartNew"
import Checkout from "./pages/Checkout"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ShopNew from "./pages/ShopNew"
import ShopSingle from "./pages/ShopSingle"
import Signup from "./pages/Signup"
import Wishlist from "./pages/Wishlist"
import ThankYou from "./pages/ThankYou"
import AdminDashboard from "./pages/AdminDashboard"
import { useAuth } from "./context/AuthContext"

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [pageParams, setPageParams] = useState<{ productId?: number } | undefined>(undefined)
  const { isAdmin, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && currentPage === "admin-dashboard" && !isAdmin) {
      alert("Bạn không có quyền truy cập trang quản trị!");
      setCurrentPage("home");
    }
  }, [currentPage, isAdmin, authLoading]);

  const navigate = (page: string, params?: { productId?: number }) => {
    setCurrentPage(page)
    setPageParams(params ?? undefined)

    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }


  useEffect(() => {
    const handleTemplateLink = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const link = target?.closest("a")
      if (!link) return

      const href = link.getAttribute("href")
      const pageMap: Record<string, { page: string; params?: { productId?: number } }> = {
        "index.html": { page: "home" },
        "shop.html": { page: "shop" },
        "shop-single.html": { page: "shop-single", params: { productId: 1 } },
        "checkout.html": { page: "checkout" },
        "login.html": { page: "login" },
        "signup.html": { page: "signup" },
        "blog.html": { page: "blog" },
        "blog-single.html": { page: "blog-single" },
        "contact.html": { page: "contact" },
        "about.html": { page: "about" },
      }

      if (href && pageMap[href]) {
        event.preventDefault()
        const next = pageMap[href]
        navigate(next.page, next.params)
      }
    }

    document.addEventListener("click", handleTemplateLink)

    return () => {
      document.removeEventListener("click", handleTemplateLink)
    }
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home navigate={navigate} />

      case "about":
        return <About />

      case "contact":
        return <Contact />

      case "shop":
        return <ShopNew navigate={navigate} />

      case "shop-single":
        return <ShopSingle productId={pageParams?.productId} navigate={navigate} />

      case "cart":
        return <CartNew navigate={navigate} />

      case "checkout":
        return <Checkout navigate={navigate} />

        case "thank-you":
  return <ThankYou navigate={navigate} />

      case "wishlist":
        return <Wishlist />

      case "login":
        return <Login navigate={navigate} />

      case "admin-dashboard":
        return isAdmin ? <AdminDashboard /> : <Home navigate={navigate} />;

      case "signup":
        return <Signup navigate={navigate} />

      case "blog":
        return <Blog />
        

      case "blog-single":
        return <BlogSingle />

      default:
        return <Home navigate={navigate} />
    }
  }

  return (
    <CartProvider>
      <WishlistProvider>
        <Header navigate={navigate} />
        {renderPage()}
        <Footer />
      </WishlistProvider>
    </CartProvider>
  )
}

export default App