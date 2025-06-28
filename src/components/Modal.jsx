import React from 'react';


// Componente Modal para mostrar contenido en una ventana emergente
// Este componente se utiliza para mostrar formularios, mensajes o cualquier contenido adicional
const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {children}
    </div>
  );
};

export default Modal;
