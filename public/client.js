// make connection to server
var socket = io.connect('http://localhost:5000');

// query DOM
var message = document.getElementById('message');
    username = document.getElementById('username');
    output = document.getElementById('output');
    btn = document.getElementById('send');
    feedback = document.getElementById('feedback');
    usersOnline = document.getElementById('usersOnline');
    fielderror = document.getElementById('fielderror');

// emit events
btn.addEventListener('click', () => {

// emit the data to be sent
socket.emit('chat', {
    username: username.value,
    message: message.value
});
});

// add "user is typing" on Keypressevent
message.addEventListener('keypress', () => {
    socket.emit('typing', username.value)
});

// Display data in empty div on that event
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML +=  '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
})

socket.on('typing', (data) => {
    feedback.innerHTML = '<p>' + data + ' is typing a message...</p>'
})

// Display how many users are online
socket.on('usersOnline', (data) => {
    usersOnline.innerHTML = '<p>' + data.usersOnline + ' user/s are online right now! Have fun.</p>'
})

socket.on('exception', (data)=>{

    fielderror.innerHTML='<p>'+data.fielderr+'</p>';
});