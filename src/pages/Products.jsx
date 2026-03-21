import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function Products() {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  const activeCategory = searchParams.get('category') || 'all';

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.id - a.id); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [products, activeCategory, sort, priceRange]);

  const setCategory = (cat) => {
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb / header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {activeCategory === 'all'
              ? 'All Products'
              : categories.find(c => c.id === activeCategory)?.name || 'Products'}
          </h1>
          <p className="text-gray-500 mt-1">{filtered.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <div className={`lg:w-64 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setCategory('all')}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === 'all' ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === cat.id ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <h3 className="font-semibold text-gray-900 mt-6 mb-4">Price Range</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$0</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-xl border border-gray-200 p-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => { setCategory('all'); setPriceRange([0, 2000]); }}
                  className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
