import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addNotification } = useStore();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <Link to="/products" className="text-indigo-600 hover:text-indigo-700 font-medium">Back to Products</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    addNotification(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-indigo-600">Products</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Images */}
            <div className="p-6 md:p-8">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        i === activeImage ? 'border-indigo-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6 md:p-8 md:border-l border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                    <span className="bg-red-100 text-red-700 text-sm font-semibold px-2 py-0.5 rounded-full">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-amber-500'}`} />
                <span className="text-sm text-gray-600">
                  {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
                  <Heart size={20} />
                </button>
              </div>

              {/* Shipping info */}
              <div className="space-y-3 border-t border-gray-200 pt-6">
                {[
                  { icon: Truck, text: 'Free shipping on orders over $100' },
                  { icon: RotateCcw, text: '30-day return policy' },
                  { icon: Shield, text: '2-year warranty included' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                    <Icon size={16} className="text-gray-400" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              {['description', 'specifications', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 md:p-8">
              {activeTab === 'description' && (
                <p className="text-gray-600 leading-relaxed max-w-3xl">{product.description}</p>
              )}
              {activeTab === 'specifications' && (
                <div className="max-w-lg">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">{key}</span>
                      <span className="text-gray-900 text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-6 max-w-2xl">
                  {[
                    { name: 'Alex M.', rating: 5, text: 'Absolutely love this product! Quality is outstanding and exactly as described.', date: '2 days ago' },
                    { name: 'Jordan K.', rating: 4, text: 'Great value for money. Shipping was fast and packaging was excellent.', date: '1 week ago' },
                    { name: 'Sam W.', rating: 5, text: 'Best purchase I\'ve made this year. Highly recommend to anyone looking for quality.', date: '2 weeks ago' },
                  ].map((review, i) => (
                    <div key={i} className="border-b border-gray-100 pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 text-sm font-medium">{review.name[0]}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 text-sm">{review.name}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} size={12} className={j < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 ml-auto">{review.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
