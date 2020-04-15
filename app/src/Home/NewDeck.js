import React, { useState } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import SearchBar from './SearchBar'
import Modal from './Modal'
import { MagicCard, MagicCardImg } from './MagicCards/MagicCard'
import DeckPreview from './Decks/DeckPreview'
import MagicCards from './MagicCards/MagicCards.js'
import queries from '../queries/index.js'
import mutations from '../mutations/index.js'
import Stages from './Stages'
import InputWithErrors from '../InputWithErrors'
// const PickableMagicCard

const DeckCardsPickedPreview = ({ cards, onCardClick }) => {
    /**
     * This component shows the cards selected so far. It can be expansed to show all the cards added to the deck so far.
     */
    const [showMoreCards, setShowMoreCard] = useState(false)
    const subsetOfCards = [...cards].reverse().slice(0, 8)
    const thereAreMoreCards = cards.length > subsetOfCards.length

    return (
        <Flex sx={{ flexDirection: 'row', alignItems: 'center', height: '8vh', flexWrap: 'wrap' }}>
            {/* Show the last 4 picked cards */}
            {subsetOfCards.map((card, i) =>
                <Box key={i} p={2} sx={{ height: '100%' }}>
                    <MagicCardImg key={i} {...card} height={'100%'} width={'auto'} onClick={() => onCardClick(card)} />
                </Box>)}
            {/* Display a button to zoom and see all the cards in the deck */}
            <Box>
                {subsetOfCards.length > 0 && <Button onClick={() => setShowMoreCard(true)}>
                    <Text>{thereAreMoreCards ? `${cards.length}` : 'zoom'}</Text>
                </Button>}
            </Box>
            {/* The cards will be displayed in a modal */}
            <Modal active={showMoreCards && cards.length > 0} variant='none' sx={{ width: '100%' }}>

                <IconButton onClick={() => setShowMoreCard(false)} variant='close'>
                    <img height='100%' src='/close-black-18dp.svg'></img>
                </IconButton>
                <Card sx={{ flex: '1' }}>
                    <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>So far</Text>
                    <Text sx={{ fontSize: 1 }}>click to remove them from the deck</Text>

                    {/* All the cards in the deck so far */}
                    <Box mt={2}></Box>
                    <MagicCards cards={cards} width={['100%', '33%', '25%']}>
                        {(card, i) => <MagicCardImg key={i} {...card} onClick={() => onCardClick(card)} />}
                    </MagicCards>
                </Card>
            </Modal>
        </Flex>)
}

const AddAndRemoveMagicCard = ({ onAdd, onRemove, card, numberInDeck }) => (
    /***
     * Wrapper around MagicCard to easily add or remove it from the deck
     */
    <Box sx={{ position: 'relative' }}>
        <MagicCard {...card} sx={{ backgroundColor: 'primary', borderRadius: '8px 8px 0px 0px' }} isZoomable={true} />
        <Flex pb={2} px={2} sx={{ bg: 'primary', borderRadius: '0px 0px 16px 16px', alignItems: 'center' }}>
            {numberInDeck > 0 && <Button onClick={onRemove} >Remove</Button>}
            <Box variant="spacer" />
            {numberInDeck > 0 && <Text sx={{ fontSize: 2, color: 'white' }}>{numberInDeck}</Text>}
            <Box variant="spacer" />
            <Button onClick={onAdd}>Add</Button>
        </Flex>
    </Box>
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
        <Card sx={{ width: '100%' }}>
            <Stages initialStage={1}>
                {({ onNext }) => (
                    <Card p={2}>
                        <Text sx={{ fontSize: 4 }}>New Deck</Text>
                        <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>Info</Text>
                        <Box py={2} />
                        <Box>
                            <Text pb={2}>Name</Text>
                            <InputWithErrors sx={{ width: ['100%', '100%', '50%'] }}
                                onChange={(el) => setDeck(Object.assign(deck, { name: el.target.value }))}
                            />
                        </Box>
                        <Flex pt={5}>
                            <Button onClick={onClose}>Close</Button>
                            <Box variant="spacer" />
                            <Button onClick={() => onInfoDeckComplete(onNext)}>Next</Button>
                        </Flex>
                    </Card>
                )}
                {({ onBack, onNext }) => (
                    <Card p={2} sx={{ maxHeight: '95vh' }}>
                        <Flex sx={{ flexDirection: 'column' }}>
                            <Box >
                                <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>Cards</Text>
                                <Box py={3} />
                            </Box>
                            <SearchBar>{({ cards, onLoadMore }) =>
                                <Box sx={{ maxHeight: '65vh', overflowY: 'scroll' }}>
                                    <MagicCards cards={cards.cards} hasFilters={false}>
                                        {card => <AddAndRemoveMagicCard
                                            card={card}
                                            onRemove={() => removeCardFromDeck(card)}
                                            onAdd={() => addCardToDeck(card)}
                                            numberInDeck={getNumberOfCardInDeck(card)} />}
                                    </MagicCards>
                                    {cards.hasMore && <Flex variant='centering'>
                                        <Button onClick={onLoadMore}>More</Button>
                                    </Flex>}
                                </Box>
                            }</SearchBar>
                            <Box py={2} />
                            {deck.cards.length > 0 && <Box>
                                <Text pb={2}>So far</Text>
                                <DeckCardsPickedPreview {...deck} onCardClick={removeCardFromDeck} />
                            </Box>}
                            <Flex pt={5} >
                                <Button onClick={onBack}>Back</Button>
                                <Box variant="spacer" />
                                <Button onClick={onNext}>Next</Button>
                            </Flex>
                        </Flex>
                    </Card>
                )}
                {({ onBack }) => (
                    <Card p={2}>
                        <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>Preview</Text>
                        <Box p={3} />
                        <Card sx={{width: '100%', bg:'background'}}>
                        <DeckPreview {...deck} controllers={false} />
                        </Card>
                        <Flex pt={5}>
                            <Button onClick={onBack}>Back</Button>
                            <Box variant="spacer" />
                            <Button onClick={onDone}>Done</Button>
                        </Flex>
                    </Card>
                )}
            </Stages>
        </Card>
    )
}
