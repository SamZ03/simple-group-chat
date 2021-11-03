const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", socket => {
  socket.on("pesan-baru", pesan => {
    io.emit("pesan-baru", pesan);
    socket.emit("pesan-diterima");
  });
});

server.listen(PORT);