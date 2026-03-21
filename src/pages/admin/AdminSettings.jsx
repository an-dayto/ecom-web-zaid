import { useState } from 'react';
import { Save } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function AdminSettings() {
  const { addNotification } = useStore();
  const [settings, setSettings] = useState({
    storeName: 'ShopVibe',
    storeEmail: 'admin@shopvibe.com',
    currency: 'USD',
    freeShippingThreshold: '100',
    taxRate: '8.5',
    orderNotifications: true,
    lowStockAlerts: true,
    newsletterEnabled: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    addNotification('Settings saved successfully');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your store configuration</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={e => setSettings(s => ({ ...s, storeName: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Email</label>
              <input
                type="email"
                value={settings.storeEmail}
                onChange={e => setSettings(s => ({ ...s, storeEmail: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select
                value={settings.currency}
                onChange={e => setSettings(s => ({ ...s, currency: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (&euro;)</option>
                <option value="GBP">GBP (&pound;)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={settings.taxRate}
                onChange={e => setSettings(s => ({ ...s, taxRate: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold ($)</label>
            <input
              type="number"
              value={settings.freeShippingThreshold}
              onChange={e => setSettings(s => ({ ...s, freeShippingThreshold: e.target.value }))}
              className="w-full max-w-xs px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">Orders above this amount qualify for free shipping</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-4">
            {[
              { key: 'orderNotifications', label: 'Order Notifications', desc: 'Receive email notifications for new orders' },
              { key: 'lowStockAlerts', label: 'Low Stock Alerts', desc: 'Get notified when products are running low' },
              { key: 'newsletterEnabled', label: 'Newsletter', desc: 'Enable newsletter subscription on the storefront' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSettings(s => ({ ...s, [item.key]: !s[item.key] }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[item.key] ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Save size={16} />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
