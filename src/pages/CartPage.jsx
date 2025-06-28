import React from 'react';
import { useCart } from '../context/CartContext';

// Componente para la página del carrito de compras
// Este componente muestra la lista de productos en el carrito, el total y botones para eliminar productos
// También permite vaciar el carrito completo
const CartPage = () => {
  const { carrito, removeFromCart, clearCart } = useCart();

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Carrito de Compras</h1>

      {carrito.length === 0 ? (
        <p className="text-center text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {carrito.map(item => (
              <li key={item._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{item.nombre}</h2>
                  <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold text-blue-600">${item.precio * item.cantidad}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-lg font-semibold">Total: <span className="text-blue-700">${total}</span></p>
            <button
              onClick={clearCart}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
