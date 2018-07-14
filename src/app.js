const senseLeds = require('sense-hat-led');
const app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

console.log('conecting...')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	senseLeds.showMessage(':)', [255, 0, 0], 0.3);

	socket.on('chat message', (msg) => {
		console.log('chat message received', msg)
		senseLeds.showMessage(msg, [133, 133, 133], 0.3);	
        io.emit('chat message', msg);
    })
});

http.listen(80, () => {
    console.log('listening on *:80');
});

