import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');

  const handleManualLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('📧 Enviando manual login:', email);

      // ✅ Guarda cliente en Mongo y obtén respuesta
      const res = await axios.post('http://localhost:5000/api/clientes', {
        email,
      });

      // ✅ Guarda en localStorage para mantener sesión
      localStorage.setItem('usuario', JSON.stringify(res.data));
      console.log('✅ Cliente guardado (manual):', res.data);

      onClose();
    } catch (err) {
      console.error('❌ Error guardando cliente manual:', err);
    }
  };


  // Maneja el éxito del login con Google
  // Decodifica el JWT y guarda el cliente en MongoDB

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('✅ Credencial Google:', credentialResponse);
      const decoded = jwtDecode(credentialResponse.credential);

      console.log('✅ Decodificado:', decoded);

      const res = await axios.post('http://localhost:5000/api/clientes', {
        nombre: decoded.given_name,
        apellido: decoded.family_name,
        email: decoded.email,
        googleId: decoded.sub,
      });

      // ✅ Guarda en localStorage para mantener sesión
      localStorage.setItem('usuario', JSON.stringify(res.data));
      console.log('✅ Cliente guardado (Google):', res.data);

      onClose();
    } catch (err) {
      console.error('❌ Error guardando cliente Google:', err);
    }
  };


  // Renderiza el formulario de login
  // Incluye campo de email y botón para login manual
  // También incluye el botón de Google Login
  return (
    <GoogleOAuthProvider clientId="403622561597-i0cnjhbooputm6vbhdkt0f2ned26ad3g.apps.googleusercontent.com">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm mx-auto">
        <h2 className="text-lg font-bold mb-4">Iniciar sesión</h2>

        <form onSubmit={handleManualLogin} className="mb-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Entrar con Correo
          </button>
        </form>

        <div className="text-center mb-4 text-gray-500">— o —</div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log('❌ Error en Google Login')}
        />

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 underline block w-full text-center"
        >
          Cancelar
        </button>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;
