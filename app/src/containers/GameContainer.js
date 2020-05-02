import { Container } from 'unstated'
import io from 'socket.io-client'
import uniqid from 'uniqid'

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
// https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react
class GameContainer extends Container {

    state = {
        deck: null,
        hand: [],
        battlefield: {
            '0': [],
            '1': []
        }

    }

    originalDeck

    shuffleDeck({ cards }) {
        // console.log(this.state.deck.cards)
        // shuffle(cards)

        // console.log(this.state.deck.cards)
        // const deck = {...this.state.deck, cards: [shuffledCards]}
    }

    setDeck(deck) {
        this.originalDeck = deck
        // deep copy the deck, we are going to change it!
        const deepDeck = { cards: [...deck.cards], name: deck.name }
        this.shuffleDeck(deepDeck)

        let hand = []
        for (let card of deepDeck.cards.splice(0, 5)) {
            card.uid = uniqid()
            hand.push({ ...card })
        }

        this.setState({ deck: deepDeck, hand })
    }

    pickACard() {
        let card = this.state.deck.cards.splice(0, 1)[0]
        card.uid = uniqid()
        const hand = [...this.state.hand, card]
        this.setState({ hand })
    }

    unpickACard(card) {
        const hand = this.state.hand.filter(c => c.id !== card.id)
        this.setState({ hand })
    }

    swap(source, destination) {
        /**
         * Swap two cards
         */
        let state = { ...this.state }
        let temp = state[source.droppableId][source.index]
        state[source.droppableId].splice(source.index, 1)
        state[destination.droppableId].splice(destination.index, 0, temp)
        this.setState(state)
    }

    combine(combine, source) {
        /**
         * Combine cards and groups.
         */
        const { draggableId } = combine
        const { index, droppableId } = source
        // a function to remove single list
        const _normalize = (cards) => cards.map(card => card.length === 1 ? card[0] : card)
        let cards = [...this.state[droppableId]]
        const combineIdx = cards.findIndex(card => card.uid === draggableId)
        // card was not found!
        if (combineIdx < 0) return
        const left = cards[combineIdx]
        const right = cards[index]
        let group = []
        // 4 situations
        // booth are single cards
        if (left.length && right.length) {
            group = [...left, ...right]
        }
        // left is an array and right a single card
        else if (left.length && !right.length) {
            group = [...left, right]
        }
        // left is single card and left is an array
        else if (!left.length && right.length) {
            group = [left, ...right]
        }
        // booth are array
        else if (!left.length && !right.length) {
            group = [left, right]
        }
        // add an unique id
        if (!group.uid) group.uid = uniqid()

        cards[combineIdx] = group
        cards.splice(index, 1)
        let state = {}
        cards = _normalize(cards)
        state[droppableId] = cards
        // add a reference to the group to the state
        // so we can reference it later using only the `droppableId` (aka the uid)
        state[group.uid] = group
        this.setState(state)
    }

    decombine(combineIdx, destinationInd, key) {
        /**
         * Remove a card from a combined group
         */

    }

    play(card, where = '0') {
        const playedCard = { ...card, ...{ isPlayed: true, isTapped: false } }
        let battlefield0 = [...this.state.battlefield0, playedCard]
        battlefield0.map((el, i) => el.idx = i)
        this.setState({ battlefield0 })
    }

    tap(card) {
        card.isTapped = !card.isTapped
        let battlefield = [...this.state.battlefield]
        battlefield[card.idx] = card
        this.setState({})
    }

}

export default GameContainer