import React, { useEffect, useState } from 'react';
import axios from 'axios';



// Componente para la página de Mis Compras
// Este componente muestra las compras realizadas por el usuario
// Recupera el usuario del localStorage y hace una petición al backend para obtener sus compras
// Si el usuario no está logueado, muestra un mensaje indicando que debe iniciar sesión


const MisCompras = () => {
  const [compras, setCompras] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Recupera usuario del localStorage
    const guardado = localStorage.getItem('usuario');
    if (guardado) {
      const user = JSON.parse(guardado);
      setUsuario(user);

      // 🔗 endpoint para traer las compras del usuario
      axios.get(`http://localhost:5000/api/transacciones?email=${user.email}`)
        .then((res) => setCompras(res.data))
        .catch((err) => console.error('❌ Error al cargar compras:', err));
    }
  }, []);

  if (!usuario) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Debes iniciar sesión para ver tus compras</h2>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mis Compras</h1>

      {compras.length === 0 ? (
        <p className="text-gray-500">Aún no tienes compras registradas.</p>
      ) : (
        <div className="space-y-4">
          {compras.map((compra) => (
            <div key={compra._id} className="border p-4 rounded shadow">
              <h2 className="font-bold mb-2">Orden ID: {compra.ordenId}</h2>
              <p className="text-sm text-gray-500 mb-2">Fecha: {new Date(compra.fecha).toLocaleString()}</p>
              <ul className="text-sm mb-2">
                {compra.items.map((item, i) => (
                  <li key={i} className="mb-1">
                    {item.nombre} — {item.cantidad} x ${item.precio}
                  </li>
                ))}
              </ul>
              <p className="font-semibold">Total: ${compra.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisCompras;
