var express = require('express');
var app=express();
var http = require('http').createServer(app);
var path = require('path');
var socketio = require('socket.io')(http);

const PORT = process.env.PORT || 3000

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

app.use(express.static("chat_client"));

socketio.on('connection', function (socket) {
    console.log("new user connected");

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('chat message', function (data){
        socketio.sockets.emit('chat message', {msg: data, username:socket.username});
        console.log(data);
    });

    socket.on('user login', function(username){
        socket.username=username;
        console.log("user: "+socket.username);
    })
});

http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
