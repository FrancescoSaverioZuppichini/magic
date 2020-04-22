import { Container } from 'unstated'
import io from 'socket.io-client'

/**
 * Shuffles array in place. ES6 version
 * from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class GameContainer extends Container {

    state = {
        hand: [],
        battlefield: [],
        graveyard: [],
        deck: undefined
    }

    originalDeck 

    shuffleDeck({ cards }) {
        // console.log(this.state.deck.cards)
        shuffle(cards)
        // console.log(this.state.deck.cards)
        // const deck = {...this.state.deck, cards: [shuffledCards]}
    }

    setDeck(deck) {
        this.originalDeck = deck
        // deep copy the deck, we are going to change it!
        const deepDeck = { cards: [...deck.cards], name: deck.name}
        this.shuffleDeck(deepDeck)
        const hand = deepDeck.cards.splice(0, 5)
        this.setState ({ deck: deepDeck, hand })
    }

    pickACard(){
        const card = this.state.deck.cards.splice(0, 1)[0]
        const hand = [...this.state.hand, card]
        this.setState ({ hand })
    }

    unpickACard(card){
        const hand = this.state.hand.filter(c => c.id !== card.id)
        this.setState ({ hand })

    }

    shuffle(){
        
    }
}

export default GameContainer