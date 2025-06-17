import React from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import webpay from '../assets/img/webpay-plus.jpg';

const Checkout = () => {
  const { carrito, removeFromCart, clearCart } = useCart();

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const iniciarCompra = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/webpay/crear-transaccion', {
        ordenId: 'ORD-' + Date.now(),
        total: total,
        correo: 'cliente@correo.com',
      });

      window.location.href = `${res.data.url}?token_ws=${res.data.token}`;
    } catch (error) {
      console.error('❌ Error al iniciar la compra:', error);
      alert('Hubo un problema al procesar el pago.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧾 Resumen de Compra</h1>

      {carrito.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-4">
            {carrito.map((item) => (
              <li key={item._id} className="py-4 flex items-center gap-4">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 font-bold">${item.precio * item.cantidad}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right text-lg font-semibold mb-4">
            Total: <span className="text-blue-700">${total}</span>
          </div>

          <button
            onClick={iniciarCompra}
            className="w-full bg-white border border-gray-300 hover:border-blue-600 rounded py-2 px-4 transition flex items-center justify-center"
          >
            <img
              src={webpay}
              alt="Pagar con Webpay"
              className="h-10 object-contain"
              style={{ maxHeight: '60px' }}
            />
          </button>

          <button
            onClick={clearCart}
            className="mt-2 w-full text-sm text-gray-500 underline"
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
