const socket = require('socket.io')
const logger = require('./logger')
const { Room } = require('./models/index.js')

const MAX_PLAYERS = 2

TYPES = {
    PRE: 'PRE',
    BATTLE: 'BATTLE',
    UPDATE: 'UPDATE'

}

class WSServer {
    constructor(httpServer) {
        this.io = socket(httpServer)
    }



    start() {
        this.io.on('connection', (socket) => {
            logger.info('a user connected')

            socket.on('room', async ({ name, userId, roomId }) => {
                socket.userId = userId
                socket.roomId = roomId
                // join and notify all the users inside!
                logger.info(`User ${socket.userId} connect to room ${roomId}`)
                socket.join(roomId)
                socket.to(roomId).emit('join', userId)
            })


            socket.on('action', async ({ type, data }) => {
                console.log(type, data)
                switch (type) {
                    case (TYPES.PRE):
                        onPre(data)
                        break
                    case (TYPES.BATTLE):
                        onBattle(data)
                        break
                    case (TYPES.UPDATE):
                        onUpdate(data)
                        break
                }
            })

            const onPre = async ({ roomId, userId }) => {
                const room = await Room.findById(roomId)
                const idx = room.users.indexOf(userId)
                const userInRoom = idx > -1
                if(userInRoom) {
                    room.users.splice(idx, 1)
                    await room.save()
                }

                console.log(room)

            }

            const onBattle = async ({ roomId, userId }) => {
                const room = await Room.findById(roomId)
                const idx = room.users.indexOf(userId)
                const userInRoom = idx > -1
                if(!userInRoom) {
                    room.users.push(userId)
                    await room.save()
                }
                console.log(room)
                const allUsersJoined = room.users.length === MAX_PLAYERS
                if (allUsersJoined) {
                    logger.info(`emitting start to ${roomId}`)
                    socket.emit(TYPES.BATTLE)
                    socket.to(roomId).emit(TYPES.BATTLE, {})
                }
            }

            const onUpdate = async({ update }) => {
                this.io.to(socket.roomId).emit(TYPES.UPDATE, { update, from: { id: socket.userId } })

            }

            socket.on('action', ({ roomId, action }) => {
                console.log(action, roomId)
                this.io.to(roomId).emit('action', { action, from: { id: socket.userId } })
            })

            socket.on('showCard', ({ roomId, card }) => {
                console.log('showCard')
                this.io.to(roomId).emit('showCard', { card, from: { id: socket.userId } })
            })


            socket.on('disconnect', () => {
                this.io.emit('user disconnected')
            })
        })
        // https://gist.github.com/crtr0/2896891

    }
}
module.exports = WSServer