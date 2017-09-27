const mongoose = require('mongoose');
const fornecedorSchema = mongoose.model("fornecedor", {
   nomeFantasia:{type: String, required: true},
   estilo: {type: String, required: true},
   categ: {type: String, required: true},
   subcateg: {type: String, required: true},
   email: {type: String, required: true},
   telefone: {type: String, required: true},
   endereço: {type: String, required: true},
   site: {type: String, required: true},
   responsavel: {type: String, required: true},
   senha: {type: String, required: true},
   dataDeCadastro: {type: Date, default: Date.now}

   });

module.exports = fornecedorSchema;
