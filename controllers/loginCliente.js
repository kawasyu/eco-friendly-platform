// dependências:
const express = require('express');
const clienteSchema = require('../schemas/schCliente');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

let router = express.Router()
const segredo = process.env.appEco_secret;
//console.log('>> o segredo é: ' + segredo);

router.post('/', (request, response) => {
   const query = {
     email: request.body.email
   };

  clienteSchema.findOne(query, (error, cliente) => {
    // PASSO: trata erro após a consulta ao banco de dados:
    if (error) {
      //teste: console.log('>>> Erro após a consulta (chamada no método o POST da rota /loginCliente)');
      response.status(400).send(error);
      return;
    };

    if (cliente && passwordHash.verify(request.body.senha, cliente.senha)) {
      // PASSO usuario e senha corretos:
      const token = jwt.sign({_id: cliente._id}, segredo);
      response.set('Authorization', token);
      // para teste local:
      response.send(`Usuário ${cliente.email} logado`);
      return;
    } else {
      // PÀSSO mostrar erro de usuário ou senha:
      //teste: console.log(`>>> usuário ou senha incorretos. Usuário digitado: ${request.body.email}`);
      response.status(400).send(`Usuário ou senha incorretos. Usuário digitado: ${request.body.email};  senha digitada ${request.body.senha}`);
      return;
    };
  });
  //teste: console.log('>>> método POST, rota: /loginCliente finalizado com sucesso');
});

module.exports = router;
