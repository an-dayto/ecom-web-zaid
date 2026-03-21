import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <Navigate to="/" />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8">Thank you for your purchase</p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Order Number</span>
                <p className="font-semibold text-gray-900">{order.id}</p>
              </div>
              <div>
                <span className="text-gray-500">Date</span>
                <p className="font-semibold text-gray-900">{order.date}</p>
              </div>
              <div>
                <span className="text-gray-500">Total</span>
                <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-gray-500">Status</span>
                <p className="font-semibold text-amber-600 capitalize">{order.status}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-4 mb-8 text-left">
            <Mail size={20} className="text-blue-600 shrink-0" />
            <p className="text-sm text-blue-700">
              A confirmation email has been sent to <strong>{order.email}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 bg-indigo-50 rounded-lg p-4 mb-8 text-left">
            <Package size={20} className="text-indigo-600 shrink-0" />
            <p className="text-sm text-indigo-700">
              Your order will be shipped within 1-2 business days. You&apos;ll receive tracking information via email.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/products"
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              Continue Shopping <ArrowRight size={16} />
            </Link>
            <Link
              to="/"
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
