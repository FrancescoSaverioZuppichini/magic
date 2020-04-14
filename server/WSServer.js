const socket = require('socket.io')

class WSServer {
    constructor(httpServer) {
        this.io = socket(httpServer)
    }

    start() {
        this.io.on('connection', (socket) => {
            console.log('a user connected');
        })
        this.io.on('room', (name) => {
            socket.join(name)
        })
    }
}
module.exports = WSServer