var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var validator = require('validator');

// Renvoie la page client.html sur la requête /
app.get('/', function(req,res){
    res.sendFile(__dirname + '/client.html');
});

// Renvoie la page client.css sur la requête /client.css
app.get('/client.css', function(req,res){
    res.sendFile(__dirname + '/client.css');
});

//Initialise le serveur de socket pour recevoir les messages plus tard
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log("Message du client : " + msg);
        msg = validator.escape(msg);
        socket.broadcast.emit('chat message', msg);
    });
});

http.listen(process.env.PORT, process.env.IP);
