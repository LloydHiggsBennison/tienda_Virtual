import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import Home from './pages/Home';
import CartButton from './components/CartButton';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Confirmacion from './pages/Confirmacion';
import Cpannel from './pages/Cpannel';
import MisCompras from './pages/MisCompras';

import LoginForm from './components/LoginForm';

import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = '403622561597-i0cnjhbooputm6vbhdkt0f2ned26ad3g.apps.googleusercontent.com';

// Componente principal que maneja las rutas y el estado de la aplicación
// Este componente utiliza React Router para definir las rutas de la aplicación
// También maneja el estado del usuario, el menú de usuario y la lógica de login
// Incluye un header con enlaces de navegación y un botón para abrir el carrito
// Utiliza el contexto de Google OAuth para manejar el login con Google
// Además, implementa lógica para forzar el login en páginas protegidas y cambiar el título
// dinámicamente según la ruta actual
// El componente también maneja el cierre del menú al hacer clic fuera de él
// y muestra un modal de login cuando es necesario

function AppRoutes({
  usuario,
  setUsuario,
  mostrarLogin,
  setMostrarLogin,
  openMenu,
  setOpenMenu,
  menuRef
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔑 Forzar login en páginas protegidas
  useEffect(() => {
    if (
      (location.pathname === '/checkout' || location.pathname === '/mis-compras') &&
      !usuario
    ) {
      setMostrarLogin(true);
    }
  }, [location, usuario, setMostrarLogin]);

  // ✅ Cambiar título dinámico
  useEffect(() => {
    if (location.pathname === '/cpannel') {
      document.title = 'Panel de Control';
    } else {
      document.title = 'Tienda Virtual';
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    setOpenMenu(false);
    navigate('/');
  };

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 shadow bg-white relative">
        <Link to="/" className="text-xl font-bold">
          Tienda Virtual
        </Link>
        <div>
          {usuario ? (
            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="text-sm text-gray-700"
              >
                👋 Hola, {usuario.nombre || usuario.email}
              </button>

              {openMenu && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-48 bg-white border shadow rounded z-50"
                >
                  {usuario.email === 'admin@admin.com' ? (
                    <>
                      <Link
                        to="/cpannel"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setOpenMenu(false)}
                      >
                        Panel de Control
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/mis-compras"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setOpenMenu(false)}
                      >
                        Mis Compras
                      </Link>
                      <Link
                        to="/carrito"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setOpenMenu(false)}
                      >
                        Carrito
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setMostrarLogin(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/cpannel" element={<Cpannel />} />
        <Route path="/mis-compras" element={<MisCompras />} />
      </Routes>

      <CartButton />

      {mostrarLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <LoginForm
            onClose={() => {
              setMostrarLogin(false);
              const guardado = localStorage.getItem('usuario');
              if (guardado) {
                const nuevoUsuario = JSON.parse(guardado);
                setUsuario(nuevoUsuario);

                if (nuevoUsuario.email === 'admin@admin.com') {
                  navigate('/cpannel');
                }
              } else {
                if (
                  location.pathname === '/checkout' ||
                  location.pathname === '/mis-compras'
                ) {
                  navigate('/');
                }
              }
            }}
          />
        </div>
      )}
    </>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const guardado = localStorage.getItem('usuario');
    if (guardado) {
      setUsuario(JSON.parse(guardado));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <BrowserRouter>
        <AppRoutes
          usuario={usuario}
          setUsuario={setUsuario}
          mostrarLogin={mostrarLogin}
          setMostrarLogin={setMostrarLogin}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          menuRef={menuRef}
        />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
