
let rolledNumber = [];
let scores = [0, 0];
let roundScore = 0;
activePlayer = 1;


const rollFunction = () => {
    dice = Math.floor(Math.random() * 9) + 1;
   
    return dice;
}

const getRolledNumbers = () => {
    return rolledNumber;
}

const removeRolledNumbers = () => {
    return rolledNumber = [];
}

const init = (user) => {    
    console.log(`User: ${user} rolled: `);
}

const getActivePlayer = () => {
    return activePlayer;
}

const changeActivePlayer = (activePlayer) => {
    return user.activePlayer === 0 ? user.activePlayer = 1 : user.activePlayer = 0;
}

const sumNumbers = (num) => {
  return  num.reduce((a, b) => a + b, 0)
}

module.exports = { 
    init, 
    rollFunction, 
    getRolledNumbers, 
    removeRolledNumbers, 
    getActivePlayer,
    changeActivePlayer,
    sumNumbers
 }