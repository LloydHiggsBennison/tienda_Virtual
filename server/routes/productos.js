const express = require('express');
const router = express.Router();
const Producto = require('../models/Product');
const Contador = require('../models/Contador');

// GET: todos los productos
router.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

// POST: agregar producto con ID incremental
router.post('/', async (req, res) => {
  let idNuevo;

  // Busca el contador
  let contador = await Contador.findOne({ nombre: 'productos' });
  if (!contador) {
    contador = await Contador.create({ nombre: 'productos', seq: 1 });
  } else {
    contador.seq += 1;
    await contador.save();
  }

  idNuevo = contador.seq;

  const nuevoProducto = new Producto({
    id: idNuevo,
    nombre: req.body.nombre,
    foto: req.body.foto,
    stock: req.body.stock,
    precio: req.body.precio,
  });

  await nuevoProducto.save();
  res.json(nuevoProducto);
});

// PUT: actualizar producto
router.put('/:id', async (req, res) => {
  const updated = await Producto.findOneAndUpdate(
    { id: req.params.id },
    {
      nombre: req.body.nombre,
      foto: req.body.foto,
      stock: req.body.stock,
      precio: req.body.precio,
    },
    { new: true }
  );
  res.json(updated);
});

// DELETE: borrar producto (ID (incremental) reutilizable, no el _id de Mongo)
router.delete('/:id', async (req, res) => {
  await Producto.findOneAndDelete({ id: req.params.id });
  res.json({ msg: 'Producto eliminado' });
});

module.exports = router;
