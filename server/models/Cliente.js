const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String },
  email: { type: String, required: true, unique: true },
  telefono: { type: String },
  googleId: { type: String }, 
});

module.exports = mongoose.model('Cliente', ClienteSchema);
