import React, { useState } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import SearchBar from './SearchBar'
import Modal from './Modal'
import { MagicCard, MagicCardImg, CardPage, ZoomMagiCardAction } from './MagicCards/MagicCard'
import DeckPreview from './Decks/DeckPreview'
import MagicCards from './MagicCards/MagicCards.js'
import queries from '../queries/index.js'
import mutations from '../mutations/index.js'
import Stages from './Stages'
import InputWithErrors from '../InputWithErrors'

const RemovableFromDeckAction = ({ onRemove }) => (
    /**
     * Button used to remove the current card picked from the deck
     */
    <Flex sx={{ justifyContent: 'center' }}>
        <Button onClick={() => {
            onRemove()
        }}>Remove</Button>
    </Flex>
)

const RemovableFromDeckCard = ({ name, sx, scryfallId, id, onRemove }) => {
    return (
        <MagicCard scryfallId={scryfallId}
            actions={props => (
                <Flex sx={{alignItems: 'center', justifyContent: 'space-between'}}>
                <RemovableFromDeckAction onRemove={onRemove} />
                <ZoomMagiCardAction {...props}/>
                </Flex>
            )}>
        </MagicCard>
    )
}

const DeckCardsPickedPreview = ({ cards, removeCardFromDeck }) => {
    /**
     * This component shows the cards selected so far. It can be expansed to show all the cards added to the deck so far.
     */
    const [showMoreCards, setShowMoreCard] = useState(false)
    const [selectedCards, setSelectedCard] = useState([])
    const subsetOfCards = [...cards].reverse().slice(0, 8)
    const thereAreMoreCards = cards.length > subsetOfCards.length

    const onRemove = (card) => {
        removeCardFromDeck(card)
        // setShowMoreCard(false)
    }

    // const
    return (
        <Flex sx={{ flexDirection: 'row', alignItems: 'center', maxHeight: '200px', flexWrap: 'wrap' }}>
            {/* Show the last 4 picked cards */}
            {subsetOfCards.map((card, i) =>
                <Box key={i} p={2} sx={{ width: '150px' }}>
                    <MagicCardImg key={i} {...card} onClick={() => removeCardFromDeck(card)} />
                </Box>)}
            {/* Display a button to zoom and see all the cards in the deck */}
            <Box>
                {subsetOfCards.length > 0 && <Button onClick={() => setShowMoreCard(true)}>
                    <Text>{thereAreMoreCards ? `${cards.length}` : 'zoom'}</Text>
                </Button>}
            </Box>
            {/* The cards will be displayed in a modal */}
            <Modal active={showMoreCards} variant='none' sx={{ width: '100%' }}>
                <IconButton onClick={() => setShowMoreCard(false)} variant='close'>
                    <img height='100%' src='/close-black-18dp.svg'></img>
                </IconButton>
                <Card sx={{ flex: '1' }}>
                    <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>So far</Text>
                    <Text sx={{ fontSize: 1 }}>click on a card to remove or zoom</Text>
                    {/* All the cards in the deck so far */}
                    <Box mt={2}></Box>
                    <MagicCards cards={cards} >
                        {(card, i) => <RemovableFromDeckCard key={i} {...card} onRemove={onRemove} />}
                    </MagicCards>
                </Card>
            </Modal>
        </Flex>)
}

const AddAndRemoveActions = ({ onAdd, onRemove, numberInDeck }) => (
    /**
     * Buttons allowing to add and remove a card from the current deck.
     */
    <Flex>
        {numberInDeck > 0 && <Button mr={1} onClick={onRemove} >Remove</Button>}
        {/* <Box variant="spacer" /> */}
        {/* {numberInDeck > 0 && <Text sx={{ fontSize: 2, color: 'text' }}>{numberInDeck}</Text>} */}

        {/* <Box variant="spacer" /> */}
        <Button onClick={onAdd}>Add</Button>
    </Flex>
)

const AddAndRemoveMagicCard = (props) => (
    <MagicCard {...props} actions={
        (props => <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <AddAndRemoveActions {...props} />
            <ZoomMagiCardAction {...props} />
        </Flex>)
    }>
    </MagicCard>
)


export default function NewDeck({ onClose }) {
    const client = useApolloClient()
    const [deck, setDeck] = useState({ name: '', cards: [] })
    const { error, data } = useQuery(queries.GET_ACTION, { client })


    const [newDeck, { newDeckError }] = useMutation(mutations.NEW_DECK, {
        onCompleted({ newDeck }) {
            onClose()
        },
        update(cache, { data: { newDeck } }) {
            let { me } = cache.readQuery({ query: queries.GET_ME })
            me.decks.push(newDeck)
            cache.writeQuery({
                query: queries.GET_ME,
                data: me,
            });
        }
    })


    const getNumberOfCardInDeck = (card) => deck.cards.filter(el => el.id === card.id).length
    const isSelected = (card) => getNumberOfCardInDeck(card) > 0

    const onDone = (el) => {
        let deckInput = { ...deck }
        deckInput.cards = deckInput.cards.map(el => el.id)
        newDeck({ variables: { deck: deckInput } })
    }

    const removeCardFromDeck = (card) => {
        let newDeck = { ...deck }
        newDeck.cards.splice(newDeck.cards.indexOf(card), 1)
        setDeck(newDeck)
    }

    const addCardToDeck = (card) => {
        let newDeck = { ...deck, cards: [...deck.cards, card] }
        setDeck(newDeck)
    }

    const onInfoDeckComplete = (goNext) => {
        if (deck.name !== '') goNext()
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stages initialStage={1}>
                {({ onNext }) => (
                    <Box variant="vCentering">
                        <Card p={2} sx={{ width: ['100%', '100%', '50%', '450px'] }}>
                            <Text sx={{ fontSize: 4 }}>New Deck</Text>
                            <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>Info</Text>
                            <Box py={2} />
                            <Box>
                                <Text pb={2}>Name</Text>
                                <InputWithErrors
                                    onChange={(el) => setDeck(Object.assign(deck, { name: el.target.value }))}
                                />
                            </Box>
                            <Flex pt={4}>
                                <Button onClick={onClose}>Close</Button>
                                <Box variant="spacer" />
                                <Button onClick={() => onInfoDeckComplete(onNext)}>Next</Button>
                            </Flex>
                        </Card>
                    </Box>
                )}
                {({ onBack, onNext }) => (
                    <Card p={2} >
                        <Flex sx={{ flexDirection: 'column' }}>
                            <Box >
                                <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>Cards</Text>
                                <Box py={3} />
                            </Box>
                            <SearchBar>{({ cards, onLoadMore }) =>
                                <Box sx={{ maxHeight: '60vh', overflowY: 'scroll' }}>
                                    <MagicCards cards={cards.cards} hasFilters={false}>
                                        {card => <AddAndRemoveMagicCard
                                            {...card}
                                            onRemove={() => removeCardFromDeck(card)}
                                            onAdd={() => addCardToDeck(card)}
                                            numberInDeck={getNumberOfCardInDeck(card)} />}
                                    </MagicCards>
                                    {cards.hasMore && <Flex variant='centering' pt={2}>
                                        <Button onClick={onLoadMore}>More</Button>
                                    </Flex>}
                                </Box>
                            }</SearchBar>
                            <Box py={2} />
                            <Box>
                                <Text pb={2}>So far</Text>
                                <DeckCardsPickedPreview {...deck} removeCardFromDeck={removeCardFromDeck} />
                            </Box>
                            <Flex pt={4} >
                                <Button onClick={onBack}>Back</Button>
                                <Box variant="spacer" />
                                <Button onClick={onNext}>Next</Button>
                            </Flex>
                        </Flex>
                    </Card>
                )}
                {({ onBack }) => (
                    <Box variant="vCentering">

                        <Card p={2} sx={{ width: ['100%', '100%', '66%', '50%'] }}>
                            <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>Preview</Text>
                            <Box p={3} />
                            <Card sx={{ width: '100%', bg: 'background' }}>
                                <DeckPreview {...deck} controllers={false} linkable={false} />
                            </Card>
                            <Flex pt={4}>
                                <Button onClick={onBack}>Back</Button>
                                <Box variant="spacer" />
                                <Button onClick={onDone}>Done</Button>
                            </Flex>
                        </Card>
                    </Box>
                )}
            </Stages>
        </Box>
    )
}
