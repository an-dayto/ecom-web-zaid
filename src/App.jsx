import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Notification from './components/Notification';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminSettings from './pages/admin/AdminSettings';

function StorefrontLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartSidebar />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <CartProvider>
          <Notification />
          <Routes>
            {/* Storefront */}
            <Route path="/" element={<StorefrontLayout><Home /></StorefrontLayout>} />
            <Route path="/products" element={<StorefrontLayout><Products /></StorefrontLayout>} />
            <Route path="/product/:id" element={<StorefrontLayout><ProductDetail /></StorefrontLayout>} />
            <Route path="/checkout" element={<StorefrontLayout><Checkout /></StorefrontLayout>} />
            <Route path="/order-confirmation" element={<StorefrontLayout><OrderConfirmation /></StorefrontLayout>} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </CartProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}
