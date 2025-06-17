import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const CartButton = () => {
  const { carrito } = useCart();
  const [open, setOpen] = useState(false);
  const cantidad = carrito.reduce((sum, p) => sum + p.cantidad, 0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition z-40"
      >
        🛒 {cantidad}
      </button>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CartButton;
