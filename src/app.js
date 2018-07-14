const senseLeds = require('sense-hat-led');

console.log('conecting...')
const socket = require('socket.io-client')('http://10.47.73.28:3000');

socket.on('connect', () => {
	console.log('connected!')
	senseLeds.showMessage(':)', [255, 0, 0], () => {});
})
socket.on('chat message', (msg) => {
	senseLeds.showMessage(msg, [255, 0, 0], () => {});
})
socket.on('disconect', () => {
	console.log('disconnected :(')
	senseLeds.showMessage(':)', [255, 0, 0], () => {});
})
