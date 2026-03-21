import { DollarSign, ShoppingBag, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function Dashboard() {
  const { products, orders } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const avgOrderValue = totalRevenue / totalOrders;

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, icon: DollarSign, change: '+12.5%', up: true, color: 'bg-green-100 text-green-600' },
    { label: 'Total Orders', value: totalOrders, icon: ShoppingBag, change: '+8.2%', up: true, color: 'bg-blue-100 text-blue-600' },
    { label: 'Products', value: totalProducts, icon: Package, change: '+3', up: true, color: 'bg-purple-100 text-purple-600' },
    { label: 'Avg. Order Value', value: `$${avgOrderValue.toFixed(2)}`, icon: TrendingUp, change: '-2.1%', up: false, color: 'bg-amber-100 text-amber-600' },
  ];

  const statusColors = {
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low stock alerts */}
      <div className="bg-white rounded-xl border border-gray-200 mt-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {products.filter(p => p.stock < 20).map(p => (
              <div key={p.id} className="flex items-center justify-between bg-amber-50 rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.category}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-amber-700">{p.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
