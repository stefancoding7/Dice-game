
const rollFunction = () => {
    dice = Math.floor(Math.random() * 9) + 1;
   
    return dice;
}

const changeActivePlayer = (activePlayer) => {
    return user.activePlayer === 0 ? user.activePlayer = 1 : user.activePlayer = 0;
}

const sumNumbers = (num) => {
  return  num.reduce((a, b) => a + b, 0)
}

module.exports = { 
    rollFunction, 
    changeActivePlayer,
    sumNumbers
 }