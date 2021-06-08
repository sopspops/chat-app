const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    socket.on('new user', (usr) => {
        socket.username = usr;
        console.log('User connected - Username: ' + socket.username);
    });

    socket.on('new message', (msg) => {
        io.emit('send message', {message: msg, username: socket.username});
    });

    socket.on('disconnect', () => {
        console.log('User disconnected - Username: ' + socket.username);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});