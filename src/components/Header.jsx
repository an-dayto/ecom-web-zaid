import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { itemCount, toggleCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/products?category=electronics', label: 'Electronics' },
    { to: '/products?category=clothing', label: 'Clothing' },
    { to: '/products?category=home', label: 'Home & Living' },
  ];

  if (isAdmin) return null;

  return (
    <>
      {/* Top banner */}
      <div className="bg-indigo-600 text-white text-sm text-center py-2 px-4">
        Free shipping on orders over $100 | Use code <strong>WELCOME10</strong> for 10% off
      </div>

      <header className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ShopVibe</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <Search size={20} />
              </button>
              <Link to="/admin" className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                <User size={20} />
              </Link>
              <button
                onClick={toggleCart}
                className="p-2 text-gray-600 hover:text-indigo-600 relative transition-colors"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-gray-600"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-gray-600 hover:text-indigo-600 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
