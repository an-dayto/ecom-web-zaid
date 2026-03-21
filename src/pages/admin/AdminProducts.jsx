import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { categories } from '../../data/products';

const emptyProduct = {
  name: '', price: '', originalPrice: '', category: 'electronics',
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'],
  rating: 4.5, reviews: 0,
  description: '', specs: {}, stock: 0, featured: false,
};

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, addNotification } = useStore();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProduct);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditing(null);
    setForm(emptyProduct);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditing(product.id);
    setForm({ ...product, price: String(product.price), originalPrice: product.originalPrice ? String(product.originalPrice) : '', stock: String(product.stock) });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      stock: parseInt(form.stock),
    };

    if (editing) {
      updateProduct(editing, data);
      addNotification('Product updated successfully');
    } else {
      addProduct(data);
      addNotification('Product added successfully');
    }
    setShowModal(false);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      addNotification('Product deleted', 'error');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">{products.length} products in your catalog</p>
        </div>
        <button
          onClick={openNew}
          className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 self-start"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium">Rating</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        {product.featured && <span className="text-xs text-indigo-600 font-medium">Featured</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">{product.category}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${product.stock < 10 ? 'text-red-600' : product.stock < 20 ? 'text-amber-600' : 'text-green-600'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.rating} / 5</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(product)} className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(product.id, product.name)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editing ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={form.price}
                      onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.originalPrice}
                      onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      required
                      value={form.stock}
                      onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value, images: [e.target.value] }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured || false}
                    onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">Mark as featured</label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                    {editing ? 'Update' : 'Add'} Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
