export default function HomePage() {
  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: 32 }}>
      <h1>RivoraMart Backend API</h1>
      <p>Backend Next.js kết nối Supabase cho dự án thương mại điện tử.</p>
      <ul>
        <li>GET /api/health</li>
        <li>GET /api/products</li>
        <li>GET /api/product/[slug]</li>
        <li>POST /api/contact</li>
        <li>POST /api/orders</li>
        <li>POST /api/auth/login</li>
      </ul>
    </main>
  );
}
