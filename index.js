var port = process.env.PORT || 4000;
var http = require('http');
var express = require('express');
var socket = require('socket.io');

var app = express();
var server = http.Server(app);

server.listen(port, function(){
    console.log("Requests en el puerto 4000");
});

app.use(express.static('public'));

var io = socket(server);
io.on('connection', function(socket){
    console.log("Conexión del socket exitosa", socket.id);

    socket.on('chat', function(data){
        io.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
