import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';


// Componente Navbar para la Tienda Virtual
// Este componente muestra enlaces a la página de inicio y al carrito, junto con el número de artículos en el carrito

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: '#111',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', marginRight: '1rem' }}>
          🏠 Inicio
        </Link>
        <Link to="/checkout" style={{ color: '#fff', textDecoration: 'none' }}>
          🛒 Carrito ({cart.length})
        </Link>
      </div>
      <div>
        <strong>Tienda Virtual</strong>
      </div>
    </nav>
  );
};

export default Navbar;
