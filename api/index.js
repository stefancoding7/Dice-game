const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const { addUser, getUser, getUsersInRoom, removeUser, getSingleRooms } = require('./users');
const { rollFunction, 
        sumNumbers
    } = require('./game')

var cors = require('cors');

const app = express();
app.use(cors())

// const buildPath = path.join(__dirname, '..', 'build');
// app.use(express.static(buildPath));

const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: "http://192.168.0.21:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
});

let playShake = false;

io.on('connection', (socket) => {
    
    socket.on('join', ({name, room, maxscore}, callback) => {
        const rollId = 0;
        const currentPoints = [0];
        const allPoints = 0;
        const activePlayer = 0;
        const rolling = false;
        const scissors = false;
        const fart = false;
        const double = false;
        const doubleCount = [];
        const smile = 1;
        const { error, user } = addUser({id: socket.id, name, room, maxscore, rollId, currentPoints, allPoints, activePlayer, rolling, scissors, fart, double, doubleCount, smile});
        if(error){
            socket.emit('error', { error })
            return callback(error)
        }
        
        socket.join(user.room);

      
        
        const numUsers = getUsersInRoom(user.room)
        
        numUsers.map( (u) => {
            if(u.rollId == u.activePlayer) {
                socket.to(user.room).emit('hideButton', { hideButton: false})
            }
        })
        
        /***
         * Get all connected users
         */
       
     console.log(getSingleRooms());

        if(numUsers.length == 2) {

        }

      
        // if ther more thamn 3 players, delete the third player from users array
        if(numUsers.length >= 3) {
            
                const user = removeUser(numUsers[2].id);
                if(user) {
                    io.to(user.room).emit('message', `${user.name} has left`)
                    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
                    console.log('User left')
                }
               
        }

       
        io.to(user.room).emit('roomData', { users: getUsersInRoom(user.room)})
    
        callback();
        
    });

    socket.on('roll', () => {
        const user = getUser(socket.id);        

       
        if(user.rollId == user.activePlayer) {
          
            
            user.rolling = true;
            // set scissors to false
            user.scissors = false;
            // set double to back to false
            user.double = false;
            //remove button when user roll
            
            // set shakeing to true
            io.to(user.room).emit('playSound', { playSound: [true, 'shake'] }); 
            socket.emit('hideButton', { hideButton: true,})
           
            setTimeout(() => {
               
                user.rolling = false;


                 // set shakeing to false
                io.to(user.room).emit('playSound', { playSound: [false, 'shake'] }); 

                let rolledNumber = rollFunction();
                
               
                // add button back after roll
                socket.emit('hideButton', { hideButton: false})
                
               
              
               


                /***
                 * This is for numbers 7 and more
                 */
                if(rolledNumber == 7 || rolledNumber == 10) {
                    io.to(user.room).emit('playSound', { playSound: [true, 'fart'] }); 
                    user.fart = true;
                    user.currentPoints = [0];
                    user.scissors = false;
                    user.double = false;
                   
                   // change buttons if fart
                   socket.emit('hideButton', { hideButton: true})
                   socket.broadcast.to(user.room).emit('hideButton', { hideButton: false})


                    setTimeout(() => {
                        io.to(user.room).emit('playSound', { playSound: [false, 'fart'] }); 
                        user.fart = false;
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
                } else if (rolledNumber == 8 && user.currentPoints.length >= 1) {
                        io.to(user.room).emit('playSound', { playSound: [true, 'scissors'] }); 
                        // set scissors to true
                        user.scissors = true;
                       
                        let currentPoints = Math.floor(sumNumbers(user.currentPoints) / 2);
                        console.log(currentPoints);
                        user.currentPoints = [0, currentPoints];
                        const users = getUsersInRoom(user.room);
                   
                        io.to(user.room).emit('roomData', { users }); 
                    
                   
                } else if(rolledNumber == 9 && user.currentPoints.length >= 1) {
                        user.double = true;
                        
                        user.doubleCount.push(1)
                        if(user.doubleCount.length == 3) {
                            user.doubleShowForUser = true;
                            socket.emit('showDouble', { showDouble: true })
                           io.to(user.room).emit('playSound', { playSound: [true, 'double'] });
                            //  console.log(user.doubleCount.length);
                          //  const userCurrentPoints = sumNumbers(user.currentPoints) * 2;
                          //  user.currentPoints = [0, userCurrentPoints];
                         //   user.doubleCount = []
                         console.log('Gomb');
                        } else {
                            io.to(user.room).emit('playSound', { playSound: [true, 'double-ones'] });
                        }
                        
                         
                      
                        const users = getUsersInRoom(user.room);
                       
                        io.to(user.room).emit('roomData', { users });
                } else {
                   
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
       // console.log(user.maxscore);
        
            if(user.rollId == user.activePlayer) {
                io.to(user.room).emit('playSound', { playSound: [true, 'hold'] });
                 // set scissors to false
                user.scissors = false;
                user.double = false;
                const currentPoints = sumNumbers(user.currentPoints);
                user.allPoints += currentPoints;
                user.currentPoints = [0];
                

                // remove buttons when player hold
                socket.emit('hideButton', { hideButton: true})
                
                if(user.allPoints >= user.maxscore){
                   io.to(user.room).emit('winner', { winner: [true, user.name] })
                   io.to(user.room).emit('playSound', { playSound: [true, 'winner'] });
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



    socket.on('playagain', () => {
        const user = getUser(socket.id);
        const  users = getUsersInRoom(user.room);
        io.to(user.room).emit('playSound', { playSound: [false, 'winner'] });
        users.map((user) => {
            user.allPoints = 0;
            user.currentPoints = [0];
            user.scissors = false;
            user.double = false;
            user.doubleCount = [];
        })
      
        
             
        io.to(user.room).emit('roomData', { users }) 
        io.to(user.room).emit('winner', { winner: [false] })
    })

    socket.on('doubleUse', () => {
        const user = getUser(socket.id);
        if(user.rollId == user.activePlayer) {
            
            user.double = true;
            io.to(user.room).emit('playSound', { playSound: [true, 'double'] });
            console.log(`User: ${user.name} used double`);
            const userCurrentPoints = sumNumbers(user.currentPoints) * 2;
            user.currentPoints = [0, userCurrentPoints];
            user.doubleCount = [];
            socket.emit('showDouble', { showDouble: false })
            // io.to(user.room).emit('doubleUsed', {doubleUsed: true});
            
        }

            const users = getUsersInRoom(user.room);
               
            io.to(user.room).emit('roomData', { users }); 
               
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