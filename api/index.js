const express = require('express');

const http = require('http');
const socketio = require('socket.io');

const { addUser, getUser, getUsersInRoom, removeUser } = require('./users');
const { init, 
        rollFunction, 
        getRolledNumbers, 
        removeRolledNumbers, 
        getActivePlayer, 
        changeActivePlayer,
        sumNumbers
    } = require('./game')

var cors = require('cors');

const app = express();
app.use(cors())
const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: "http://192.168.0.21:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
});

io.on('connection', (socket) => {
    
    socket.on('join', ({name, room}, callback) => {
        const rollId = 0;
        const currentPoints = [0];
        const allPoints = 0;
        const activePlayer = 0;
        const { error, user } = addUser({id: socket.id, name, room, rollId, currentPoints, allPoints, activePlayer});
       
        if(error) return callback(error)

        socket.join(user.room);

        
        
        const numUsers = getUsersInRoom(user.room)
        
        numUsers.map( (u) => {
            if(u.rollId == u.activePlayer) {
                socket.broadcast.emit('hideButton', { hideButton: true})
            }
        })
        console.log('agian');

        //console.log(rollFunction());
        // if ther more thamn 3 players, delete the third player from users array
        if(numUsers.length >= 3) {
            
                const user = removeUser(numUsers[2].id);
                if(user) {
                    io.to(user.room).emit('message', `${user.name} has left`)
                    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
                    console.log('User left')
                }
               
        }

        // console.log(getUsersInRoom(user.room));
        io.to(user.room).emit('roomData', { users: getUsersInRoom(user.room)})
    
        callback();
        
    });

    socket.on('roll', () => {
        const user = getUser(socket.id);
        
        if(user.rollId == user.activePlayer) {
           
            let rolledNumber = rollFunction();
            user.currentPoints.push(rolledNumber); 
            
            const users = getUsersInRoom(user.room);
           
            io.to(user.room).emit('roomData', { users }); 
        }
       
       
    })

    socket.on('hold', () => {
        const user = getUser(socket.id);
        if(user.rollId == user.activePlayer) {
           const currentPoints = sumNumbers(user.currentPoints);
           user.allPoints += currentPoints;
           user.currentPoints = [0];
           socket.emit('hideButton', { hideButton: false})
           getUsersInRoom(user.room).map( u => {
            if(u.rollId != u.activePlayer) {
                u.activePlayer = u.activePlayer === 0 ? u.activePlayer = 1 : u.activePlayer = 0;
                socket.broadcast.emit('hideButton', { hideButton: true})
            } else {
                user.activePlayer = user.activePlayer === 0 ? user.activePlayer = 1 : user.activePlayer = 0;
            }
            })
           
            
           const  users = getUsersInRoom(user.room);
        
           io.to(user.room).emit('roomData', { users }) 
        } 
    })

    

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', `${user.name} has left`)
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
            console.log('User left')
           // removeRolledNumbers();
        }
       
    })
});



const PORT = process.env.PORT || 5000;

const router = require('./router');
const { get } = require('./router');
const { isFunction } = require('util');

app.use(router)

server.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`);
});