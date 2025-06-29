const express = require('express');
const router = express.Router();
const Producto = require('../models/Product');
const Contador = require('../models/Contador');

// ---------------------------
// ✅ GET todos los productos
// ---------------------------
router.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

// ---------------------------
// ✅ POST: agregar producto con ID incremental
// ---------------------------
router.post('/', async (req, res) => {
  // Busca o crea contador
  let contador = await Contador.findOne({ nombre: 'productos' });
  if (!contador) {
    contador = await Contador.create({ nombre: 'productos', seq: 1 });
  } else {
    contador.seq += 1;
    await contador.save();
  }

  const nuevoProducto = new Producto({
    id: contador.seq,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion, // ✅ descripción agregada
    imagen: req.body.imagen,
    stock: req.body.stock,
    precio: req.body.precio
  });

  await nuevoProducto.save();
  res.json(nuevoProducto);
});

// ---------------------------
// ✅ PUT: actualizar producto por ID incremental
// ---------------------------
router.put('/:id', async (req, res) => {
  const updated = await Producto.findOneAndUpdate(
    { id: Number(req.params.id) },
    {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion, // ✅ descripción actualizada
      imagen: req.body.imagen,
      stock: req.body.stock,
      precio: req.body.precio
    },
    { new: true }
  );
  res.json(updated);
});

// ---------------------------
// ✅ DELETE: eliminar producto por ID incremental
// ---------------------------
router.delete('/:id', async (req, res) => {
  await Producto.findOneAndDelete({ id: Number(req.params.id) });
  res.json({ msg: 'Producto eliminado' });
});

module.exports = router;
