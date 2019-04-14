/* 

Arquivo central da aplicação. Quando quiser iniciar a aplicação, será pelo server.js

*/

//Define todas as bibliotecas necessárias
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//Variávle da nossa aplicação, vai guardar todas as informações da aplicação;
const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('coonectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://gdagosto:123@week6-ao9e0.mongodb.net/test?retryWrites=true',
 {
    useNewUrlParser: true
})

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(express.json()); //Ajuda o servidor a entender json
app.use(express.urlencoded({extended: true})); //Permite o envio de arquivos pela requisição
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp'))); //Redireciona


app.use(require('./routes')); //Importa o routes.js

server.listen(process.env.PORT || 3333);
