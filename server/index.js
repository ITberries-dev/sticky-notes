const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sticky-notes', { useNewUrlParser: true });
const Schema = mongoose.Schema;
const roomSchema = new Schema({
  name: { type: String, required: true },
  cards: [{ text: String }]
})
const Room = mongoose.model('Room', roomSchema);

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

io.on("connection", (socket) => {
  console.log("New client connected");
  let socketRoom;
  socket.on("goToRoom", (room) => {
    socketRoom = room;
    socket.join(socketRoom);
    console.log('joined room', socketRoom);

    Room.find({ name: socketRoom })
    .then(doc => {
      if(doc.length === 0){
        let roomData = new Room({name: socketRoom});
        roomData.save(function(err, roomData){
          console.log('some data', roomData)
          if (err) return console.error(err);
          io.to(socketRoom).emit('roomCards', roomData.cards);
        });
      } else {
        console.log(doc[0]);
        io.to(socketRoom).emit('roomCards', doc[0].cards);
      }
    })
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4001, () =>
  console.log('Express server is running on localhost:3001')
);