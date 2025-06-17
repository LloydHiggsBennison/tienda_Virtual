const { WebpayPlus } = require('transbank-sdk');

// No usar "new" aquí, simplemente exportamos el objeto
const transaction = WebpayPlus.Transaction;

module.exports = { transaction };
