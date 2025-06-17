import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p._id === producto._id);
      if (existe) {
        return prev.map(p =>
          p._id === producto._id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCarrito(prev => prev.filter(p => p._id !== id));
  };

  const clearCart = () => setCarrito([]);

  return (
    <CartContext.Provider value={{ carrito, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
