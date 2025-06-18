const { WebpayPlus, Environment } = require('transbank-sdk');

const transaction = new WebpayPlus.Transaction({
  commerceCode: '597055555532', // Código comercio válido
  apiKey: 'test', // ✅ CORRECTO: API Key de pruebas
  environment: Environment.Integration
});

console.log("🧩 Configuración Webpay corregida (apiKey: 'test')");
module.exports = { transaction };