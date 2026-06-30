import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

interface Order {
  id: string;
  order_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  note: string;
  status: 'pending' | 'confirmed' | 'shipping' | 'completed' | 'cancelled';
  payment_method: string;
  payment_status: 'unpaid' | 'paid' | 'refunded';
  subtotal: number;
  shipping_fee: number;
  discount_amount: number;
  total_amount: number;
  created_at: string;
  order_items?: OrderItem[];
}

interface OrderItem {
  id: number;
  product_name: string;
  selected_color?: string;
  selected_size?: string;
  price: number;
  quantity: number;
  line_total: number;
}

interface ContactMessage {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'processing' | 'resolved' | 'closed';
  admin_note: string;
  created_at: string;
}

interface UserAccount {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  roles?: {
    code: string;
    name: string;
    level: number;
  };
}

interface ProductItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categorySlug?: string;
  stockQuantity: number;
  inStock: boolean;
  discount: number;
  description: string;
  isFeatured: boolean;
  isActive: boolean;
}

interface DashboardStats {
  total_products: number;
  total_orders: number;
  new_contacts: number;
  total_revenue: number;
  out_of_stock_products: number;
}

export function AdminDashboard() {
  const { token, currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'contacts' | 'products' | 'orders'>('overview');
  
  // Data States
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [latestOrders, setLatestOrders] = useState<Order[]>([]);
  const [latestContacts, setLatestContacts] = useState<ContactMessage[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // UI States
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Modals & Action States
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [contactAdminNote, setContactAdminNote] = useState('');
  const [contactStatus, setContactStatus] = useState<any>('new');
  
  // Product Creation States
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductOriginalPrice, setNewProductOriginalPrice] = useState(0);
  const [newProductStock, setNewProductStock] = useState(10);
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductImage, setNewProductImage] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductIsFeatured, setNewProductIsFeatured] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  } | null>(null);
  const [deleteProductTarget, setDeleteProductTarget] = useState<ProductItem | null>(null);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);

  // Helper formats
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('vi-VN');
  };

  const showNotification = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ title, message, type });
  };

  // Fetch Dashboard Stats & Overview
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStats(data.data.stats);
        setLatestOrders(data.data.latestOrders);
        setLatestContacts(data.data.latestContacts);
      } else {
        setErrorMsg(data.message || 'Lỗi tải dữ liệu dashboard');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Không thể kết nối API Dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Contacts
  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact?status=all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setContacts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products?active=all&limit=100`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      const data = await res.json();
      if (res.ok && data.success) {
        // filter out 'all' category
        setCategories(data.data.filter((c: any) => c.slug !== 'all'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Orders
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders?status=all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      if (activeTab === 'overview') fetchDashboardData();
      if (activeTab === 'users') fetchUsers();
      if (activeTab === 'contacts') fetchContacts();
      if (activeTab === 'products') {
        fetchProducts();
        fetchCategories();
      }
      if (activeTab === 'orders') fetchOrders();
    }
  }, [activeTab, token]);

  // Handle Update Contact
  const handleUpdateContact = async () => {
    if (!selectedContact) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/contacts/${selectedContact.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: contactStatus,
          adminNote: contactAdminNote
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert('Cập nhật liên hệ thành công!');
        setSelectedContact(null);
        fetchContacts();
      } else {
        alert(data.message || 'Lỗi cập nhật');
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ');
    }
  };

  // Handle Update Order Status
  const handleUpdateOrder = async (orderId: string, status: string, paymentStatus: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, paymentStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert('Cập nhật đơn hàng thành công!');
        fetchOrders();
        // Update selected order details
        const detailsRes = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const detailsData = await detailsRes.json();
        if (detailsRes.ok && detailsData.success) {
          setSelectedOrder(detailsData.data);
        }
      } else {
        alert(data.message || 'Lỗi cập nhật');
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ');
    }
  };

  // Handle Toggle Product Active status
  const handleToggleProduct = async (productId: number, currentActive: boolean) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentActive })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('Cập nhật thành công', 'Trạng thái sản phẩm đã được cập nhật.');
        fetchProducts();
      } else {
        showNotification('Cập nhật thất bại', data.message || 'Lỗi cập nhật sản phẩm', 'error');
      }
    } catch (err) {
      showNotification('Không thể kết nối', 'Lỗi kết nối máy chủ', 'error');
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = (product: ProductItem) => {
    setDeleteProductTarget(product);
  };

  const confirmDeleteProduct = async () => {
    if (!deleteProductTarget) return;

    setIsDeletingProduct(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${deleteProductTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('Xóa thành công', data.message || 'Xóa sản phẩm thành công!');
        setDeleteProductTarget(null);
        fetchProducts();
      } else {
        showNotification('Xóa thất bại', data.message || 'Lỗi khi xóa sản phẩm', 'error');
      }
    } catch (err) {
      showNotification('Không thể kết nối', 'Lỗi kết nối máy chủ', 'error');
    } finally {
      setIsDeletingProduct(false);
    }
  };

  const clearProductForm = () => {
    setNewProductName('');
    setNewProductPrice(0);
    setNewProductOriginalPrice(0);
    setNewProductStock(10);
    setNewProductDescription('');
    setNewProductImage('');
    setNewProductCategory('');
    setNewProductIsFeatured(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product: ProductItem) => {
    setEditingProduct(product);
    setNewProductName(product.name);
    setNewProductPrice(product.price);
    setNewProductOriginalPrice(product.originalPrice || 0);
    setNewProductStock(product.stockQuantity);
    setNewProductDescription(product.description || '');
    setNewProductImage(product.image || '');
    
    // Find matching category slug from local list or categories API
    const matchingCat = categories.find(c => c.name.toLowerCase() === product.category.toLowerCase());
    setNewProductCategory(matchingCat ? matchingCat.slug : product.categorySlug || '');
    
    setNewProductIsFeatured(product.isFeatured);
    setShowAddProduct(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNewProductImage(data.data.url);
      } else {
        showNotification('Tải ảnh thất bại', data.message || 'Lỗi tải ảnh lên', 'error');
      }
    } catch (err) {
      console.error(err);
      showNotification('Không thể kết nối', 'Không thể kết nối máy chủ tải ảnh', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Save Product (Create or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice || !newProductCategory) {
      showNotification('Thiếu thông tin', 'Vui lòng điền đủ Tên, Giá và Danh mục sản phẩm', 'error');
      return;
    }

    const isEdit = !!editingProduct;
    const url = isEdit 
      ? `${API_BASE_URL}/api/products/${editingProduct.id}`
      : `${API_BASE_URL}/api/products`;
    const method = isEdit ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newProductName,
          price: newProductPrice,
          originalPrice: newProductOriginalPrice || null,
          stockQuantity: newProductStock,
          description: newProductDescription,
          imageUrl: newProductImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
          categorySlug: newProductCategory,
          isFeatured: newProductIsFeatured,
          isActive: true
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showNotification(
          isEdit ? 'Sửa thành công' : 'Thêm thành công',
          isEdit ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!'
        );
        setShowAddProduct(false);
        clearProductForm();
        fetchProducts();
      } else {
        showNotification(
          isEdit ? 'Sửa thất bại' : 'Thêm thất bại',
          data.message || (isEdit ? 'Lỗi cập nhật sản phẩm' : 'Lỗi thêm sản phẩm'),
          'error'
        );
      }
    } catch (err) {
      showNotification('Không thể kết nối', 'Lỗi kết nối máy chủ', 'error');
    }
  };

  return (
    <div className="container-fluid min-vh-100 p-0 d-flex flex-column flex-md-row bg-light" style={{ fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Sidebar Section */}
      <aside className="bg-dark text-white p-3 d-flex flex-column justify-content-between col-12 col-md-3 col-lg-2 shadow-sm">
        <div>
          <div className="d-flex align-items-center justify-content-center py-4 border-bottom border-secondary mb-4 gap-2">
            <img src="./assets/images/logo.png" alt="logo" className="img-fluid" style={{ maxWidth: '140px', filter: 'brightness(0) invert(1)' }} />
          </div>
          
          <nav className="nav flex-column gap-2">
            <button 
              className={`nav-link text-start text-white border-0 py-3 px-3 rounded d-flex align-items-center gap-2 ${activeTab === 'overview' ? 'bg-primary fw-bold shadow' : 'bg-transparent'}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="fas fa-chart-line"></i> Tổng quan
            </button>
            
            <button 
              className={`nav-link text-start text-white border-0 py-3 px-3 rounded d-flex align-items-center gap-2 ${activeTab === 'users' ? 'bg-primary fw-bold shadow' : 'bg-transparent'}`}
              onClick={() => setActiveTab('users')}
            >
              <i className="fas fa-users"></i> Tài khoản
            </button>
            
            <button 
              className={`nav-link text-start text-white border-0 py-3 px-3 rounded d-flex align-items-center gap-2 ${activeTab === 'contacts' ? 'bg-primary fw-bold shadow' : 'bg-transparent'}`}
              onClick={() => setActiveTab('contacts')}
            >
              <i className="fas fa-comment-alt"></i> Liên hệ / Khiếu nại
            </button>
            
            <button 
              className={`nav-link text-start text-white border-0 py-3 px-3 rounded d-flex align-items-center gap-2 ${activeTab === 'products' ? 'bg-primary fw-bold shadow' : 'bg-transparent'}`}
              onClick={() => setActiveTab('products')}
            >
              <i className="fas fa-box-open"></i> Sản phẩm
            </button>
            
            <button 
              className={`nav-link text-start text-white border-0 py-3 px-3 rounded d-flex align-items-center gap-2 ${activeTab === 'orders' ? 'bg-primary fw-bold shadow' : 'bg-transparent'}`}
              onClick={() => setActiveTab('orders')}
            >
              <i className="fas fa-shopping-bag"></i> Đơn hàng
            </button>
          </nav>
        </div>
        
        <div className="mt-5 border-top border-secondary pt-3">
          <div className="small text-muted mb-2 px-3">Quản trị: {currentUser?.fullName}</div>
          <button 
            className="btn btn-outline-danger btn-sm w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            onClick={() => { logout(); window.location.reload(); }}
          >
            <i className="fas fa-sign-out-alt"></i> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="col-12 col-md-9 col-lg-10 p-4 overflow-y-auto" style={{ maxHeight: '100vh' }}>
        
        {/* Header bar */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center border-bottom pb-3 mb-4 gap-2">
          <div>
            <h2 className="fw-bold mb-0 text-capitalize text-dark">
              {activeTab === 'overview' && 'Trang Quản Trị Hệ Thống'}
              {activeTab === 'users' && 'Quản Lý Tài Khoản'}
              {activeTab === 'contacts' && 'Hộp Thư Liên Hệ & Khiếu Nại'}
              {activeTab === 'products' && 'Quản Lý Danh Sách Sản Phẩm'}
              {activeTab === 'orders' && 'Quản Lý Đơn Hàng'}
            </h2>
            <p className="text-muted mb-0 small">Bảng điều khiển RivoraMart Super Admin</p>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-secondary p-2">Level: {currentUser?.roleLevel} ({currentUser?.roleName})</span>
            <a href="index.html" className="btn btn-primary btn-sm px-3 rounded shadow-sm d-flex align-items-center gap-1">
              <i className="fas fa-store"></i> Xem Cửa Hàng
            </a>
          </div>
        </div>

        {/* Global Loading Spinner */}
        {isLoading && (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="alert alert-danger shadow-sm mb-4" role="alert">
            <i className="fas fa-exclamation-circle me-2"></i> {errorMsg}
          </div>
        )}

        {/* -------------------- TAB CONTENT: OVERVIEW -------------------- */}
        {!isLoading && activeTab === 'overview' && stats && (
          <div className="animate-fade-in">
            {/* Stats grid */}
            <div className="row g-4 mb-4">
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded p-3 h-100 border-start border-primary border-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="text-muted mb-1 small text-uppercase">Doanh Thu</p>
                      <h4 className="fw-bold mb-0 text-primary">{formatPrice(stats.total_revenue)}</h4>
                    </div>
                    <div className="bg-primary-light p-3 rounded text-primary fs-3">
                      <i className="fas fa-money-bill-wave"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded p-3 h-100 border-start border-success border-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="text-muted mb-1 small text-uppercase">Số Đơn Hàng</p>
                      <h4 className="fw-bold mb-0 text-success">{stats.total_orders}</h4>
                    </div>
                    <div className="bg-success-light p-3 rounded text-success fs-3">
                      <i className="fas fa-shopping-cart"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded p-3 h-100 border-start border-warning border-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="text-muted mb-1 small text-uppercase">Liên Hệ Mới</p>
                      <h4 className="fw-bold mb-0 text-warning">{stats.new_contacts}</h4>
                    </div>
                    <div className="bg-warning-light p-3 rounded text-warning fs-3">
                      <i className="fas fa-envelope-open-text"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded p-3 h-100 border-start border-danger border-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="text-muted mb-1 small text-uppercase">Sản Phẩm Hết Hàng</p>
                      <h4 className="fw-bold mb-0 text-danger">{stats.out_of_stock_products}</h4>
                    </div>
                    <div className="bg-danger-light p-3 rounded text-danger fs-3">
                      <i className="fas fa-exclamation-triangle"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-grid: Latest Orders & Latest Contacts */}
            <div className="row g-4">
              {/* Latest Orders */}
              <div className="col-12 col-xl-6">
                <div className="card border-0 shadow-sm rounded h-100">
                  <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0 text-dark"><i className="fas fa-shopping-basket me-2 text-primary"></i>Đơn Hàng Mới Nhất</h5>
                    <button className="btn btn-link btn-sm text-primary p-0 text-decoration-none" onClick={() => setActiveTab('orders')}>Xem tất cả</button>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {latestOrders.length > 0 ? (
                            latestOrders.map(order => (
                              <tr key={order.id}>
                                <td className="fw-bold text-dark">{order.order_code}</td>
                                <td>{order.customer_name}</td>
                                <td className="fw-bold text-primary">{formatPrice(order.total_amount)}</td>
                                <td>
                                  <span className={`badge ${
                                    order.status === 'completed' ? 'bg-success' :
                                    order.status === 'pending' ? 'bg-warning text-dark' :
                                    order.status === 'cancelled' ? 'bg-danger' : 'bg-info'
                                  }`}>
                                    {order.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="text-center py-4 text-muted">Chưa có đơn hàng nào</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Contacts */}
              <div className="col-12 col-xl-6">
                <div className="card border-0 shadow-sm rounded h-100">
                  <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0 text-dark"><i className="fas fa-envelope me-2 text-warning"></i>Ý Kiến & Khiếu Nại Mới</h5>
                    <button className="btn btn-link btn-sm text-primary p-0 text-decoration-none" onClick={() => setActiveTab('contacts')}>Xem tất cả</button>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Khách hàng</th>
                            <th>Tiêu đề</th>
                            <th>Ngày gửi</th>
                            <th>Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {latestContacts.length > 0 ? (
                            latestContacts.map(contact => (
                              <tr key={contact.id}>
                                <td className="fw-bold text-dark">{contact.first_name} {contact.last_name}</td>
                                <td>{contact.subject}</td>
                                <td>{new Date(contact.created_at).toLocaleDateString('vi-VN')}</td>
                                <td>
                                  <span className={`badge ${
                                    contact.status === 'new' ? 'bg-danger' :
                                    contact.status === 'resolved' ? 'bg-success' : 'bg-secondary'
                                  }`}>
                                    {contact.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="text-center py-4 text-muted">Không có khiếu nại mới nào</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- TAB CONTENT: USERS -------------------- */}
        {!isLoading && activeTab === 'users' && (
          <div className="card border-0 shadow-sm rounded animate-fade-in">
            <div className="card-header bg-white py-3 border-0">
              <h5 className="fw-bold mb-0 text-dark">Danh Sách Tài Khoản Người Dùng</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Avatar</th>
                      <th>Họ tên</th>
                      <th>Email</th>
                      <th>Điện thoại</th>
                      <th>Vai trò</th>
                      <th>Đăng nhập cuối</th>
                      <th>Ngày tạo</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>
                          <img 
                            src={u.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'} 
                            alt="avatar" 
                            className="rounded-circle border" 
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          />
                        </td>
                        <td className="fw-bold text-dark">{u.full_name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone || 'Chưa cập nhật'}</td>
                        <td>
                          <span className={`badge ${u.roles?.level && u.roles.level >= 80 ? 'bg-danger' : 'bg-secondary'}`}>
                            {u.roles?.name || 'Khách hàng'}
                          </span>
                        </td>
                        <td>{formatDate(u.last_login_at || '')}</td>
                        <td>{new Date(u.created_at).toLocaleDateString('vi-VN')}</td>
                        <td>
                          <span className={`badge ${u.is_active ? 'bg-success' : 'bg-danger'}`}>
                            {u.is_active ? 'Đang hoạt động' : 'Bị khóa'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- TAB CONTENT: CONTACTS -------------------- */}
        {!isLoading && activeTab === 'contacts' && (
          <div className="row g-4 animate-fade-in">
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow-sm rounded">
                <div className="card-header bg-white py-3 border-0">
                  <h5 className="fw-bold mb-0 text-dark">Danh Sách Câu Hỏi & Khiếu Nại</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Khách hàng</th>
                          <th>Chủ đề</th>
                          <th>Ngày tạo</th>
                          <th>Trạng thái</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map(c => (
                          <tr key={c.id} className={c.status === 'new' ? 'table-warning-light' : ''}>
                            <td>
                              <div className="fw-bold text-dark">{c.first_name} {c.last_name}</div>
                              <small className="text-muted">{c.email}</small>
                            </td>
                            <td className="fw-medium">{c.subject}</td>
                            <td>{formatDate(c.created_at)}</td>
                            <td>
                              <span className={`badge ${
                                c.status === 'new' ? 'bg-danger' :
                                c.status === 'processing' ? 'bg-warning text-dark' :
                                c.status === 'resolved' ? 'bg-success' : 'bg-secondary'
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => {
                                  setSelectedContact(c);
                                  setContactAdminNote(c.admin_note || '');
                                  setContactStatus(c.status);
                                }}
                              >
                                Chi tiết / Xử lý
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details Panel */}
            <div className="col-12 col-lg-4">
              {selectedContact ? (
                <div className="card border-0 shadow-sm rounded p-4 sticky-top animate-fade-in" style={{ top: '100px' }}>
                  <h5 className="fw-bold text-dark border-bottom pb-3 mb-3">Xử Lý Liên Hệ & Khiếu Nại</h5>
                  
                  <div className="mb-3">
                    <p className="mb-1 text-muted small">Khách hàng gửi</p>
                    <p className="fw-bold mb-0 text-dark">{selectedContact.first_name} {selectedContact.last_name}</p>
                    <p className="mb-0 small text-muted">{selectedContact.email} | {selectedContact.phone || 'Không để lại SĐT'}</p>
                  </div>
                  
                  <div className="mb-3">
                    <p className="mb-1 text-muted small">Tiêu đề</p>
                    <p className="fw-bold text-dark mb-0">{selectedContact.subject}</p>
                  </div>
                  
                  <div className="mb-3 p-3 bg-light rounded text-dark" style={{ whiteSpace: 'pre-wrap' }}>
                    <p className="mb-1 text-muted small border-bottom pb-1">Nội dung tin nhắn</p>
                    {selectedContact.message}
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label text-muted small">Cập nhật trạng thái</label>
                    <select 
                      className="form-select"
                      value={contactStatus}
                      onChange={(e) => setContactStatus(e.target.value)}
                    >
                      <option value="new">Mới nhận (New)</option>
                      <option value="processing">Đang xử lý (Processing)</option>
                      <option value="resolved">Đã giải quyết (Resolved)</option>
                      <option value="closed">Đóng phiếu (Closed)</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-muted small">Ghi chú của Admin</label>
                    <textarea 
                      className="form-control"
                      rows={4}
                      placeholder="Nhập ghi chú phản hồi, hành động đã thực hiện..."
                      value={contactAdminNote}
                      onChange={(e) => setContactAdminNote(e.target.value)}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-primary w-100 py-2" onClick={handleUpdateContact}>Lưu thông tin</button>
                    <button className="btn btn-outline-secondary w-100 py-2" onClick={() => setSelectedContact(null)}>Hủy</button>
                  </div>
                </div>
              ) : (
                <div className="card border-0 shadow-sm rounded p-4 text-center text-muted">
                  <i className="fas fa-info-circle fa-2x mb-3 text-secondary"></i>
                  <p className="mb-0">Chọn một tin nhắn khiếu nại trong danh sách để xem chi tiết và cập nhật tiến trình giải quyết.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* -------------------- TAB CONTENT: PRODUCTS -------------------- */}
        {!isLoading && activeTab === 'products' && (
          <div className="d-flex flex-column gap-4 animate-fade-in">
            {/* Create Product Button & Box */}
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0 text-dark">Quản Lý Sản Phẩm</h5>
              <button 
                className={`btn ${showAddProduct ? 'btn-secondary' : 'btn-success'} d-flex align-items-center gap-1 shadow-sm`}
                onClick={() => {
                  if (showAddProduct) {
                    clearProductForm();
                    setShowAddProduct(false);
                  } else {
                    clearProductForm();
                    setShowAddProduct(true);
                  }
                }}
              >
                <i className="fas fa-plus"></i> {showAddProduct ? 'Đóng form' : 'Thêm Sản Phẩm Mới'}
              </button>
            </div>

            {showAddProduct && (
              <div className="card border-0 shadow-sm rounded p-4 animate-slide-down">
                <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
                  {editingProduct ? `Chỉnh Sửa Sản Phẩm: ${editingProduct.name}` : 'Thêm Sản Phẩm Mới Vào Hệ Thống'}
                </h5>
                <form onSubmit={handleSaveProduct}>
                  <div className="row g-3">
                    <div className="col-md-6 col-12">
                      <label className="form-label small text-muted">Tên sản phẩm *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        required 
                        placeholder="Ví dụ: Tai nghe Bluetooth A1"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 col-12">
                      <label className="form-label small text-muted">Danh mục *</label>
                      <select 
                        className="form-select"
                        required
                        value={newProductCategory}
                        onChange={(e) => setNewProductCategory(e.target.value)}
                      >
                        <option value="">Chọn danh mục</option>
                        {categories.map((c: any) => (
                          <option key={c.databaseId} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="form-label small text-muted">Giá bán lẻ (VND) *</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        required 
                        min="0"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="form-label small text-muted">Giá gốc ban đầu (VND - Tùy chọn)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        min="0"
                        value={newProductOriginalPrice}
                        onChange={(e) => setNewProductOriginalPrice(parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="form-label small text-muted">Số lượng trong kho *</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        required 
                        min="0"
                        value={newProductStock}
                        onChange={(e) => setNewProductStock(parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="col-md-12 col-12">
                      <label className="form-label small text-muted font-weight-semibold">Hình ảnh sản phẩm *</label>
                      <div className="row align-items-center g-3">
                        <div className="col-sm-3 col-12 text-center">
                          {newProductImage ? (
                            <img 
                              src={newProductImage} 
                              alt="Xem trước" 
                              className="img-fluid rounded border shadow-sm" 
                              style={{ maxHeight: '100px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div className="border rounded d-flex align-items-center justify-content-center bg-light text-muted" style={{ height: '100px' }}>
                              <i className="fas fa-image fa-2x"></i>
                            </div>
                          )}
                        </div>
                        <div className="col-sm-9 col-12">
                          <div className="mb-2">
                            <input 
                              type="file" 
                              className="form-control" 
                              accept="image/*"
                              onChange={handleImageUpload}
                              disabled={isUploading}
                            />
                            {isUploading && (
                              <div className="small text-primary mt-1">
                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                Đang tải ảnh lên...
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="small text-muted d-block mb-1">Hoặc nhập URL trực tiếp:</span>
                            <input 
                              type="text" 
                              className="form-control form-control-sm" 
                              placeholder="https://images.unsplash.com/..."
                              value={newProductImage}
                              onChange={(e) => setNewProductImage(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 col-12">
                      <label className="form-label small text-muted">Mô tả sản phẩm</label>
                      <textarea 
                        className="form-control" 
                        rows={3} 
                        placeholder="Nhập mô tả chi tiết sản phẩm..."
                        value={newProductDescription}
                        onChange={(e) => setNewProductDescription(e.target.value)}
                      />
                    </div>

                    <div className="col-md-12 col-12">
                      <div className="form-check form-switch mt-2">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="featuredSwitch" 
                          checked={newProductIsFeatured}
                          onChange={(e) => setNewProductIsFeatured(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="featuredSwitch">Sản phẩm nổi bật (Featured Product)</label>
                      </div>
                    </div>

                    <div className="col-12 mt-4 d-flex gap-2">
                      <button className="btn btn-primary px-4 py-2" type="submit" disabled={isUploading}>
                        {isUploading ? 'Đang tải ảnh...' : editingProduct ? 'Cập Nhật Sản Phẩm' : 'Lưu Sản Phẩm'}
                      </button>
                      <button className="btn btn-outline-secondary px-4 py-2" type="button" onClick={() => { clearProductForm(); setShowAddProduct(false); }}>
                        Hủy
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Product Table */}
            <div className="card border-0 shadow-sm rounded">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Giá bán</th>
                        <th>Tồn kho</th>
                        <th>Nổi bật</th>
                        <th>Hiển thị</th>
                        <th className="text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id}>
                          <td>
                            <img 
                              src={p.image} 
                              alt="product" 
                              className="rounded border" 
                              style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                            />
                          </td>
                          <td>
                            <div className="fw-bold text-dark">{p.name}</div>
                            <small className="text-muted">Slug: {p.slug}</small>
                          </td>
                          <td>{p.category}</td>
                          <td>
                            <div className="fw-bold text-primary">{formatPrice(p.price)}</div>
                            {p.originalPrice && p.originalPrice > p.price && (
                              <small className="text-muted text-decoration-line-through">{formatPrice(p.originalPrice)}</small>
                            )}
                          </td>
                          <td>
                            <span className={`fw-semibold ${p.stockQuantity === 0 ? 'text-danger' : 'text-dark'}`}>
                              {p.stockQuantity} chiếc
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${p.isFeatured ? 'bg-warning text-dark' : 'bg-light text-muted'}`}>
                              {p.isFeatured ? 'Nổi bật' : 'Thường'}
                            </span>
                          </td>
                          <td>
                            <div className="form-check form-switch">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                checked={!!p.isActive}
                                onChange={() => handleToggleProduct(p.id, !!p.isActive)}
                              />
                              <span className="small text-muted">{p.isActive ? 'Hiện' : 'Ẩn'}</span>
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-2">
                              <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditClick(p)}
                              >
                                <i className="fas fa-edit me-1"></i> Sửa
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteProduct(p)}
                              >
                                <i className="fas fa-trash-alt me-1"></i> Xóa sản phẩm
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- TAB CONTENT: ORDERS -------------------- */}
        {!isLoading && activeTab === 'orders' && (
          <div className="row g-4 animate-fade-in">
            <div className="col-12 col-lg-7">
              <div className="card border-0 shadow-sm rounded">
                <div className="card-header bg-white py-3 border-0">
                  <h5 className="fw-bold mb-0 text-dark">Danh Sách Đơn Hàng Hệ Thống</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Mã đơn</th>
                          <th>Khách hàng</th>
                          <th>Ngày đặt</th>
                          <th>Tổng tiền</th>
                          <th>Trạng thái</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o.id}>
                            <td className="fw-bold text-dark">{o.order_code}</td>
                            <td>
                              <div className="fw-bold text-dark">{o.customer_name}</div>
                              <small className="text-muted">{o.customer_phone}</small>
                            </td>
                            <td>{new Date(o.created_at).toLocaleDateString('vi-VN')}</td>
                            <td className="fw-bold text-primary">{formatPrice(o.total_amount)}</td>
                            <td>
                              <span className={`badge ${
                                o.status === 'completed' ? 'bg-success' :
                                o.status === 'pending' ? 'bg-warning text-dark' :
                                o.status === 'cancelled' ? 'bg-danger' :
                                o.status === 'shipping' ? 'bg-primary' : 'bg-info'
                              }`}>
                                {o.status}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={async () => {
                                  setIsLoading(true);
                                  try {
                                    const res = await fetch(`${API_BASE_URL}/api/orders/${o.id}`, {
                                      headers: { Authorization: `Bearer ${token}` }
                                    });
                                    const data = await res.json();
                                    if (res.ok && data.success) {
                                      setSelectedOrder(data.data);
                                    }
                                  } catch (err) {
                                    console.error(err);
                                  } finally {
                                    setIsLoading(false);
                                  }
                                }}
                              >
                                Xem chi tiết
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details Panel */}
            <div className="col-12 col-lg-5">
              {selectedOrder ? (
                <div className="card border-0 shadow-sm rounded p-4 sticky-top animate-fade-in" style={{ top: '100px' }}>
                  <h5 className="fw-bold text-dark border-bottom pb-3 mb-3 d-flex justify-content-between">
                    <span>Chi Tiết Đơn Hàng</span>
                    <span className="text-primary">{selectedOrder.order_code}</span>
                  </h5>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <p className="mb-0 text-muted small">Khách hàng</p>
                      <p className="fw-bold mb-0 text-dark small">{selectedOrder.customer_name}</p>
                    </div>
                    <div className="col-6">
                      <p className="mb-0 text-muted small">Điện thoại</p>
                      <p className="fw-bold mb-0 text-dark small">{selectedOrder.customer_phone}</p>
                    </div>
                    <div className="col-12">
                      <p className="mb-0 text-muted small">Email khách hàng</p>
                      <p className="fw-bold mb-0 text-dark small">{selectedOrder.customer_email}</p>
                    </div>
                    <div className="col-12">
                      <p className="mb-0 text-muted small">Địa chỉ nhận hàng</p>
                      <p className="fw-bold mb-0 text-dark small">{selectedOrder.shipping_address}, {selectedOrder.city}</p>
                    </div>
                    {selectedOrder.note && (
                      <div className="col-12">
                        <p className="mb-0 text-muted small">Ghi chú của khách</p>
                        <p className="fw-medium mb-0 text-danger small bg-light p-2 rounded">{selectedOrder.note}</p>
                      </div>
                    )}
                  </div>

                  <h6 className="fw-bold text-dark border-top pt-3 mb-2">Danh Sách Sản Phẩm Mua</h6>
                  <div className="mb-3 bg-light rounded p-2" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                    {selectedOrder.order_items?.map((item, idx) => (
                      <div key={item.id || idx} className="d-flex justify-content-between border-bottom pb-2 mb-2 small text-dark">
                        <div>
                          <div className="fw-bold">{item.product_name}</div>
                          <div className="text-muted small">
                            SL: {item.quantity} x {formatPrice(item.price)}
                            {item.selected_color && ` | Màu: ${item.selected_color}`}
                            {item.selected_size && ` | Size: ${item.selected_size}`}
                          </div>
                        </div>
                        <div className="fw-bold text-primary align-self-center">{formatPrice(item.line_total)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-top pt-2 mb-3">
                    <div className="d-flex justify-content-between small text-dark mb-1">
                      <span>Tạm tính:</span>
                      <span className="fw-bold">{formatPrice(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="d-flex justify-content-between small text-dark mb-1">
                      <span>Phí giao hàng:</span>
                      <span className="fw-bold">{formatPrice(selectedOrder.shipping_fee)}</span>
                    </div>
                    {selectedOrder.discount_amount > 0 && (
                      <div className="d-flex justify-content-between small text-danger mb-1">
                        <span>Giảm giá:</span>
                        <span className="fw-bold">-{formatPrice(selectedOrder.discount_amount)}</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between text-dark fw-bold border-top pt-2">
                      <span>Tổng tiền thanh toán:</span>
                      <span className="text-primary fs-5">{formatPrice(selectedOrder.total_amount)}</span>
                    </div>
                  </div>

                  <div className="border-top pt-3 mb-3">
                    <div className="row g-2">
                      <div className="col-6">
                        <label className="form-label text-muted small mb-1">Trạng thái đơn</label>
                        <select 
                          className="form-select form-select-sm"
                          value={selectedOrder.status}
                          onChange={(e) => handleUpdateOrder(selectedOrder.id, e.target.value, selectedOrder.payment_status)}
                        >
                          <option value="pending">Chờ xử lý (Pending)</option>
                          <option value="confirmed">Đã xác nhận (Confirmed)</option>
                          <option value="shipping">Đang giao (Shipping)</option>
                          <option value="completed">Đã hoàn thành (Completed)</option>
                          <option value="cancelled">Hủy đơn (Cancelled)</option>
                        </select>
                      </div>
                      
                      <div className="col-6">
                        <label className="form-label text-muted small mb-1">Thanh toán</label>
                        <select 
                          className="form-select form-select-sm"
                          value={selectedOrder.payment_status}
                          onChange={(e) => handleUpdateOrder(selectedOrder.id, selectedOrder.status, e.target.value)}
                        >
                          <option value="unpaid">Chưa trả tiền (Unpaid)</option>
                          <option value="paid">Đã thanh toán (Paid)</option>
                          <option value="refunded">Đã hoàn tiền (Refunded)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-outline-secondary btn-sm w-100 py-2" onClick={() => setSelectedOrder(null)}>Đóng chi tiết</button>
                </div>
              ) : (
                <div className="card border-0 shadow-sm rounded p-4 text-center text-muted">
                  <i className="fas fa-receipt fa-2x mb-3 text-secondary"></i>
                  <p className="mb-0">Chọn một đơn hàng trong danh sách để hiển thị thông tin hóa đơn chi tiết, các sản phẩm đã mua, địa chỉ giao nhận và thực hiện điều chỉnh trạng thái xử lý/thanh toán.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {deleteProductTarget && (
          <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0 shadow rounded">
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold text-dark">Xác nhận xóa sản phẩm</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Đóng"
                    disabled={isDeletingProduct}
                    onClick={() => setDeleteProductTarget(null)}
                  />
                </div>
                <div className="modal-body">
                  <p className="mb-2 text-dark">Bạn có chắc chắn muốn xóa sản phẩm không?</p>
                  <div className="bg-light rounded p-3 d-flex align-items-center gap-3">
                    <img
                      src={deleteProductTarget.image}
                      alt={deleteProductTarget.name}
                      className="rounded border"
                      style={{ width: '52px', height: '52px', objectFit: 'cover' }}
                    />
                    <div>
                      <div className="fw-bold text-dark">{deleteProductTarget.name}</div>
                      <div className="small text-muted">{formatPrice(deleteProductTarget.price)}</div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled={isDeletingProduct}
                    onClick={() => setDeleteProductTarget(null)}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    disabled={isDeletingProduct}
                    onClick={confirmDeleteProduct}
                  >
                    {isDeletingProduct ? 'Đang xóa...' : 'Xóa sản phẩm'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {notification && (
          <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(15, 23, 42, 0.45)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0 shadow rounded text-center">
                <div className="modal-body p-4">
                  <div
                    className={`mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center text-white ${
                      notification.type === 'success' ? 'bg-success' : notification.type === 'error' ? 'bg-danger' : 'bg-primary'
                    }`}
                    style={{ width: '58px', height: '58px' }}
                  >
                    <i className={`fas ${notification.type === 'success' ? 'fa-check' : notification.type === 'error' ? 'fa-times' : 'fa-info'} fs-4`}></i>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{notification.title}</h5>
                  <p className="text-muted mb-4">{notification.message}</p>
                  <button type="button" className="btn btn-primary px-4" onClick={() => setNotification(null)}>
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default AdminDashboard;
