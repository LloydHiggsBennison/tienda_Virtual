const express = require('express');
const router = express.Router();
const { transaction } = require('../services/webpay');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const fs = require('fs'); // 👈 Para log de respaldo

const LOG_PATH = './logs/webpay.log';

// Crear transacción
router.post('/crear-transaccion', async (req, res) => {
  const { ordenId, total, correo, items } = req.body;

  try {
    const response = await transaction.create(
      ordenId,
      ordenId,
      Number(total),
      'http://localhost:5000/api/webpay/confirmar'
    );

    req.app.locals[ordenId] = items;

    res.json({
      url: response.url,
      token: response.token,
      message: 'Transacción creada exitosamente'
    });
  } catch (err) {
    console.error('❌ Error al crear transacción:', err);
    res.status(500).json({
      error: 'Error al crear transacción',
      details: err.message
    });
  }
});

// Confirmar transacción
router.all('/confirmar', async (req, res) => {
  const token = (req.body && req.body.token_ws) || (req.query && req.query.token_ws);
  if (!token) return res.status(400).send('Token no proporcionado');

  try {
    const response = await transaction.commit(token);
    const { buy_order, status, response_code } = response;

    console.log('✔️ Transacción confirmada:', response);
    fs.mkdirSync('./logs', { recursive: true });
    fs.appendFileSync(LOG_PATH, `\n[${new Date().toISOString()}] Transacción confirmada:\n${JSON.stringify(response, null, 2)}\n`);

    if (status === 'AUTHORIZED') {
      const items = req.app.locals[buy_order] || [];

      fs.appendFileSync(LOG_PATH, `\n🛒 Productos para reducir stock (orden ${buy_order}):\n${JSON.stringify(items, null, 2)}\n`);

      for (const item of items) {
        try {
          const result = await Product.findByIdAndUpdate(
            new mongoose.Types.ObjectId(item._id),
            { $inc: { stock: -item.cantidad } },
            { new: true }
          );

          if (result) {
            console.log(`✅ Stock actualizado para ${item._id}: nuevo stock ${result.stock}`);
            fs.appendFileSync(LOG_PATH, `✅ Actualizado: ${item._id} - nuevo stock: ${result.stock}\n`);
          } else {
            console.warn(`⚠️ Producto no encontrado: ${item._id}`);
            fs.appendFileSync(LOG_PATH, `⚠️ Producto no encontrado: ${item._id}\n`);
          }
        } catch (error) {
          console.error(`❌ Error al actualizar ${item._id}:`, error.message);
          fs.appendFileSync(LOG_PATH, `❌ Error en ${item._id}: ${error.message}\n`);
        }
      }

      delete req.app.locals[buy_order];
    }

    res.redirect(
      `http://localhost:5173/confirmacion?estado=${status}&orden=${buy_order}&codigo=${response_code}`
    );
  } catch (err) {
    console.error('❌ Error al confirmar transacción:', err);
    fs.appendFileSync(LOG_PATH, `❌ Error en confirmación:\n${err.message}\n`);
    res.redirect(
      `http://localhost:5173/confirmacion?estado=ERROR&mensaje=${encodeURIComponent('Error al confirmar transacción')}`
    );
  }
});

module.exports = router;
