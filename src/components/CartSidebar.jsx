import { X, Plus, Minus, Trash2, Tag, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const {
    items, isOpen, setCartOpen, removeItem, updateQuantity,
    subtotal, discountAmount, shipping, total, discount,
    applyDiscount, removeDiscount, discountError, itemCount,
  } = useCart();
  const [code, setCode] = useState('');

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setCartOpen(false)} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Shopping Cart ({itemCount})</h2>
          <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
            <p className="text-gray-400 text-sm mb-6">Add some items to get started</p>
            <Link
              to="/products"
              onClick={() => setCartOpen(false)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                    <p className="text-indigo-600 font-semibold mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Discount code */}
            <div className="px-4 py-3 border-t border-gray-200">
              {discount ? (
                <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-green-700">{discount.code}</span>
                    <span className="text-xs text-green-600">({discount.description})</span>
                  </div>
                  <button onClick={removeDiscount} className="text-green-600 hover:text-green-800">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Discount code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => { applyDiscount(code); setCode(''); }}
                    className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
              {discountError && <p className="text-red-500 text-xs mt-1">{discountError}</p>}
            </div>

            {/* Summary */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setCartOpen(false)}
                className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium mt-3"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
