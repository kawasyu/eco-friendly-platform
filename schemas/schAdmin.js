const fornecedorSchema = mongoose.model("admin", {
   nome:{type: String, required: true},
   email: {type: String, required: true},
   depto: {type: String, required: true},
   cargo: {type: String, required: true},
   permissoes: {type: String, required: true},
   senha: {type: String, required: true},
   dataDeCadastro: {type: Date, default: Date.now}
   });

module.exports = fornecedorSchema;
