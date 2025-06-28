const mongoose = require('mongoose');

const transaccionSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now
  },
  ordenId: {
    type: String,
    required: true
  },
  items: [
    {
      id: {
        type: String, 
        required: true
      },
      nombre: {
        type: String,
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      },
      precio: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Transaccion', transaccionSchema);
