const express = require('express');

const http = require('http');
const socketio = require('socket.io');

var cors = require('cors');

const app = express();
app.use(cors())
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
});

io.on('connection', (socket) => {
    console.log('We have new connection');

    socket.on('join', ({room}  ) => {
        console.log(room)
    })

    socket.on('disconnect', () => {
        console.log('User left');
    })
});



const PORT = process.env.PORT || 5000;

const router = require('./router');

app.use(router)

server.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`);
});