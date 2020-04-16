import { Container } from 'unstated'

class LoaderContainer extends Container {
    state = {
        show: false
    }
    
    show(){
        this.setState({ show: true })
    }

    hide(){
        this.setState({ show: false })
    } 
}

export default new LoaderContainer()