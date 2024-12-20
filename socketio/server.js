const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let connectedUsers = [];

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("Conexão detectada...");

    socket.on("join-request", username => {
        socket.username = username;

        connectedUsers.push(username);

        socket.emit("user-ok", connectedUsers);
        socket.broadcast.emit("list-update", {
            joined: username,
            list: connectedUsers
        });
    });

    socket.on("disconnect", ()=>{
        connectedUsers = connectedUsers.filter(u => u !== socket.username);
        
        socket.broadcast.emit("list-update", {
            left: socket.username,
            list: connectedUsers
        });
    });

    socket.on("send-msg", (txt) => {
        let obj = {
            username: socket.username,
            message: txt,
        }

        socket.broadcast.emit("show-msg", obj);
    });
});

server.listen(3000);