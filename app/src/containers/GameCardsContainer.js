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
class GameCardsContainer extends Container {

    state = {
        deck: null,
        hand: [],
        battlefield0: [],
        battlefield1: [],
        graveyard: []
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

        let hand = []
        for (let card of deepDeck.cards.splice(0, 5)) {
            card.uid = uniqid()
            hand.push({ ...card })
        }

        this.setState({ deck: deepDeck, hand })
    }

    pickACard() {
        let cards = [...this.state.deck.cards]
        let card = {...cards.splice(0, 1)[0]}
        card.uid = uniqid()
        const hand = [...this.state.hand, card]
        this.setState({ hand, deck: {...this.state.deck, cards} })
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
        let card = state[source.droppableId][source.index]
        state[source.droppableId].splice(source.index, 1)
        state[destination.droppableId].splice(destination.index, 0, card)

        const addPlayFields = (card) => {
            card.isPlayed = true
            card.isTapped = card.isTapped || false
        }

        const removePlayField = (card) => {
            card.isPlayed = false
            card.isTapped = false
        }
        // we need to update each card fields depending if they are in game or not
        if (destination.droppableId === 'battlefield0' || destination.droppableId === 'battlefield1') {
            if (card.length) card.map(addPlayFields)
            else {
                addPlayFields(card)
            }
        }
        else if (destination.droppableId === 'hand') {
            if (card.length) card.map(removePlayField)
            else {
                removePlayField(card)
            }
        }
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
        // remove old reference
        delete this.state[draggableId]
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
        // loop on the group and add the parent field
        group.map(card => card.parent = group.uid)
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

    play(card) {
        let cards = this.state.hand
        const { parent } = card
        if (parent) cards = cards[cards.findIndex(card => card.uid == parent)]
        const playedIdx = cards.findIndex(handCard => handCard.uid === card.uid)
        card.isPlayed = true
        card.isTapped = false

        cards.splice(playedIdx, 1)

        let battlefield0 = [...this.state.battlefield0, card]
        let hand = [...this.state.hand]
        this.setState({ battlefield0, hand })
    }

    tap(card) {
        card.isTapped = !card.isTapped
        // force state to update
        this.setState({})
    }

}

export default GameCardsContainer