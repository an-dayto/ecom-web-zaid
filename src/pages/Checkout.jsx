import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Lock, ChevronRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, discountAmount, shipping, total, discount, clearCart } = useCart();
  const { addOrder, addNotification } = useStore();
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    cardNumber: '', expiry: '', cvv: '', cardName: '',
  });

  const updateForm = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-indigo-600 hover:text-indigo-700 font-medium">Continue Shopping</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) { setStep(step + 1); return; }

    setProcessing(true);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2000));

    const order = addOrder({
      customer: `${form.firstName} ${form.lastName}`,
      email: form.email,
      items: items.map(i => ({ productId: i.id, quantity: i.quantity })),
      total,
      address: `${form.address}, ${form.city}, ${form.state} ${form.zip}`,
    });

    clearCart();
    addNotification('Order placed successfully!');
    navigate('/order-confirmation', { state: { order } });
  };

  const steps = ['Information', 'Shipping', 'Payment'];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i + 1 <= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${
                i + 1 <= step ? 'text-gray-900' : 'text-gray-400'
              }`}>{s}</span>
              {i < steps.length - 1 && (
                <ChevronRight size={16} className="text-gray-300 mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                {step === 1 && (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => updateForm('email', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            required
                            value={form.firstName}
                            onChange={e => updateForm('firstName', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            required
                            value={form.lastName}
                            onChange={e => updateForm('lastName', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          required
                          value={form.address}
                          onChange={e => updateForm('address', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="123 Main St"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={form.city}
                            onChange={e => updateForm('city', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                          <input
                            type="text"
                            required
                            value={form.state}
                            onChange={e => updateForm('state', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                          <input
                            type="text"
                            required
                            value={form.zip}
                            onChange={e => updateForm('zip', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                          <select
                            value={form.country}
                            onChange={e => updateForm('country', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                      <Lock size={14} />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                        <input
                          type="text"
                          required
                          value={form.cardName}
                          onChange={e => updateForm('cardName', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={form.cardNumber}
                            onChange={e => updateForm('cardNumber', e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19))}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
                            placeholder="1234 5678 9012 3456"
                          />
                          <CreditCard size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                          <input
                            type="text"
                            required
                            value={form.expiry}
                            onChange={e => {
                              let v = e.target.value.replace(/\D/g, '');
                              if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                              updateForm('expiry', v.slice(0, 5));
                            }}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input
                            type="text"
                            required
                            value={form.cvv}
                            onChange={e => updateForm('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-3 mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={processing}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : step < 3 ? (
                      'Continue'
                    ) : (
                      <>
                        <Lock size={16} />
                        Pay ${total.toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-600 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span className="flex items-center gap-1"><Tag size={14} /> {discount.code}</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
