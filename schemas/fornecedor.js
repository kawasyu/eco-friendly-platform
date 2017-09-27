const FornecedorSchema = mongoose.model("Fornecedor", {
   nomeFantasia:{type: String, required: true},
   email: {type: Number, required: true},
   telefone: {type: String, required: true},
   endereço: {type: String, required: true},
      site: {type: String, required: true},
   responsavel: {type: String, required: true},
   senha: {type: String, required: true},
   dataDeCadastro: {type: new Date, required: true}

   });

module.exports = FornecedorSchema;
