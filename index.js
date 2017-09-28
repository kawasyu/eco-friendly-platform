// dependências do projeto usadas na /index:
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const handlebars = require ('express-handlebars');
//app.engine('handlebars', handlebars({defaultLayout: 'main'}));
//app.set('view engine', 'handlebars');

// dependências do projeto usadas nas outras rotas:
//const passwordHash = require('password-hash');
//const jwt = require('jsonwebtoken');
//const expressJwt = require('express-jwt');

// schemas (usados nos controllers):
// const ClienteSchema = require('./schemas/schCliente');
// const ClienteSchema = require('./schemas/schFornecedor');
// const ClienteSchema = require('./schemas/schAdmin');

// controllers:
const pagClienteController = require('./controllers/pagCliente');
const pagAdminController = require ('./controllers/pagAdmin');
const pagLoginClienteController = require ('./controllers/loginCliente');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/eco');

// mudei a porta de 3000 para 3012 só para não confundir com os outros exercícios:
let server = app.listen(3012, () => {
    let port = server.address().port;
    console.log(`>>>> Servidor inicializado na porta: ${port}`);
});

app.use ('/pagCliente', pagClienteController);
app.use ('/pagAdmin', pagAdminController);
app.use ('/loginCliente', pagLoginClienteController);
// rotas abaixo utilizadas para teste:

app.get('/hello', (request, response) => {
    console.log("Hello World!!!");
    response.status(200).send('Hello World!!');
});

app.get('/', (request, response) => {
  console.log(`>>> teste método GET rota: /index - Ok`);
  response.status(200).send('Teste no método GET rota: /index finalizado com sucesso!')
});

app.post('/', (request, response) => {
  console.log(`>>> teste método GET rota: /index - Ok`);
  response.status(200).send(`Teste no método GET rota: /index finalizado com sucesso e o conteúdo digitado no teste foi: ${request.body.texto}`)
});
