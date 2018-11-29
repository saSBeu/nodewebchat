// require Library
const express = require('express');
const socket = require('socket.io');


// create express server
const app = express();
const port = process.env.PORT || 5000
// serve static files in public folder
app.use(express.static('public'));

// start server annd listen on port
var server = app.listen(port);

// use  server on PORT 5000 for socketIo  connections
const io = socket(server);

// what should socketIo do?
// accept connection request from client and print user connected
// initialize empty array to store client connections
//var connections = [];

var usersOnline = 0;
var errmsg = 'Please enter your username/message';

io.on('connection', (socket) => {
    usersOnline++;
    /* connections.push(socket);
    console.clear();
    console.log(`${connections.length} user/s connected`); */
    io.sockets.emit('usersOnline', { usersOnline: usersOnline});

    socket.on('disconnect', () => {
        usersOnline--;
        /* connections.splice(connections.indexOf(socket), 1);
        console.clear();
        console.log(`${connections.length} user(s) remaining`); */
        io.sockets.emit('usersOnline', { usersOnline: usersOnline });
    });

    //get data from client and emit it to all clients
    socket.on('chat', (data)=>{
        let username = data.username;
        let message = data.message;

        if(username==''|| message==''){
            socket.emit('exception', {fielderr: errmsg});
        }else{
            io.sockets.emit('chat', data);
        }
    });

  
    // get user is typing from client and emit to all clients except you
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    });

});

