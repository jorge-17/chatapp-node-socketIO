//Cargamos el módulo express
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

var messages = [{
    id: 0,
    text: 'Bienvenido al chat Isra´s team',
    nickname: 'Isra´s team',
    time: ''
}];



//Conexión al socket
io.on('connection', function (socket) {
    console.log("El cliente con IP:" + socket.handshake.address + " se ha conectado....");

    socket.emit('messages', messages);

    socket.on('add-message', function (data) {
        messages.push(data);

        io.sockets.emit('messages', messages);
    });

});


//Creamos un servidor con express
server.listen(6677, function () {
    console.log('Servidor está funcionando en http://localhost:6677');
});