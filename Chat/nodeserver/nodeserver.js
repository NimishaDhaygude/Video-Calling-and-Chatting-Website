// const { Socket } = require('socket.io')

// // const { Socket } = require('socket.io')
// Headers('Access-Control-Allow-Origin : *');
// Headers('Access-Control-Allow-Methods : POST, GET, OPTIONS, PUT, DELETE');
// Headers('Access-Control-Allow-Headers : Content-Type, X-Auth-Token, Origin, Authorization');
const io = require("socket.io")('http://127.0.0.1/')

const users = {}

io.on('connection',socket =>{
    io.on('new-user-joined', uname =>{
        console.log('new user', uname)
        users[socket.id] = uname;
        socket.emit.broadcast('user-joined', uname);
    });

    socket.on('send' , message=>{
        socket.emit.broadcast('recieve', {message : message, uname: users[socket.id]});
    });
})

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
