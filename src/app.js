const senseLeds = require('sense-hat-led');
const app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PNG = require('pngjs').PNG

console.log('conecting...')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});
app.get('/video', (req, res) => {
    res.sendFile(__dirname + '/video.html');
});

io.on('connection', (socket) => {
    senseLeds.showMessage(':)', 0.2, [100, 100, 100]);
    socket.on('chat message', (msg) => {
        console.log('chat message received', msg)
        senseLeds.showMessage(msg, 0.2, [133, 133, 133]);
        io.emit('chat message', msg);
    })
    socket.on('image', (blob) => {
        console.log('received image', blob)
        var image = decodeBase64Image(blob)
        new PNG().parse(image.data, convertPNG);
    })
});


/**
 * Decode base64 string to buffer.
 *
 * @param {String} base64Str string
 * @return {Object} Image object with image type and data buffer.
 * @public
 */
function decodeBase64Image(base64Str) {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var image = {};
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];
    image.data = new Buffer(matches[2], 'base64');

    return image;
}


function convertPNG(error, png) {
    if (error) {
        console.error(`Could not parse PNG ${error.message}`);
        return;
    }
    const pixels = pngTopixels(png);
    senseLeds.setPixels(pixels);
}

function pngTopixels(png) {
    return Array.from(new Array(png.width * png.height), (_, i) => {
        return Array.from(new Array(3), (_, j) => png.data[i * 4 + j]);
    });
}

http.listen(80, () => {
    console.log('listening on *:80');
});
