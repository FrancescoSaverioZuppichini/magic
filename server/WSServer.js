const socket = require('socket.io')
const logger = require('./logger')
const { Room } = require('./models/index.js')

const MAX_PLAYERS = 2

class WSServer {
    constructor(httpServer) {
        this.io = socket(httpServer)
    }

    start() {
        this.io.on('connection', (socket) => {
            logger.info('a user connected')

            socket.on('room', async ({ name, userId, roomId }) => {
                // prevent user to join multiple time the same room
                socket.userId = userId
                const room = await Room.findById(roomId)
                if (!room) socket.emit('error', { mgs: 'Invalid or expired invite' })
                const isRoomFull = room.users.length >= MAX_PLAYERS
                if (isRoomFull) socket.emit('error', { mgs: 'Room is full' })
                else {
                    logger.debug(room.users)
                    
                    const userIsNotIn = room.users.indexOf(userId) < 0
                    if (userIsNotIn < 0) {
                        room.users.push(userId)
                        await room.save()
                    }

                    logger.info(`User ${socket.userId} connect to room ${name}`)
                    socket.join(name)
                    socket.to(name).emit('join', userId)
                }


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