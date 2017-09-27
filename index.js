const express = require('express');
//const handlebars = require ('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const passwordHash = require('password-hash');
//const jwt = require('jsonwebtoken');
//const expressJwt = require('express-jwt');
const ClienteSchema = require('./schemas/cliente');

const app = express();
app.use(bodyParser.json());
//app.engine('handlebars', handlebars({defaultLayout: 'main'}));
//app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/eco');

app.listen(3000, () => {
    console.log('Servidor inicializado');
});

app.get('/hello', (request, response) => {
    console.log("Hello World!!!");
    response.status(200).send('Hello World!!');
});


// app.post('/cliente', (request, response) => {
//   let cliente = new ClienteSchema(request.body);
//   console.log("1");
//   cliente.save((error, resultado) => {
//     console.log("2");
//     response.status(201).send(cliente);
//     console.log("3");
//   });
//
//   });

app.post('/cliente', (req, res) => {
    let cliente = new ClienteSchema(req.body);

    cliente.save((err, response) => {
      res.status(200).send(cliente);
    });
});


  app.get('/cliente', (request, response) => {
      ClienteSchema.find((error, clientes) => {
          if(error) {
              response.sendStatus(400)
              return;
          };
          response.status(200).send(clientes);
      });
  });


//app.get('/cliente', (request, response) => {
  //  ClienteSchema.log("Welcome!!!");
    //response.status(200).send('xxxxx!!');
