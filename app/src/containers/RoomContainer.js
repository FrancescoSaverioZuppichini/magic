import { Container } from 'unstated'
import io from 'socket.io-client'

class RoomContainer extends Container {
    state = {
        count: 0
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
    }

    joinRoom(name, userId) {
        this.userId = userId
        this.socket.emit('room', { name: name, id: userId });

    }

    emitAction(room, action) {
        this.socket.emit('action', { room, action })
    }

    decrement() {
        this.setState({ count: this.state.count - 1 });
    }
}

export default RoomContainer