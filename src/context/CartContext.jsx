import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedOrders = localStorage.getItem('orders');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id? {...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id? {...item, quantity } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id!== id));
  };

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  const checkout = (shippingDetails) => {
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total: getTotalPrice(),
      date: new Date().toISOString(),
      shipping: shippingDetails,
      status: 'Processing'
    };
    setOrders(prev => [newOrder,...prev]);
    setCart([]);
    return newOrder.id;
  };

  return (
    <CartContext.Provider value={{
      cart, orders, addToCart, updateQuantity, removeFromCart,
      getTotalPrice, getCartCount, checkout
    }}>
      {children}
    </CartContext.Provider>
  );
};