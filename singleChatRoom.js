//  CHAT SERVER APPLICATION
//  NODE JS SERVER FILE

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(8080);
//var server = http.createServer(app).listen(process.env.PORT);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
app.get('*', function (request, response) {
    response.redirect('Index.html');
});

var users = {};
io.sockets.on('connection', function (socket) {

    socket.on('sendChat', function (data) {
        io.sockets.emit('updateChat', socket.username, data);
    });

    socket.on('addUser', function (username) {
        socket.username = username;
        users[username] = username;
        socket.emit('updateChat', 'Chat Service message', 'You have entered the chat room.');
        socket.broadcast.emit('updateChat', username, 'has entered the chat room.');
        io.sockets.emit('updateUsers', users);
    });

    socket.on('disconnect', function () {
        delete users[socket.username];
        socket.broadcast.emit('updateChat', socket.username, 'has left the chat room.');
        io.sockets.emit('updateUsers', users);
    });

    console.log('New client has been connected');
});
