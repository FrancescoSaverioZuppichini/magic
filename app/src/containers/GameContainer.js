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
        const deepDeck = { cards: [...deck.cards], name: deck.name }
        this.shuffleDeck(deepDeck)
        const hand = deepDeck.cards.splice(0, 5)

        this.setState({ deck: deepDeck, hand, battlefield: [...deck.cards] })
    }

    pickACard() {
        const card = this.state.deck.cards.splice(0, 1)[0]
        const hand = [...this.state.hand, card]
        this.setState({ hand })
    }

    unpickACard(card) {
        const hand = this.state.hand.filter(c => c.id !== card.id)
        this.setState({ hand })
    }

    swap(i, j, key) {
        /**
         * Swap two cards
         */
        let cards = [...this.state[key]]
        let temp = cards[i]
        cards.splice(i, 1)
        cards.splice(j, 0, temp)
        let state = {}
        state[key] = cards
        this.setState(state)
    }

    combine(i, j, key) {
        /**
         * Combine two cards. There are three possible situation
         * 1) booth inputs are cards
         * 2) one is a card the other is an array
         * 3) booth are arrays @NotImplemented
         */
        const cards = [...this.state[key]]
        if(cards[j].length) return
        if (cards[i].length > 0) cards[i] = [...cards[i], cards[j]]
        else {
            cards[i] = [cards[i], cards[j]]
        }
        cards.splice(j, 1)
        let state = {}
        state[key] = cards
        this.setState(state)
    }

    decombine(combineIdx, destinationInd, key){
        /**
         * Remove a card from a combined group
         */

    }

    play(card) {
        const playedCard = { ...card, ...{ isPlayed: true, isTapped: false } }
        let battlefield = [...this.state.battlefield, playedCard]
        battlefield.map((el, i) => el.idx = i)
        this.setState({ battlefield })
    }

    tap(card) {
        card.isTapped = !card.isTapped
        let battlefield = [...this.state.battlefield]
        battlefield[card.idx] = card
        this.setState({})
    }

}

export default GameContainer