import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmacion = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Captura los parámetros de la URL (?estado=AUTHORIZED&orden=ORD-123...)
  const queryParams = new URLSearchParams(location.search);
  const estado = queryParams.get('estado');
  const orden = queryParams.get('orden');

  const mensaje =
    estado === 'AUTHORIZED'
      ? '¡Gracias por tu compra! El pago fue exitoso.'
      : 'Hubo un problema con tu pago. Intenta nuevamente.';

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Confirmación de Pago</h1>
      <p><strong>Orden:</strong> {orden}</p>
      <p><strong>Estado:</strong> {estado}</p>
      <h2>{mensaje}</h2>
      <button onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
};

export default Confirmacion;
