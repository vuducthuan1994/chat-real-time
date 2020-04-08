var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 8000;
var userList = [];
var messengerList = [];


app.use(express.static(path.join(__dirname, "public")));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/mess/:from/:to", (req, res, next) => {
    var result = [];
    var user1 = req.params.from;
    var user2 = req.params.to;
    for (let j = 0; j < messengerList.length; j++) {
        const mess = messengerList[j];
        if ((mess.from == user1 && mess.to == user2) || (mess.from == user2 && mess.to == user1)) {
            result.push(mess);
        }
    }
    console.log(result);
    res.json(result);
});


io.on('connection', function(socket) {
    console.log('connect');
    console.log(socket.id);
    socket.on('createUser', function(user) {
        userList.push(user);
        socket.emit('userChanged', {
            newUser: user,
            newUsersList: userList
        });
        socket.broadcast.emit('userChanged', {
            newUser: user,
            newUsersList: userList
        });
    });

    socket.on('message', (messengerItem) => {
        console.log(messengerItem);
        messengerList.push(messengerItem);
        socket.emit('message', messengerItem);
        socket.broadcast.emit('message', messengerItem);
    });

    socket.on('deleteUser', (data) => {
        // console.log(data);
        for (let index = 0; index < userList.length; index++) {
            if (userList[index].name == data.name) {
                userList.splice(index, 1);
                break;
            };
        }
        console.log(userList);
        socket.broadcast.emit('userChanged', {
            newUsersList: userList
        });
    });
    socket.on('disconnect', () => {
        console.log("disconnect");
    });
});

server.listen(port, () => {
    console.log("Listening on port " + port);
});