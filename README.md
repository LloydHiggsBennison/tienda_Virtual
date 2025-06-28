# 🛒 Tienda Virtual - Proyecto FullStack con React + Node.js + Webpay + MongoDB

Este proyecto es una tienda virtual **FullStack** con integración de pago Webpay, panel de administración y autenticación vía **Google OAuth** o correo.

---

## 🚀 Tecnologías principales

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB (Atlas o local)
- **Pasarela de pago:** Webpay Plus (Transbank - modo integración)
- **Base de datos:** MongoDB (colecciones: productos, clientes, transacciones)
- **Autenticación:** Google OAuth 2.0 + login manual
- **Exportación:** PDF con `pdfkit` para historial de ventas

---

## 📁 Estructura del proyecto

```
/tienda-virtual/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── context/          # Manejo de carrito global (CartContext)
│   │   ├── components/       # Header, Modal, LoginForm, CartButton
│   │   ├── pages/            # Home, Checkout, Confirmación, Cpannel, MisCompras
│   │   ├── services/         # Llamadas Axios a API backend
│   │   └── App.jsx
├── server/
│   ├── models/               # Product, Contador, Cliente, Transaccion
│   ├── routes/               # products.js, webpay.js, transacciones.js, clientes.js
│   ├── services/             # Lógica de Webpay
│   ├── seed.js               # Script para resetear datos y contador
│   ├── index.js              # Entry point backend
└── .env
```

---

## ⚙️ Instalación y configuración

1️⃣ Clonar repositorio:
```bash
git clone <url>
cd tienda-virtual
```

2️⃣ Instalar dependencias:
```bash
cd client
npm install

cd ../server
npm install
```

3️⃣ Configurar `.env`:
```env
MONGO_URI=mongodb://localhost:27017/tienda_virtual
WEBPAY_COMMERCE_CODE=597055555532
WEBPAY_API_KEY=...
```

---

## ▶️ Ejecución

### ✅ Backend:
```bash
cd server
node index.js
```
Servidor: [http://localhost:5000](http://localhost:5000)

### ✅ Frontend:
```bash
cd client
npm run dev
```
App: [http://localhost:5173](http://localhost:5173)

---

## 🔑 Autenticación

- Modal de login con:
  - Google OAuth (`@react-oauth/google`)
  - Login manual por correo.
- Guarda sesión en `localStorage` y protege rutas:
  - `/checkout` y `/mis-compras` requieren login.
  - `admin@admin.com` desbloquea **Panel de Control**.

---

## 🛠 Panel de Control (`/cpannel`)

- CRUD de productos con ID incremental.
- Imagen y stock actualizables.
- Exportar historial de transacciones a PDF (`pdfkit`).
- Ver lista de compras.

---

## 💳 Pago con Webpay

1. El cliente genera una transacción (`/api/webpay/crear-transaccion`).
2. Redirige a Webpay de prueba.
3. Webpay redirige de vuelta a `/api/webpay/confirmar`.
4. La API confirma y guarda la transacción en MongoDB.

---

## ✅ Funcionalidades clave

- [x] Catálogo dinámico desde MongoDB.
- [x] Carrito con persistencia en contexto.
- [x] Checkout con validación de sesión.
- [x] Generar historial de compras.
- [x] Panel admin con CRUD y PDF.
- [x] Autenticación OAuth.
- [x] Webpay Plus test-ready.

---

## 🧪 Notas de prueba

- Modo Webpay Plus integración: **NO procesa pagos reales.**
- Admin test: usar `admin@admin.com` para ver panel.

---

## 🧑‍💻 Autor

Desarrollado por **Lloyd Higgs** — Proyecto FullStack para práctica y demostración profesional.

---

## 🗂️ Repositorio

> Clona y pruébalo. Contribuciones y forks bienvenidos 🚀
