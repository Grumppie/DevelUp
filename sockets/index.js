const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(data)
    });

    socket.on("send_message", (data) => {
        socket.to(data.data).emit("receive_message", data);
    });
});

server.listen(5001, () => {
    console.log("SOCKET IS RUNNING");
});