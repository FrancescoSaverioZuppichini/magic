import React from 'react'
import { Button } from 'theme-ui'
import { useMutation } from '@apollo/react-hooks'
import mutations from '../../mutations/index.js'
import queries from '../../queries/index.js'

export default function CloneDeckAction({ deck, onDone }) {
    const [newDeck, { newDeckError }] = useMutation(mutations.NEW_DECK, {
        onCompleted({ newDeck }) {
            
            console.log(newDeck)
            onDone && onDone()
        },
        update(cache, { data: { newDeck } }) {
            console.log(newDeck)
            let { me } = cache.readQuery({ query: queries.GET_ME })
            me.decks.push(newDeck)
            cache.writeQuery({
                query: queries.GET_ME,
                data: me,
            })
        }
    })

    const onClick = () => {
        let deckInput = { name: deck.name, cards: deck.cards }
        deckInput.cards = deckInput.cards.map(el => el.id)
        newDeck({ variables: { deck: deckInput } })
    }

    return (
        <Button onClick={onClick} variant='action'>Clone</Button>
    )
}