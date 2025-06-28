const express = require('express');
const router = express.Router();
const Transaccion = require('../models/Transaccion');
const PDFDocument = require('pdfkit');

// ------------------------------------
// 🔹 Obtener TODAS las transacciones
// ------------------------------------
router.get('/', async (req, res) => {
  try {
    const data = await Transaccion.find().sort({ fecha: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------------------------
// 🔹 Generar PDF de transacciones
// ------------------------------------
router.get('/pdf', async (req, res) => {
  try {
    const transacciones = await Transaccion.find().sort({ fecha: -1 });

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=informe_ventas.pdf');

    doc.pipe(res);

    doc.fontSize(20).text('Informe de Ventas', { align: 'center' });
    doc.moveDown();

    transacciones.forEach(t => {
      doc.fontSize(12).text(`Fecha: ${new Date(t.fecha).toLocaleString()}`);
      doc.text(`Orden ID: ${t.ordenId}`);
      t.items.forEach(item => {
        doc.text(` - ${item.nombre} | Cantidad: ${item.cantidad} | Precio U.: $${item.precio}`);
      });
      doc.text(`Total: $${t.total}`);
      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
