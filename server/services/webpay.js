const { WebpayPlus, IntegrationApiKeys, IntegrationCommerceCodes, Options } = require('transbank-sdk');

const options = new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS, 
  IntegrationApiKeys.WEBPAY,            
  'https://webpay3gint.transbank.cl'    
);

const transaction = new WebpayPlus.Transaction(options);
console.log("🧩 WebpayPlus.Transaction configurado correctamente (SDK 6.x)");

module.exports = { transaction };


// CREDENCIALES PARA REALIZAR LA TRASACCIÓN EN TRANSBANK
//  RUT: 11.111.111-1
// clave: 123
// TARJETA DEBITO: 	4511 3466 6003 7060
