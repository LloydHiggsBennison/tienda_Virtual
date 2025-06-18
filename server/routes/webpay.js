const express = require('express');
const router = express.Router();
const { transaction } = require('../services/webpay');

router.post('/crear-transaccion', async (req, res) => {
  const { ordenId, total, correo } = req.body;

  try {
    const response = await transaction.create(
      ordenId,
      ordenId,
      Number(total),
      'http://localhost:5000/api/webpay/confirmar'
    );

    res.json({
      url: response.url,
      token: response.token,
      message: 'Transacción creada exitosamente'
    });
  } catch (err) {
    console.error('Error al crear transacción:', err);
    res.status(500).json({
      error: 'Error al crear transacción',
      details: err.message
    });
  }
});

router.all('/confirmar', async (req, res) => {
  const token = (req.body && req.body.token_ws) || (req.query && req.query.token_ws);

  if (!token) {
    return res.status(400).send('Token no proporcionado');
  }

  try {
    const response = await transaction.commit(token);
    const { buy_order, status, response_code } = response;

    console.log('✔️ Transacción confirmada:', response);

    res.redirect(
      `http://localhost:5173/confirmacion?estado=${status}&orden=${buy_order}&codigo=${response_code}`
    );
  } catch (err) {
    console.error('❌ Error al confirmar transacción:', err);
    res.redirect(
      `http://localhost:5173/confirmacion?estado=ERROR&mensaje=${encodeURIComponent('Error al confirmar transacción')}`
    );
  }
});


// ⚠️ Ruta GET opcional para evitar 404 al acceder manualmente
router.get('/confirmar', (req, res) => {
  res.send('⚠️ Esta ruta debe ser usada vía POST desde Webpay. Si ves este mensaje, es porque accediste incorrectamente.');
});

module.exports = router;
