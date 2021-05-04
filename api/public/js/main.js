const showPlay = document.getElementById('show');

const socket = io();

socket.on('message', message => {
    console.log(message);
    showPlay.textContent = message;
})



// showPlay.addEventListener('change', () => {
    
// })