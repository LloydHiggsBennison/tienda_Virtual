import React from 'react';


// Componente Header para la Tienda Virtual
// Este componente muestra el título de la tienda y un botón para iniciar sesión

const Header = ({ onLoginClick }) => {
  return (
    <header className="w-full flex justify-between items-center p-4 bg-white shadow mb-4">
      <h1 className="text-xl font-bold">Tienda Virtual</h1>
      <button
        onClick={onLoginClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Iniciar Sesión
      </button>
    </header>
  );
};

export default Header;
