const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.set('views','./');
app.get('/', (req, res) => {
    res.render('index')
    // res.send("hello")
})
server = app.listen(3000)

const io = require("socket.io")(server)

io.on('connection', (socket) => {
	console.log('New user connected')

	socket.username = "Default"

    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})