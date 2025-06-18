const { WebpayPlus, IntegrationApiKeys, IntegrationCommerceCodes, Options } = require('transbank-sdk');

const options = new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS, // '597055555532'
  IntegrationApiKeys.WEBPAY,            // '579B532A74408B0C9D079ED094D31EA1615BACD3'
  'https://webpay3gint.transbank.cl'    // URL endpoint integración
);

const transaction = new WebpayPlus.Transaction(options);
console.log("🧩 WebpayPlus.Transaction configurado correctamente (SDK 6.x)");

module.exports = { transaction };


// CREDENCIALES PARA REALIZAR LA TRASACCIÓN EN TRANSBANK
//  RUT: 11.111.111-1
// clave: 123
// TARJETA DEBITO: 	4511 3466 6003 7060