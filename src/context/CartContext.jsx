import { createContext, useContext, useReducer, useCallback } from 'react';
import { discountCodes } from '../data/products';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.quantity) } : i
        ),
      };
    case 'APPLY_DISCOUNT': {
      const code = action.payload.toUpperCase();
      const discount = discountCodes[code];
      if (!discount) return { ...state, discountError: 'Invalid discount code' };
      return { ...state, discount: { code, ...discount }, discountError: null };
    }
    case 'REMOVE_DISCOUNT':
      return { ...state, discount: null, discountError: null };
    case 'CLEAR_CART':
      return { ...state, items: [], discount: null, discountError: null };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'SET_CART_OPEN':
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  discount: null,
  discountError: null,
  isOpen: false,
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
    dispatch({ type: 'SET_CART_OPEN', payload: true });
  }, []);

  const removeItem = useCallback((id) => dispatch({ type: 'REMOVE_ITEM', payload: id }), []);
  const updateQuantity = useCallback((id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }), []);
  const applyDiscount = useCallback((code) => dispatch({ type: 'APPLY_DISCOUNT', payload: code }), []);
  const removeDiscount = useCallback(() => dispatch({ type: 'REMOVE_DISCOUNT' }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), []);
  const setCartOpen = useCallback((open) => dispatch({ type: 'SET_CART_OPEN', payload: open }), []);

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  let discountAmount = 0;
  if (state.discount) {
    if (state.discount.type === 'percentage') {
      discountAmount = subtotal * (state.discount.value / 100);
    } else if (state.discount.type === 'fixed') {
      discountAmount = state.discount.value;
    }
  }

  const shipping = subtotal > 100 || (state.discount && state.discount.type === 'shipping') ? 0 : 9.99;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        applyDiscount,
        removeDiscount,
        clearCart,
        toggleCart,
        setCartOpen,
        subtotal,
        discountAmount,
        shipping,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
