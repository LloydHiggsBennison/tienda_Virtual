
# 🛒 Tienda Virtual - Proyecto FullStack con React + Node.js + Webpay + MongoDB

Este proyecto es una tienda virtual completa construida con:

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB
- **Pasarela de pago:** Webpay Plus (Transbank - modo integración)
- **Base de datos:** MongoDB local o Atlas

---

## 📁 Estructura del Proyecto

```
/tienda-virtual/
├── client/              # Frontend (React)
│   ├── src/
│   │   ├── assets/
│   │   ├── context/     # Manejo de carrito (CartContext)
│   │   ├── pages/       # Home, Checkout, Confirmación
│   │   └── App.jsx
├── server/              # Backend (Express)
│   ├── routes/
│   │   ├── products.js
│   │   └── webpay.js
│   ├── services/
│   │   └── webpay.js
│   ├── models/
│   │   └── Product.js
│   └── index.js
```

---

## ⚙️ Instalación y configuración

### 1. Clonar repositorio y entrar al proyecto
```bash
git clone <url>
cd tienda-virtual
```

### 2. Instalar dependencias del frontend y backend
```bash
cd client
npm install

cd ../server
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en `/server`:

```
MONGO_URI=mongodb://localhost:27017/tienda_virtual
```

---

## ▶️ Ejecución

### Backend

```bash
cd server
node index.js
```

Servidor escuchando en: `http://localhost:5000`

### Frontend

```bash
cd client
npm run dev
```

Aplicación en: `http://localhost:5173`

---

## 💳 Webpay Plus Integrado

- Se usa el SDK oficial `transbank-sdk`
- Al hacer clic en el botón Webpay en el checkout:
  1. Se crea la transacción (`/api/webpay/crear-transaccion`)
  2. El usuario es redirigido a Webpay
  3. Webpay redirige a `/api/webpay/confirmar` con `token_ws`
  4. El backend la valida y redirige a `/confirmacion`

---

## ✅ Funcionalidades implementadas

- [x] Catálogo de productos desde MongoDB
- [x] Carrito de compras con persistencia temporal
- [x] Checkout con resumen e imagen de Webpay
- [x] Redirección tras pago exitoso o fallido
- [x] Integración con Webpay en entorno de pruebas

---

## 🧪 Para pruebas

Usar Webpay Plus en modo integración. Todos los tokens se generan automáticamente y no se procesan pagos reales.

---

## 🧑‍💻 Créditos

Desarrollado por Lloyd Higgs para uso académico y práctico.
