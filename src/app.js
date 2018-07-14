const senseLeds = require('sense-hat-led');
const socket = require('socket.io-client')('http://10.47.73.28:3000');

socket.on('connect', () => {
	senseLeds.showMessage(':)', [255, 0, 0], () => {});
})
socket.on('chat message', (msg) => {
	senseLeds.showMessage(msg, [255, 0, 0], () => {});
})
