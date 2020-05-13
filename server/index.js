const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4001, () =>
  console.log('Express server is running on localhost:3001')
);