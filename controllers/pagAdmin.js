// dependências:
// dependências:
const express = require('express');
const passwordHash = require('password-hash');
const bodyParser = require('body-parser');

// schemas:
//const clienteSchema = require('../schemas/schFornecedor');
//const clienteSchema = require('../schemas/schAdmin');

let router = express.Router();

/*
router.get ('/', (request, response) => {
  // para teste:
  clienteSchema.find( (error, cliente) => {
    if (error) {
      console.log('>>>> método GET, rota: /pagCliente?email via controller - NOK - erro na busca');
      response.status(401).send(error);
      return;
    }
    response.status(200).send(cliente);
  });
  console.log('>>>> método GET, rota: /pagCliente?email via controller - Ok');
  //teste: response.status(200).send('Teste método GET rota: /pagCliente finalizado com sucesso');
});
*/

router.get ('/buscaFornecedores', (request, response) => {
  // funcionalidade: recuperar os dados de todos os fornecedores cadastrados.
  // ATENÇÃO: autorizar a busca apenas se o token do usuário informar que ele é um admin: ou seja, precisamos do token do cara
  // neste momento, vou fazer a busca por e-mail, então o e-mail do usuário precisa aparecer no token;
  // depois que o token for incluido no login, vamos buscar por id: /pagCliente?id=(...)
  // busca nos testes: /pagCliente/buscaFornecedores
/*
  clienteSchema.find( (error, cliente) => {
    if (error) {
      console.log('>>>> método GET, rota: /pagCliente?email via controller - NOK - erro na busca');
      response.status(401).send(error);
      return;
    }
    response.status(200).send(cliente);
  });*/
  console.log('>>>> método GET, rota: /pagAdmin/buscaFornecedores via controller - Ok');
  teste: response.status(200).send('Teste método GET rota: /pagAdmin/buscaFornecedores finalizado com sucesso');
});

router.post ('/cadastroFornecedor', (request, response) => {
  // funcionalidade: recebe dados do fornecedor preenchido e incluir fornecedor novo na base
  /*
  // PASSO: receber os dados preenchidos no corpo da requisição http em uma variável (que será um vetor com todos os campos do json que estarão preenchidos):
  let clienteNovo = new clienteSchema(request.body);

  // PASSO: pegar o campo senha que está no corpo da requisição, e passá-la pela função generate do password-hash para criptografá-la:
  clienteNovo.senha = passwordHash.generate(request.body.senha);

  // PASSO: gravar os dados na collection:
  clienteNovo.save ( (erro, resultado) => {
    // PASSO: tratar erro de gravação e exibir informações referentes ao erro
    if (erro) {
      console.log(`>>>> método POST, rota: /pagCliente - NOK, erro = ${erro}`);
      response.status(400).send(erro);
    };
    console.log('>>>> método POST, rota: /pagCliente. Registro incluído com sucesso');
    response.status(200).send(resultado);
  });
  */

  console.log('>>>> método POST, rota: /pagAdmin/cadastroFornecedor. Registro incluído com sucesso');
  //teste:
  response.status(200).send(`Teste método POST, rota: /pagAdmin/cadastroFornecedor finalizado com sucesso e o conteúdo do teste foi: ${request.body.texto}`);
});

  // PRÓXIMOS PASSOS:
  // para a rota de alteração de senha:
  // 1) buscar o usuario pelo email e senha e validar se a senha está correta
  // 2) receber a nova senha
  // 2.1) em dois campos diferentes, receber a nova senha
  // 2.2) validar se a senha é a mesma nos dois campos e se tem mais do que 5 caracteres (?)
  // 2.3) dar um update no cliente, buscando pelo email e atualizando o campo de senha dele

module.exports = router;
