const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// POST /api/clientes
router.post('/', async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, googleId } = req.body;

    // Si ya existe, actualiza; si no, crea
    const cliente = await Cliente.findOneAndUpdate(
      { email },
      { nombre, apellido, telefono, googleId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json(cliente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error guardando cliente' });
  }
});

module.exports = router;
