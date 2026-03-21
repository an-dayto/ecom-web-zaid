import { createContext, useContext, useState } from 'react';
import { products as initialProducts, demoOrders as initialOrders } from '../data/products';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [notifications, setNotifications] = useState([]);

  const addProduct = (product) => {
    const newProduct = { ...product, id: Math.max(...products.map(p => p.id)) + 1 };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        notifications,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addOrder,
        addNotification,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
