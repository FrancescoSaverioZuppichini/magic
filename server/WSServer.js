const socket = require('socket.io')
const logger = require('./logger')

class WSServer {
    constructor(httpServer) {
        this.io = socket(httpServer)
    }

    start() {
        this.io.on('connection', (socket) => {
            logger.info('a user connected')

            socket.on('room', ({ name, id}) => {
                // prevent user to join multiple time the same room
                socket.userId = id
                logger.info(`User ${socket.userId} connect to room ${name}`)
                socket.join(name)
                socket.to(name).emit('join', id)

            })

            socket.on('action', ({ room, action }) => {
                console.log(action, room)
                this.io.to(room).emit('action', action)
            })

            socket.on('disconnect', () => {
                this.io.emit('user disconnected')
              })
        })
        // https://gist.github.com/crtr0/2896891
    
    }
}
module.exports = WSServer