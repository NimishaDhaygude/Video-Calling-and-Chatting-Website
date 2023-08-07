console.log('integrated client.js')
const socket = io('http://localhost:8000');

const form = document.getElementById('sent-container');
const messageInput = document.getElementById('message-inpt');
const messageContainer = document.querySelector('.chatroom')
var audio = new Audio('notification.mp3');

const uname = prompt('Enter your name');
socket.emit('new-user-joined', uname);
console.log(uname)

const append = (message , position) =>{
    const messageElement = document.createElement('div'); 
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

socket.on('user-joined',uname =>{
    append(`${uname} joined the chat `, 'right')
})

socket.on('receive',data =>{
    append(`${data.uname}: ${data.message} `, 'left')
})

socket.on('left',uname =>{
    append(`${uname}: left the chat`, 'left')
})


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value = '';
})

