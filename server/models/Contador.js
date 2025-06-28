
const mongoose = require('mongoose');

const contadorSchema = new mongoose.Schema({
  nombre: String,
  seq: Number
});

module.exports = mongoose.model('Contador', contadorSchema);
