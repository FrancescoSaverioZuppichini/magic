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
                socket.roomId = roomId
                const room = await Room.findById(roomId)

                if (!room) socket.emit('error', { mgs: 'Invalid or expired invite' })
                const isRoomFull = room.users.length > MAX_PLAYERS
                if (isRoomFull) socket.to(roomId).emit('error', { mgs: 'Room is full' })
                else {
                    // add user only if it is not already in
                    const userIsNotIn = room.users.indexOf(userId) < 0
                    if (userIsNotIn) {
                        room.users.push(userId)
                        await room.save()
                    }
                    // remove ready
                    const idx = room.readyUsers.indexOf(userId)
                    console.log(idx)
                    if(idx > -1) room.readyUsers.splice(idx, 1)
                    await room.save()                  
                    console.log('room-aft', room)
                    // join and notify all the users inside!
                    logger.info(`User ${socket.userId} connect to room ${roomId}`)
                    socket.join(roomId)
                    socket.to(roomId).emit('join', userId)       
                }

            })
            
            socket.on('selectDeck', async({ id }) => {
                const { userId, roomId } = socket
                console.log('selectDeck')
                const deselectedDeck = id === undefined
                
                const room = await Room.findById(roomId)
                if (deselectedDeck) {
                    console.log('deselectedDeck')
                    const idx = room.readyUsers.indexOf(userId)
                    room.readyUsers.splice(idx, 1)
                    await room.save()
                }
                else {
                    const userIsNotIn = room.readyUsers.indexOf(userId) < 0
                    if(userIsNotIn){
                        room.readyUsers.push(userId)
                        await room.save()
                    }
                    const allUsersReady = room.readyUsers.length === room.users.length
                    if(allUsersReady) {
                        logger.info(`emitting start to ${roomId}`)
                        socket.emit('start')
                        socket.to(roomId).emit('start')
                    }
                }
                console.log('rooom',room)

            })

            socket.on('action', ({ roomId, action }) => {
                console.log(action, roomId)
                this.io.to(roomId).emit('action', { action, from : { id: socket.userId }})
            })

            socket.on('showCard', ({ roomId, card }) => {
                console.log('showCard')
                this.io.to(roomId).emit('showCard', { card, from : { id: socket.userId }})
            })


            socket.on('disconnect', () => {
                this.io.emit('user disconnected')
            })
        })
        // https://gist.github.com/crtr0/2896891

    }
}
module.exports = WSServer