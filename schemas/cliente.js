const mongoose = require('mongoose');
const ClienteSchema = mongoose.model('Cliente', {

 nome:{type: String, required: true},
 email: {type: Number, required: true},
 telefone: {type: String},
 dataDeNascimento: {type: String},
 senha: {type: String, required: true},
 dataDeCadastro: {type: String}
});



module.exports = ClienteSchema;
