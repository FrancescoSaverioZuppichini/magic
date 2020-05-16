import { Container } from 'unstated'
import io from 'socket.io-client'
import snackbar from './SnackbarContainer'

class RoomContainer extends Container {
    PHASES = {
        PRE: 'PRE',
        BATTLE: 'BATTLE',
        UPDATE: 'UPDATE',
        END: 'END'
    }


    state = {
        count: 0,
        phase: this.PHASES.PRE,
        players: {},
        cardToShow: null,
        deck: null
    }

    constructor(roomId) {
        super()
        this.socket = io.connect()
        this.socket.on('connect', () => {
            console.log('Connect to ws')
            snackbar.open('', 'Connected')
        })

        this.socket.on('action', ({ action, from }) => {
            console.log('Incoming message:', action)
            if (from.id !== this.userId) {
                let players = { ...this.state.players }
                players[from.id] = action
                this.setState({ players })
            }
        })

        this.socket.on('join', (id) => {
            console.log(`User ${id} joined!`);
            if (id === this.userId) console.log('You joined the same room twice!')
            else {
                snackbar.open('', `User ${id} joined!`)

            }
        })

        this.socket.on(this.PHASES.BATTLE, () => {
            this.start()
        })

        this.socket.on(this.PHASES.UPDATE, ({ update, from }) => {
            console.log(`[UPDATE] from ${from}`)
            if (from.id !== this.userId) {
                let players = { ...this.state.players }
                players[from.id] = update
                this.setState({ players })
            }
        })

        this.socket.on('showCard', ({ card, from }) => {
            if (from.id !== this.userId) this.setState({ cardToShow: card })

        })

        this.socket.on('error', ({ msg }) => {
            console.log(`Error ${msg}`);
        })

    }

    action(type, data) {
        this.socket.emit('action', { type, data })
    }

    sendUpdate(update) {
        this.action(this.PHASES.UPDATE, { update })
    }

    selectDeck(deck) {
        this.action(this.PHASES.BATTLE, { roomId: this.roomId, userId: this.userId })
        this.setState({ deck })
    }

    start() {
        this.socket.emit('selectDeck', { id: null })
        this.setState({ phase: this.PHASES.BATTLE })
    }

    joinRoom(name, userId, roomId) {
        this.roomId = roomId
        this.userId = userId
        this.socket.emit('room', { name, userId, roomId });
    }

    showCard(card) {
        const roomId = this.roomId
        this.socket.emit('showCard', { roomId, card })
        snackbar.open('', 'Showed')
    }

    deleteRoom(room) {
        console.warn(`[TODO] delete room ${room.id}`)
    }

}

export default RoomContainer