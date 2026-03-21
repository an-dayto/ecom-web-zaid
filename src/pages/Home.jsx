import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products } = useStore();
  const featured = products.filter(p => p.featured).slice(0, 4);
  const newArrivals = products.slice(-4);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Spring Collection 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your <br />Perfect Style
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
              Curated collections of premium products at prices that make you smile. Free shipping on orders over $100.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link
                to="/products?category=clothing"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Features bar */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $100' },
              { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: Headphones, title: '24/7 Support', desc: 'Dedicated support' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
          <Link to="/products" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group relative overflow-hidden rounded-xl aspect-square"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white font-semibold text-sm">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Summer Sale is Here!</h3>
            <p className="text-gray-300 text-lg">Use code <span className="font-bold text-amber-400">SUMMER25</span> for 25% off everything</p>
          </div>
          <Link
            to="/products"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shrink-0"
          >
            Shop the Sale
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">New Arrivals</h2>
          <Link to="/products" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
