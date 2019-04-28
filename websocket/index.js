const fs = require('fs');
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  const stream = fs.createReadStream('index.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  stream.pipe(res);
});
const io = require('socket.io').listen(server);
server.listen(3131);

io.sockets.on('connection', (socket) => {
  socket.emit('greeting', {message: 'hello'}, (data) => {
    console.log('result: ' + data);
  });

  socket.on('post global message', ({message}) => {
    io.sockets.emit('global message posted', {message});
  });
});