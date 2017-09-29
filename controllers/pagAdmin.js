// dependências:
const express = require('express');
const passwordHash = require('password-hash');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

// schemas:
const fornecedorSchema = require('../schemas/schFornecedor');
const adminSchema = require('../schemas/schAdmin');

let router = express.Router()


// para os testes que precisam de token. Pegar no header do resultado da requisição de login (postman)

router.post ('/', (request, response) => {
  // funcionalidade: cadastra admin.
  // PROXIMOS PASSOS: permitir que somente um admin cadastre outro admin; - verificar como pegar o id no token

  // PASSO: receber os dados preenchidos no corpo da requisição http em uma variável (que será um vetor com todos os campos do json que estarão preenchidos):
  let adminNovo = new adminSchema(request.body);

  // PASSO: pegar o campo senha que está no corpo da requisição, e passá-la pela função generate do password-hash para criptografá-la:
  adminNovo.senha = passwordHash.generate(request.body.senha);

  // PASSO: checa se o usuário cadastrado é admin para fazer o cadastro de outro admin:
  adminSchema.findById(request.params.id, (error, admin) => {
    if (error) {
      //teste:  console.log('>>> método GET, rota: /pagAdmin/parametro (checagem do admin) via controller - NOK - erro na busca');
      response.status(401).send(error);
      return;
    };
    //teste:  console.log('>>> método GET, rota: /pagCliente/parametro (checagem do admin) via controller - Ok');
    // PASSO: usuário é admin, pode fazer o cadastro:
      // PASSO: gravar os dados na collection:
      adminNovo.save ( (erro, novoAdmin) => {
        // PASSO: tratar erro de gravação e exibir informações referentes ao erro
        if (erro) {
          //teste:  console.log(`>>> método POST, rota: /pagAdmin - NOK, erro = ${erro}`);
          response.status(400).send(erro);
        };
        //teste:  console.log('>>> método POST, rota: /pagAdmin. Registro incluído com sucesso');
        response.status(200).send(novoAdmin);
      });
  });
  //teste:  console.log('>>> método POST, rota: /pagAdmin. Registro incluído com sucesso');
  //teste:  response.status(200).send(`Teste método POST, rota: /pagAdmin finalizado com sucesso e o conteúdo do teste foi: ${request.body.texto}`);
});

router.post ('/cadastroFornecedor', (request, response) => {
  // funcionalidade: recebe dados do fornecedor preenchido e incluir fornecedor novo na base
  // PASSO: verifica se o usuáro que está tentando cadastrar é um admin:

  // PASSO: verifica se o usuário que está tentando fazer o cadastro é um admin: - NAO FUNCIONA
  adminSchema.findById(request.params.id, (error, admin) => {
    console.log('id token: ' + request.params.id); //teste

    if (error) {
      //teste:  console.log('>>> método GET, rota: /pagAdmin/parametro (checagem do admin) via controller - NOK - erro na busca');
      response.status(401).send(error);
      return;
    };
    //teste:  console.log('>>> método GET, rota: /pagCliente/parametro (checagem do admin) via controller - Ok');
    //teste:  console.log('>>> admin: ' + JSON.stringify(admin)); // teste

    // PASSO: receber os dados preenchidos no corpo da requisição http em uma variável (que será um vetor com todos os campos do json que estarão preenchidos):
    let fornecedorNovo = new fornecedorSchema(request.body);

    // PASSO: pegar o campo senha que está no corpo da requisição, e passá-la pela função generate do password-hash para criptografá-la:
    fornecedorNovo.senha = passwordHash.generate(request.body.senha);

    // PASSO: gravar os dados na collection:
    fornecedorNovo.save ( (erro, fornecedor) => {
      // PASSO: tratar erro de gravação e exibir informações referentes ao erro
      if (erro) {
        //teste:  console.log(`>>> método POST, rota: /pagAdmin/cadastroFornecedor - NOK, erro = ${erro}`);
        response.status(400).send(erro);
        return;
      };
      //teste:  console.log('>>> método POST, rota: /pagAdmin/cadastroFornecedor. Registro incluído com sucesso');
      response.status(200).send(fornecedor);
    });
  });

  //teste:  console.log('>>> método POST, rota: /pagAdmin/cadastroFornecedor. Registro incluído com sucesso');
  //teste:  response.status(200).send(`Teste método POST, rota: /pagAdmin/cadastroFornecedor finalizado com sucesso e o conteúdo do teste foi: ${request.body.texto}`);
});

router.get ('/buscaFornecedores', (request, response) => {
  const segredo = process.env.appEco_secret;
  router.use(expressJwt({secret: segredo}));
  // funcionalidade: recuperar os dados de todos os fornecedores cadastrados.

  fornecedorSchema.find( (error, fornecedor) => {
    if (error) {
      //teste:  console.log('>>> método GET, rota: /pagAdmin/buscaFornecedores via controller - NOK - erro na busca');
      response.status(401).send(error);
      return;
    }
    response.status(200).send(fornecedor);
  });
  //teste:  console.log('>>> método GET, rota: /pagAdmin/buscaFornecedores via controller - Ok');
  //teste:  response.status(200).send('Teste método GET rota: /pagAdmin/buscaFornecedores finalizado com sucesso');
});

  // PRÓXIMOS PASSOS:
  // para a rota de alteração de senha:
  // 1) buscar o usuario pelo email e senha e validar se a senha está correta
  // 2) receber a nova senha
  // 2.1) em dois campos diferentes, receber a nova senha
  // 2.2) validar se a senha é a mesma nos dois campos e se tem mais do que 5 caracteres (?)
  // 2.3) dar um update no cliente, buscando pelo email e atualizando o campo de senha dele

module.exports = router;
