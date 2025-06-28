import { createContext, useContext, useState } from 'react';

// Contexto para el carrito de compras
// Este contexto permite manejar el estado del carrito en toda la aplicación
// Proporciona funciones para agregar, eliminar y limpiar productos del carrito

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
