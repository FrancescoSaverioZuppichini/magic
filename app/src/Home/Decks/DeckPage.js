import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import queries from '../../queries'
import { Card, Flex, Button, Text, Box } from 'theme-ui'
import { MagicCard, ZoomMagiCardAction, AddToDeckMagiCardAction, CardPage } from '../MagicCards/MagicCard'
import { SelectableMagigCards } from '../MagicCards/SelectableMagicCards.js'
import MyDeckControllers from './MyDeckControllers'
import MagicCardsInDeckFilters from './MagicCardsInDeckFilters'
import mutations from '../../mutations/index.js'
import Deck from './Deck.js'
import OthersDeck from './OthersDeck'

const SelectedCardsActions = ({ cards, onRemove }) => (
    <Box>
        {cards.length > 0 &&
            <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Text >{`${cards.length} selected`}</Text>
                <Button onClick={onRemove} variant='actionWarning'>Remove</Button>
            </Flex>
        }
    </Box>
)

const RemoveCardFromDeckAction = ({ onRemove, variant = 'warning' }) => (
    <Button onClick={onRemove} variant={variant}>Remove</Button>)

const MyDeck = ({ originalDeck, onClose }) => {
    const [deck, setDeck] = useState({ ...originalDeck })

    const [newDeck, { newDeckError }] = useMutation(mutations.NEW_DECK)

    const removeCardFromDeck = (card) => {
        let newDeck = { ...deck }
        newDeck.cards.splice(newDeck.cards.indexOf(card), 1)
        setDeck(newDeck)
    }

    const removeCardsFromDeck = (cards) => {
        cards.map(card => removeCardFromDeck(card))
        let deckInput = { id: deck.id, name: deck.name, cards: deck.cards }
        deckInput.cards = deckInput.cards.map(el => el.id)
        newDeck({ variables: { deck: deckInput } })
    }
    return (

        <Deck deck={deck} onClose={onClose} controllers={
            deck => <MyDeckControllers {...deck} />
        }>
            {deck => <SelectableMagigCards cards={deck.cards}
                filters={onChange => <MagicCardsInDeckFilters onChange={onChange} deck={deck} />}
                card={
                    (card, i, setSelectedCard) => <MagicCard key={i} card={card}
                        onClick={() => setSelectedCard(card, i)}
                        actions={props => (
                            // actions for the card
                            <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <RemoveCardFromDeckAction onRemove={() => removeCardsFromDeck([card])} variant='actionWarning' />
                                <AddToDeckMagiCardAction {...props} selectedDecks={[deck]} />
                                <ZoomMagiCardAction {...props}>
                                    {onClose => <CardPage {...props} onClose={onClose}>
                                        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                            <RemoveCardFromDeckAction onRemove={() => {
                                                removeCardsFromDeck([props])
                                                onClose()
                                            }} />
                                            <AddToDeckMagiCardAction {...props} variant='primary' selectedDecks={[deck]} />
                                        </Flex>
                                    </CardPage>}
                                </ZoomMagiCardAction>
                            </Flex>
                        )} />}
            >
                {(selectedCards, onClear) =>
                    <SelectedCardsActions cards={selectedCards}
                        onRemove={() => {
                            removeCardsFromDeck(selectedCards)
                            onClear()
                        }} />
                }
            </SelectableMagigCards>}
        </Deck>
    )
}

export default function DeckPage({ id, onClose }) {
    /**
     * Single Deck
     */
    const meRes = useQuery(queries.GET_ME)
    const meData = meRes.data
    const { data } = useQuery(queries.GET_DECK, { variables: { id: id } })
    if (data) data.deck.owner = data.deck.owner === null ? {} : data.deck.owner
    return (
        <Box>
            {data && meData && (data.deck.owner.id === meData.me.id ?
                <MyDeck originalDeck={data.deck} onClose={onClose} /> :
                <OthersDeck deck={data.deck} onClose={onClose} />)
            }
        </Box>
    )
}
