const express = require('express');
const app = express();
// Socket.io has to use the http server
const server = require('http').Server(app);
const io = require('socket.io')(server);
let onlineUsers = {};
let channels = { General: [] };
io.on('connection', (socket) => {
  // console.log('🔌 New user connected! 🔌');
  // Make sure to send the users to our chat file
  require('./sockets/chat.js')(io, socket, onlineUsers, channels);
});
// Express View Engine for Handlebars
const { engine } = require('express-handlebars');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

//Establish your public folder
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index.handlebars');
});
server.listen('3000', () => {
  console.log('Server listening on Port 3000');
});
