const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Product = require('./models/Product');

console.log("⏳ Conectando a:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado a MongoDB");

    await Product.deleteMany();
    console.log("🧹 Productos antiguos eliminados");

    await Product.insertMany([
      {
        nombre: 'Zapatillas Urbanas',
        descripcion: 'Zapatillas cómodas para uso diario.',
        precio: 29990,
        stock: 10,
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Polera Estampada',
        descripcion: 'Polera 100% algodón con diseño moderno.',
        precio: 15990,
        stock: 20,
        imagen: 'https://via.placeholder.com/150'
      },
      {
        nombre: 'Chaqueta Impermeable',
        descripcion: 'Ideal para días lluviosos.',
        precio: 49990,
        stock: 5,
        imagen: 'https://via.placeholder.com/150'
      }
    ]);

    console.log('✅ Productos insertados correctamente');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Error:', err));
