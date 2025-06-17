const express = require('express');
const router = express.Router();
const { transaction } = require('../services/webpay');

let transacciones = {}; // Memoria temporal para guardar detalles

// Iniciar transacción
router.post('/crear-transaccion', async (req, res) => {
  const { ordenId, total, correo } = req.body;

  try {
    const response = await transaction.create(
      ordenId,     // buy_order
      ordenId,     // session_id
      total,
      'http://localhost:5000/api/webpay/confirmar'  // return_url
    );

    // Guarda datos en memoria
    transacciones[ordenId] = { correo, total };

    // Envía URL y token al frontend
    res.json({ url: response.url, token: response.token });
  } catch (err) {
    console.error('Error al crear transacción:', err);
    res.status(500).json({ error: 'Error al crear transacción' });
  }
});

// Confirmación de transacción (retorno desde Webpay)
router.post('/confirmar', async (req, res) => {
  const token = req.body.token_ws;

  if (!token) {
    return res.status(400).send('Token no proporcionado');
  }

  try {
    const response = await transaction.commit(token);
    const { buy_order, status } = response;

    console.log('✔️ Transacción confirmada:', response);

    res.redirect(`http://localhost:5173/confirmacion?estado=${status}&orden=${buy_order}`);
  } catch (err) {
    console.error('❌ Error al confirmar transacción:', err);
    res.status(500).send('Error al confirmar');
  }
});

module.exports = router;
