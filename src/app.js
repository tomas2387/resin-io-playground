const senseLeds = require('sense-hat-led');
const app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

console.log('conecting...')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	senseLeds.showMessage(':)', 0.5, [255, 0, 0]);
	socket.on('chat message', (msg) => {
		console.log('chat message received', msg)
		senseLeds.showMessage(msg, 0.5, [133, 133, 133]);	
        io.emit('chat message', msg);
    })
});

http.listen(80, () => {
    console.log('listening on *:80');
});

