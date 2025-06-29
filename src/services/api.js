import axios from 'axios';

// ✅ Endpoints consistentes
const API_PRODUCTOS = 'http://localhost:5000/api/productos';
const API_TRANSACCIONES = 'http://localhost:5000/api/transacciones';

// -------------------------------
// 📦 CRUD Productos
// -------------------------------

export const getProductos = async () => {
  const res = await axios.get(API_PRODUCTOS);
  return res.data;
};

export const addProducto = async (data) => {
  return await axios.post(API_PRODUCTOS, {
    nombre: data.nombre,
    descripcion: data.descripcion,
    imagen: data.imagen, 
    stock: Number(data.stock),
    precio: Number(data.precio)
  });
};

export const updateProducto = async (id, data) => {
  return await axios.put(`${API_PRODUCTOS}/${id}`, {
    nombre: data.nombre,
    descripcion: data.descripcion,
    imagen: data.imagen, 
    stock: Number(data.stock),
    precio: Number(data.precio)
  });
};

export const deleteProducto = async (id) => {
  return await axios.delete(`${API_PRODUCTOS}/${id}`);
};

// -------------------------------
// 📊 Transacciones
// -------------------------------

export const getTransacciones = async () => {
  const res = await axios.get(API_TRANSACCIONES);
  return res.data;
};

export const exportarPDF = async () => {
  const res = await axios.get(`${API_TRANSACCIONES}/pdf`, {
    responseType: 'blob'
  });

  // 🔥 Descargar PDF:
  const blob = new Blob([res.data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'informe_ventas.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
