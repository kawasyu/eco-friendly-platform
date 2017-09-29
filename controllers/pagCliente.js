// dependências:
const express = require('express');
const passwordHash = require('password-hash');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

// schemas:
const clienteSchema = require('../schemas/schCliente');

let router = express.Router()


router.get ('/dadosCliente/:id', (request, response) => {
  const segredo = process.env.appEco_secret;
  router.use(expressJwt({secret: segredo}));
  // quando colocamos /:qqcoisa, o qqcoisa é uma informação que virá dinamicamente (e a informação vem no request.params.qqcoisa)
  // funcionalidade: recuperar os dados do usuário (e permitir mudança de senha - se der tempo - teria que criar uma rota de alteração de senha).
  // http://localhost:3012/pagCliente/dadosCliente/parametro
  // PROXIMO PASSO: cadastro de usuarios ser único, com difentes autorizações para usuários e para admins (em diferentes níveis)

  clienteSchema.findById(request.params.id, (error, cliente) => {
    if (error) {
      //teste: console.log('>>>> método GET, rota: /pagCliente/parametro via controller - NOK - erro na busca');
      response.status(401).send(error);
      return;
    };
    response.status(200).send(cliente);
  });
  //teste: console.log('>>>> método GET, rota: /pagCliente/parametro via controller - Ok');
  //teste: response.status(200).send('Teste método GET rota: /pagCliente finalizado com sucesso');
});

router.post ('/', (request, response) => {
  // funcionalidade: recebe dados do cliente preenchido e incluir cliente novo na base

  // PASSO: receber os dados preenchidos no corpo da requisição http em uma variável (que será um vetor com todos os campos do json que estarão preenchidos):
  let clienteNovo = new clienteSchema(request.body);

  // PASSO: pegar o campo senha que está no corpo da requisição, e passá-la pela função generate do password-hash para criptografá-la:
  clienteNovo.senha = passwordHash.generate(request.body.senha);

  // PASSO: gravar os dados na collection:
  clienteNovo.save ( (erro, resultado) => {
    // PASSO: tratar erro de gravação e exibir informações referentes ao erro
    if (erro) {
      //teste: console.log(`>>>> método POST, rota: /pagCliente - NOK, erro = ${erro}`);
      response.status(400).send(erro);
    };
    //teste: console.log('>>>> método POST, rota: /pagCliente. Registro incluído com sucesso');
    response.status(200).send(resultado);
  });

  // PRÓXIMOS PASSOS:
  // enviar um e-mail para o usuário dando as boas vindas à plataforma

  //teste: response.status(200).send(`Teste método POST, rota: /pagCliente finalizado com sucesso e o conteúdo do teste foi: ${request.body.texto}`);
});

  // PRÓXIMOS PASSOS:
  // para a rota de alteração de senha:
  // 1) buscar o usuario pelo email e senha e validar se a senha está correta
  // 2) receber a nova senha
  // 2.1) em dois campos diferentes, receber a nova senha
  // 2.2) validar se a senha é a mesma nos dois campos e se tem mais do que 5 caracteres (?)
  // 2.3) dar um update no cliente, buscando pelo email e atualizando o campo de senha dele

module.exports = router;
