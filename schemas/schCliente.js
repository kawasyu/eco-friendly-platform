const mongoose = require('mongoose');
const clienteSchema = mongoose.model('Cliente', {

 nome:{type: String, required: true},
 email: {type: String, required: true},
 telefone: {type: String},
 dataDeNascimento: {type: Date},
 senha: {type: String, required: true},
 dataDeCadastro: {type: Date, default: Date.now}
});

module.exports = clienteSchema;
