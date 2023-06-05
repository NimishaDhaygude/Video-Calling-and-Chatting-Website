console.log('integrated')
const socket = io('http://localhost:3000');

const form = document.getElementById('sent-container');
const messageInput = document.getElementById('message-inpt');
const messageContainer = document.querySelector('.chatroom')

const uname = prompt('Enter your name');
socket.emit('new-user-joined', uname);