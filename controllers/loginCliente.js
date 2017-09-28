// dependências:
const express = require('express');
const clienteSchema = require('../schemas/schCliente');
const passwordHash = require('password-hash');
//const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

let router = express.Router()
const segredo = process.env.appEco_secret;
console.log('>> o segredo é: ' + segredo);
//router.use(expressJwt({secret: segredo}));

router.post('/', (request, response) => {
   const query = {
     email: request.body.email
   };

  clienteSchema.findOne(query, (error, cliente) => {
    // PASSO: trata erro após a consulta ao banco de dados:
    if (error) {
      console.log('>>> Erro após a consulta (chamada no método o POST da rota /loginCliente)');
      response.status(400).send(error);
      return;
    };

    if (cliente && passwordHash.verify(request.body.senha, cliente.senha)) {
      // PASSO usuario e senha corretos:
      const token = jwt.sign({_id: cliente._id}, segredo);
      response.set('Authorization', token);
      // para teste local: Millena: Token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWNjM2M3MGUzNzM5MTU2ZWNkMTUxMDciLCJpYXQiOjE1MDY2Mjk5NTh9.-jTBcZOVB8XNeWv8_9ocMOarBYpBrAm7rHDZILyLcMQ
      response.send(cliente);
      return;
    } else {
      // PÀSSO mostrar erro de usuário ou senha:
      console.log(`>>> senha incorreta pra o usuário: ${cliente.email}`);
      response.status(400).send(`Usuário ou senha incorretos. Usuário digitado: ${cliente.email};  senha digitada ${cliente.senha}`);
      return;
    };
  });
});

module.exports = router;
