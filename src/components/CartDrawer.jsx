import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ open, onClose }) => {
  const { carrito, removeFromCart, clearCart } = useCart();
  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  const navigate = useNavigate();

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform z-50 ${open ? 'translate-x-0' : 'translate-x-full'} duration-300`}>
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-bold">Carro ({carrito.length})</h2>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-180px)]">
        {carrito.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">Tu carrito está vacío</p>
        ) : (
          carrito.map((item) => (
            <div key={item._id} className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold">{item.nombre}</h3>
                <p className="text-sm text-gray-500">${item.precio} x {item.cantidad}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-600 font-bold">${item.precio * item.cantidad}</p>
                <button className="text-red-500 text-sm" onClick={() => removeFromCart(item._id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between mb-2 text-lg font-semibold">
          <span>Subtotal:</span>
          <span>${total}</span>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={() => {
            onClose();
            navigate('/checkout');
          }}
        >
          Ir a pagar
        </button>
        {carrito.length > 0 && (
          <button className="w-full mt-2 text-sm text-gray-500 underline" onClick={clearCart}>
            Vaciar carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
