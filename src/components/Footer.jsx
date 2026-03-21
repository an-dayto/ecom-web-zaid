import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-white">ShopVibe</span>
            </div>
            <p className="text-sm">Your one-stop destination for premium products at unbeatable prices.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/products?category=electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=clothing" className="hover:text-white transition-colors">Clothing</Link></li>
              <li><Link to="/products?category=home" className="hover:text-white transition-colors">Home & Living</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition-colors cursor-pointer">Contact Us</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">FAQ</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Shipping & Returns</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Size Guide</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-3">Subscribe for exclusive deals and updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
          <p>&copy; 2026 ShopVibe. All rights reserved. | This is a demo ecommerce site.</p>
        </div>
      </div>
    </footer>
  );
}
