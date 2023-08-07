console.log('integrated nodeserver.js')

const io = require("socket.io")(8000)

// const users = {}

// io.on('connection',socket =>{
//     io.on('new-user-joined', uname =>{
//         console.log('conection established....')
//         console.log('new user', uname)
//         users[socket.id] = uname;
//         socket.emit.broadcast('user-joined', uname);
//     });

//     socket.on('send' , message=>{
//         socket.emit.broadcast('recieve', {message : message, uname: users[socket.id]});
//     });

// })

// io.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', uname => {
        console.log('connection established....');
        console.log('new user', uname);
        users[socket.id] = uname;
        socket.broadcast.emit('user-joined', uname); // Broadcast the new user to other clients
    });
    
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, uname: users[socket.id] }); // Broadcast the received message to other clients
    });
    
    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id] ); // Broadcast the received message to other clients
        delete users[socket.id];
        console.log('connection terminated....');
    });
});

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});