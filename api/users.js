const users = [];

const addUser = ({id, name, room, rollId, maxscore, currentPoints, allPoints, activePlayer, rolling, hideButton, scissors, fart, double, doubleCount, smile}) => {
    name = name.trim().toLowerCase();
  //  const existingUser = users.find((user) => user.room === room && user.name === name)
    const existingRollid = users.find((user) => user.room === room && user.rollId === rollId);
    
    

    // if(existingUser) {
    //     return { error: 'Username is taken' }
    // }

    
    if(existingRollid) {
        const user = {id, name, room, maxscore, rollId: 1, currentPoints, allPoints, activePlayer, rolling, hideButton: true, scissors, fart, double, doubleCount, smile }
        users.push(user);
        return { user }
    } else {
        const user = {id, name, room, maxscore, rollId, currentPoints, allPoints, activePlayer, rolling, hideButton, scissors, fart, double, doubleCount, smile }
        users.push(user);
        return { user }
      
    }

    
}

const getUser = (id) => users.find((user) => user.id ===id);

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

const notUnique = (value, index, self) => {
    return self.indexOf(value) != index;
  }

const getSingleRooms = () => {
    const rooms = users.map(user => user.room)
    console.log(`rooms: ${rooms}`);
    let notunique = []
    notunique.push(rooms.filter(notUnique))
   // const myArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const toRemove = new Set(notunique);

const difference = rooms.filter( x => !toRemove.has(x) );

console.log(difference); // ["a", "d", "e", "f"]
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, getUser, getUsersInRoom, removeUser, getSingleRooms };