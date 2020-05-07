import { Container } from 'unstated'
import io from 'socket.io-client'


class RoomContainer extends Container {
    PHASES = {
        PRE: 'PRE',
        BATTLE: 'BATTLE',
        END: 'END'
    }

    state = {
        count: 0,
        phase: this.PHASES.BATTLE,
        players: {},
        cardToShow: null
    }

    constructor() {
        super()
        this.socket = io.connect()
        this.socket.on('connect', () => {
            console.log('Connect to ws')
        })

        this.socket.on('action', ({ action, from }) => {
            console.log('Incoming message:', action)
            console.log(from)
            if (from.id !== this.userId) {
                let players = { ...this.state.players }
                players[from] = action
                this.setState({ players })
            }
        })

        this.socket.on('join', (id) => {
            console.log(`User ${id} joined!`);
            if (id === this.userId) console.log('You joined the same room twice!')
        })

        this.socket.on('start', () => {
            console.log('start')
            this.setState({ phase: this.PHASES.GAME })
        })

        this.socket.on('showCard', ({ card, from }) => {
            if (from.id !== this.userId) this.setState({ cardToShow  : card })
        }
        )

        this.socket.on('error', ({ msg }) => {
            console.log(`Error ${msg}`);
        })

    }

    joinRoom(name, userId, roomId) {
        this.roomId = roomId
        this.userId = userId
        this.socket.emit('room', { name, userId, roomId });
    }

    selectDeck({ id }) {
        this.socket.emit('selectDeck', { id })
    }

    deselectDeck() {
        this.socket.emit('selectDeck', {})
    }

    emitAction(action) {
        const roomId = this.roomId
        this.socket.emit('action', { roomId, action })
    }

    showCard(card) {
        const roomId = this.roomId
        this.socket.emit('showCard', { roomId, card })
    }

    decrement() {
        this.setState({ count: this.state.count - 1 });
    }

    deleteRoom(room) {
        console.warn(`[TODO] delete room ${room.id}`)
    }

}

export default RoomContainer