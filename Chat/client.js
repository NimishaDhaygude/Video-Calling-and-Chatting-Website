console.log('integrated client.js')
const socket = io('http://localhost:8000');

const form = document.getElementById('sent-container');
const messageInput = document.getElementById('message-inpt');
const messageContainer = document.querySelector('.chatroom')
var audio = new Audio('notification.mp3');

const uname = prompt('Enter your name');
socket.emit('new-user-joined', uname);
console.log(uname)

const append_message = (message , position) =>{
    const messageElement = document.createElement('div'); 
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

append_joinedleft = (message) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('joined-left');
    messageContainer.append(messageElement);
}

socket.on('user-joined',uname =>{
    append_joinedleft(`${uname} joined the chat `)
})

socket.on('receive',data =>{
    append_message(`${data.uname}: ${data.message} `, 'left')
})

socket.on('left',uname =>{
    append_joinedleft(`${uname}: left the chat`)
})


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append_message(`you: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value = '';
})

