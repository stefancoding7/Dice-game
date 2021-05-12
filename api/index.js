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
    
    socket.on('join', ({name, room, maxscore}, callback) => {
        const rollId = 0;
        const currentPoints = [0];
        const allPoints = 0;
        const activePlayer = 0;
        const rolling = false;
        const { error, user } = addUser({id: socket.id, name, room, maxscore, rollId, currentPoints, allPoints, activePlayer, rolling});
        if(error) return callback(error)

        socket.join(user.room);

       // io.to(user.room).emit('maxscore', { maxscore })
        
        const numUsers = getUsersInRoom(user.room)
        
        numUsers.map( (u) => {
            if(u.rollId == u.activePlayer) {
                socket.to(user.room).emit('hideButton', { hideButton: false})
            }
        })
        
       

        if(numUsers.length == 2) {

        }

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
          
            user.rolling = true;

            //remove button when user roll
            socket.emit('hideButton', { hideButton: true})
           
            setTimeout(() => {
               
                user.rolling = false;

                let rolledNumber = rollFunction();
                
               
                // add button back after roll
                socket.emit('hideButton', { hideButton: false})
                
               
              
               


                /***
                 * This is for numbers 7 and more
                 */
                if(rolledNumber == 7) {
                   
                    user.currentPoints = [0, 7];

                    // change buttons if fart
                   socket.emit('hideButton', { hideButton: true})
                  socket.broadcast.to(user.room).emit('hideButton', { hideButton: false})


                    setTimeout(() => {
                        user.currentPoints = [0];
                        getUsersInRoom(user.room).map( u => {
    
                           
                            if(u.rollId != u.activePlayer) {
                                u.activePlayer = u.activePlayer === 0 ? u.activePlayer = 1 : u.activePlayer = 0;
                                
                            } else {
                                user.activePlayer = user.activePlayer === 0 ? user.activePlayer = 1 : user.activePlayer = 0;
                            }
                            })
                           
                            const users = getUsersInRoom(user.room);
               
                            io.to(user.room).emit('roomData', { users }); 
                    }, 1000)
                }  else {
                   
                    user.currentPoints.push(rolledNumber); 
                      
                    const users = getUsersInRoom(user.room);
                   
                    io.to(user.room).emit('roomData', { users }); 
                }

                  
                const users = getUsersInRoom(user.room);
               
                io.to(user.room).emit('roomData', { users }); 
               
            }, 2000)
           
            const users = getUsersInRoom(user.room);
               
            io.to(user.room).emit('roomData', { users }); 
           
        }
       
       
    })

    socket.on('hold', () => {
        const user = getUser(socket.id);
        console.log(user.maxscore);
        
            if(user.rollId == user.activePlayer) {

                const currentPoints = sumNumbers(user.currentPoints);
                user.allPoints += currentPoints;
                user.currentPoints = [0];

                // remove buttons when player hold
                socket.emit('hideButton', { hideButton: true})
                
                if(user.allPoints >= user.maxscore){
                    console.log('winner');
                } 

                getUsersInRoom(user.room).map( u => {
                 if(u.rollId != u.activePlayer) {
                     u.activePlayer = u.activePlayer === 0 ? u.activePlayer = 1 : u.activePlayer = 0;
                     // add buttons to another player
                     socket.broadcast.to(user.room).emit('hideButton', { hideButton: false})
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