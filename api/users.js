const users = [];

const addUser = ({id, name, room, rollId, maxscore, currentPoints, allPoints, activePlayer, rolling, hideButton}) => {
    name = name.trim().toLowerCase();
    const existingUser = users.find((user) => user.room === room && user.name === name)
    const existingRollid = users.find((user) => user.room === room && user.rollId === rollId);
    
    

    if(existingUser) {
        return { error: 'Username is taken' }
    }

    
    if(existingRollid) {
        const user = {id, name, room, maxscore, rollId: 1, currentPoints, allPoints, activePlayer, rolling, hideButton: true }
        users.push(user);
        return { user }
    } else {
        const user = {id, name, room, maxscore, rollId, currentPoints, allPoints, activePlayer, rolling, hideButton }
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

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, getUser, getUsersInRoom, removeUser };