import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Modal from '../components/Modal';
import LoginForm from '../components/LoginForm';



// Componente para la página de inicio
// Este componente muestra el catálogo de productos disponibles
// Utiliza el contexto del carrito para agregar productos al carrito
// También maneja la lógica para mostrar un modal de inicio de sesión


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
                className="bg-white border shadow rounded overflow-hidden hover:shadow-md transition"
              >
                <div className="w-full aspect-[4/5] overflow-hidden bg-gray-50">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h2 className="text-base font-semibold">{producto.nombre}</h2>
                  {producto.descripcion && (
                    <p className="text-gray-600 text-xs mb-1">
                      {producto.descripcion}
                    </p>
                  )}
                  <p className="text-blue-600 font-bold text-sm mb-2">
                    ${producto.precio}
                  </p>
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded"
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
