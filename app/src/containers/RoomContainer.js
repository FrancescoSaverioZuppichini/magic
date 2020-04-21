import { Container } from 'unstated'
import io from 'socket.io-client'


class RoomContainer extends Container {
    PHASES = {
        PRE : 'PRE',
        GAME: 'GAME',
        END : 'END'
    }
    state = {
        count: 0,
        phase: this.PHASES.GAME
    }

    constructor() {
        super()
        this.socket = io.connect()
        this.socket.on('connect', () => {
            console.log('Connect to ws')
        })

        this.socket.on('action', (action) => {
            console.log('Incoming message:', action);
        })

        this.socket.on('join', (id) => {
            console.log(`User ${id} joined!`);
            if(id === this.userId) console.log('You joined the same room twice!')
        })

        this.socket.on('start', () => {
            console.log('start')
            this.setState({ phase: this.PHASES.GAME})
        })

        this.socket.on('error', ({ msg }) => {
            console.log(`Error ${msg}`);
        })
    }

    joinRoom(name, userId, roomId) {
        this.roomId = roomId
        this.userId = userId
        this.socket.emit('room', { name,  userId, roomId });
    }

    selectDeck({ id }) {
        this.socket.emit('selectDeck', { id })
    }

    deselectDeck() {
        this.socket.emit('selectDeck', {})
    }

    emitAction(room, action) {
        this.socket.emit('action', { room, action })
    }

    decrement() {
        this.setState({ count: this.state.count - 1 });
    }
}

export default RoomContainer