import React, { useEffect, useState } from 'react';
import {
  getProductos,
  addProducto,
  updateProducto,
  deleteProducto,
  getTransacciones,
  exportarPDF
} from '../services/api';

const Cpannel = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    imagen: '',
    descripcion: '',
    stock: '',
    precio: ''
  });
  const [editando, setEditando] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProductos();
    fetchVentas();
  }, []);

  const fetchProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const fetchVentas = async () => {
    const data = await getTransacciones();
    setVentas(data);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    await addProducto({
      ...form,
      stock: Number(form.stock),
      precio: Number(form.precio)
    });
    fetchProductos();
    setForm({ nombre: '', imagen: '', descripcion: '', stock: '', precio: '' });
  };

  const handleEdit = async () => {
    if (editId === null) {
      console.warn('ID de edición vacío');
      return;
    }

    await updateProducto(editId, {
      ...form,
      stock: Number(form.stock),
      precio: Number(form.precio)
    });

    fetchProductos();
    setEditando(false);
    setEditId(null);
    setForm({ nombre: '', imagen: '', descripcion: '', stock: '', precio: '' });
  };

  const handleDelete = async (id) => {
    await deleteProducto(id);
    fetchProductos();
  };

  const handleExportPDF = async () => {
    await exportarPDF();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛠 Panel de Administración</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border p-2"
        />
        <input
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          placeholder="URL Imagen"
          className="border p-2"
        />
        <input
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="border p-2 col-span-2"
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          className="border p-2"
        />
        <input
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
          type="number"
          className="border p-2"
        />

        {editando ? (
          <button onClick={handleEdit} className="bg-yellow-500 text-white p-2 rounded">
            Actualizar
          </button>
        ) : (
          <button onClick={handleAdd} className="bg-green-500 text-white p-2 rounded">
            Agregar
          </button>
        )}
      </div>

      <h2 className="text-xl font-semibold mt-6">📦 Productos</h2>
      <table className="w-full mt-2 table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p._id} className="text-center border-t">
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>
                <img src={p.imagen} alt={p.nombre} className="h-10 mx-auto" />
              </td>
              <td>{p.stock}</td>
              <td>${p.precio}</td>
              <td>
                <button
                  onClick={() => {
                    setForm({
                      nombre: p.nombre,
                      imagen: p.imagen,
                      descripcion: p.descripcion || '',
                      stock: p.stock,
                      precio: p.precio
                    });
                    setEditId(p.id);
                    setEditando(true);
                  }}
                  className="text-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 ml-2"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-6">📊 Ventas</h2>
      <table className="w-full mt-2 table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th>Fecha</th>
            <th>Item</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v, i) => (
            <React.Fragment key={i}>
              {v.items.map((item, idx) => (
                <tr key={idx} className="text-center border-t">
                  <td>{idx === 0 ? new Date(v.fecha).toLocaleString() : ''}</td>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.precio}</td>
                  {idx === 0 ? (
                    <td rowSpan={v.items.length}>${v.total}</td>
                  ) : null}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleExportPDF}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Exportar a PDF
      </button>
    </div>
  );
};

export default Cpannel;
