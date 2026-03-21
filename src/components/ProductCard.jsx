import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
        {product.stock < 10 && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Low Stock
          </span>
        )}
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 truncate hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="text-sm text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
