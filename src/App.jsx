import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CartButton from './components/CartButton';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Confirmacion from './pages/Confirmacion';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} /> {/* ✅ esta es la ruta faltante */}
        <Route path="/confirmacion" element={<Confirmacion />} />
      </Routes>
      <CartButton />
    </BrowserRouter>
  );
}


export default App;
