import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Modal from '../components/Modal';
import LoginForm from '../components/LoginForm';

// Home.jsx
const Home = () => {
  const [productos, setProductos] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/productos');
      setProductos(res.data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
    }
  };

  return (
    <div>
      {/* Modal de Login */}
      <Modal isOpen={showLogin}>
        <LoginForm onClose={() => setShowLogin(false)} />
      </Modal>

      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Catálogo de Productos
        </h1>

        {productos.length === 0 ? (
          <p className="text-center text-gray-500">No hay productos disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <div
                key={producto._id || producto.id}
                className="flex flex-col bg-white border shadow rounded overflow-hidden hover:shadow-md transition"
              >
                {/* Imagen con altura fija y zoom responsivo */}
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-contain object-center transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>

                {/* Detalle + Botón */}
                <div className="flex flex-col justify-between flex-grow p-3">
                  <div>
                    <h2 className="text-base font-semibold">{producto.nombre}</h2>
                    {producto.descripcion && (
                      <p className="text-gray-600 text-xs mb-1">
                        {producto.descripcion}
                      </p>
                    )}
                    <p className="text-blue-600 font-bold text-sm mb-2">
                      ${producto.precio}
                    </p>
                  </div>

                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition"
                    onClick={() => addToCart(producto)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
