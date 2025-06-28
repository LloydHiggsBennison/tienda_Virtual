const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Product = require('./models/Product');
const Contador = require('./models/Contador'); // 👈 Agrega el modelo contador

console.log("⏳ Conectando a:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado a MongoDB");

    // Limpia productos
    await Product.deleteMany();
    console.log("🧹 Productos antiguos eliminados");

    // Limpia y reinicia contador
    await Contador.deleteOne({ nombre: 'productos' });
    await Contador.create({ nombre: 'productos', seq: 3 }); // seq = cantidad de productos base
    console.log("🔢 Contador reiniciado en seq = 3");

    // Inserta productos con id manual
    await Product.insertMany([
      {
        id: 1,
        nombre: 'Zapatillas Urbanas',
        descripcion: 'Zapatillas cómodas para uso diario.',
        precio: 29990,
        stock: 10,
        imagen: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        nombre: 'Polera Estampada',
        descripcion: 'Polera 100% algodón con diseño moderno.',
        precio: 15990,
        stock: 20,
        imagen: 'https://via.placeholder.com/150'
      },
      {
        id: 3,
        nombre: 'Chaqueta Impermeable',
        descripcion: 'Ideal para días lluviosos.',
        precio: 49990,
        stock: 5,
        imagen: 'https://via.placeholder.com/150'
      }
    ]);

    console.log('✅ Productos insertados correctamente con ID incremental');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Error:', err));
