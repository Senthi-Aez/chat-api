// var express = require("express");
// var http = require("http");
// var socket = require("socket.io");
// const cors = require("cors");

// var app = express();
// var server = http.createServer(app);
// const io = require("socket.io")(server, { cors: { origin: "*" } });

// app.use(cors());

// io.listen(server);
// io.sockets.on("connection", function (client) {
//     console.log("New client !");

//     client.on("message", function (data) {
//         console.log("Message received " + data.name + ":" + data.message);

//         //client.broadcast.emit( 'message', { name: data.name, message: data.message } );
//         io.sockets.emit("message", { name: data.name, message: data.message });
//     });
// });

// server.listen(8080, () => {
//     console.log("Server up");
// });

//index.js
const express = require("express");
const app = express();
//const PORT = 80;
const port = process.env.PORT || 8080;

console.log(port);

//Validating CORS
const https = require("https").Server(app);
const cors = require("cors");

app.use(cors());

const server = app.listen(port, () => {
    console.log(`Express Server listening on ${port}`);
});

//Imports Socket.io
const socketIO = require("socket.io")(https, {
    cors: {
        origin: "*",
    },
});

socketIO.listen(server);

socketIO.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("message", function (data) {
        console.log("Message received " + data.name + ":" + data.message);

        socketIO.emit("message", { name: data.name, message: data.message });
    });
});

app.get("/api", (req, res) => {
    res.json({
        message: "Hello QLER User",
    });
});
