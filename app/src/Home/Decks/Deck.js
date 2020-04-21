import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import queries from '../../queries'
import { Card, Flex, Button, Text, Box } from 'theme-ui'
import MagicCards from '../MagicCards/MagicCards'
import { MagicCard, ZoomMagiCardAction, AddToDeckMagiCardAction, CardPage } from '../MagicCards/MagicCard'
import { SelectableMagigCards } from '../MagicCards/SelectableMagicCards.js'
import DeckControllers from './DeckControllers'
import { useHistory } from "react-router-dom";
import mutations from '../../mutations/index.js'

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

export default function Deck({ id }) {
    /**
     * Single Deck
     */
    const [deck, setDeck] = useState({})
    const { data } = useQuery(queries.GET_DECK, { variables: { id: id } })
    const history = useHistory()

    useEffect(() => {
        // local copy
        if (data) setDeck({ ...data.deck })
    }, [data])


    const [newDeck, { newDeckError }] = useMutation(mutations.NEW_DECK, {
        onCompleted({ newDeck }) {

            // onClose()
        },
        update(cache, { data: { newDeck } }) {
            // let { me } = cache.readQuery({ query: queries.GET_ME })
            // cache.writeQuery({
            //     query: queries.GET_ME,
            //     data: me,
            // });
        }
    })

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

    return (<Card >
        {data &&
            <Box>
                <Flex sx={{ justifyContent: 'space-between' }}>
                    <Text sx={{ fontSize: 4 }}>{data.deck.name}</Text>
                    <Button onClick={history.goBack}>Close</Button>
                </Flex>
                <Text sx={{ fontSize: 0 }}>{moment(Number(data.deck.createdAt)).format('MMM Do YY')}</Text>
                <Box p={2} />
                <DeckControllers {...data.deck} />
                <Box p={2} />
                {/* cards */}
                <SelectableMagigCards cards={data.deck.cards} card={
                    (card, i, setSelectedCard) => <MagicCard key={i} card={card}
                        onClick={() => setSelectedCard(card, i)}
                        actions={props => (
                            // actions for the card
                            <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <RemoveCardFromDeckAction onRemove={() => removeCardsFromDeck([card])} variant='actionWarning' />
                                <AddToDeckMagiCardAction {...props} selectedDecks={[data.deck]} />
                                <ZoomMagiCardAction {...props}>
                                    {onClose => <CardPage {...props} onClose={onClose}>
                                        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                            <RemoveCardFromDeckAction onRemove={() => {
                                                removeCardsFromDeck([props])
                                                onClose()
                                            }} />
                                            <AddToDeckMagiCardAction {...props} variant='primary' selectedDecks={[data.deck]} />
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
                </SelectableMagigCards>
                {/* <MagicCards cards={data.deck.cards}>
                    {(card, i) => <MagicCard key={i} {...card}
                        actions={props => <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <AddToDeckMagiCardAction {...props} />
                            <ZoomMagiCardAction {...props} /> </Flex>} />}
                </MagicCards> */}
            </Box>
        }
    </Card>
    )
}
