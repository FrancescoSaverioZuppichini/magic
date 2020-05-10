import { Container } from 'unstated'

class SnackbarContainer extends Container {
    state = {
        show: false,
        title: '',
        text: ''
    }

    open(title, text, duration = 2000) {
        this.setState({ show: true, title, text })
        setTimeout(() => this.setState({ show: false }), duration)
    }

    close() {
        this.setState({ show: false })
    }
}

export default new SnackbarContainer()