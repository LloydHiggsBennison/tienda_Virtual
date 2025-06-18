import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmacion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const estado = queryParams.get('estado');
  const orden = queryParams.get('orden');
  const codigo = queryParams.get('codigo');

  const mensaje =
    estado === 'AUTHORIZED'
      ? '¡Gracias por tu compra! El pago fue exitoso.'
      : 'Hubo un problema con tu pago. Intenta nuevamente.';

  useEffect(() => {
    const datos = localStorage.getItem('compraDetalles');
    if (datos) {
      setProductos(JSON.parse(datos));
      localStorage.removeItem('compraDetalles'); // Limpia después de mostrar
    }
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '700px', margin: 'auto' }}>
      <h1>Confirmación de Pago</h1>
      <p><strong>Orden:</strong> {orden}</p>
      <p><strong>Estado:</strong> {estado}</p>
      <p><strong>Código de Respuesta:</strong> {codigo}</p>
      <h2>{mensaje}</h2>

      {estado === 'AUTHORIZED' && productos.length > 0 && (
        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
          <h3>Productos comprados:</h3>
          <ul>
            {productos.map((item) => (
              <li key={item._id}>
                <strong>{item.nombre}</strong> — Cantidad: {item.cantidad} — Total: ${item.precio * item.cantidad}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '2rem',
          padding: '10px 20px',
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default Confirmacion;
