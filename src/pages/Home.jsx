import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de Productos</h1>

      {productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.map(producto => (
            <div key={producto._id} className="bg-white shadow-md rounded-lg overflow-hidden border">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{producto.nombre}</h2>
                <p className="text-gray-600 text-sm">{producto.descripcion}</p>
                <p className="mt-2 text-lg font-bold text-blue-600">${producto.precio}</p>
                <button
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
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
  );
};

export default Home;
