import React, { useState, useRef } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import SearchBar from './SearchBar'
import { Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import Modal from './Modal'
import { ACTIONS } from '../utils.js'
import { MagicCard, MagicCardImg, WithControllers } from './MagicCard'
import queries from '../queries/index.js'
import mutations from '../mutations/index.js'
import Stages from './Stages'
import theme from '../theme.js'
import InputWithErrors from '../InputWithErrors'
// const PickableMagicCard

const DeckCardsPickedPreview = ({ cards, onCardClick }) => {
    /**
     * This component shows the cards selected so far. It can be expansed to show all the cards added to the deck so far.
     */
    const [showMoreCards, setShowMoreCard] = useState(false)
    const subsetOfCards = cards.reverse().slice(0, 4)
    const thereAreMoreCards = cards.length > subsetOfCards.length

    return (
        <Flex sx={{ flexDirection: 'row', alignItems: 'center', height:'10vh' }}>
            {subsetOfCards.map((card, i) =>
                <Box key={i}  p={2} sx={{height: '100%'}}>
                    <MagicCardImg  key={i} {...card} height={'100%'} width={'auto'} onClick={() => onCardClick(card)} />
                    {/* <Box bg={'primary'}>1</Box> */}
                </Box>)}
            {thereAreMoreCards && <Box>
                <Button onClick={() => setShowMoreCard(true)}>
                    <Text>+ {cards.length - subsetOfCards.length}</Text>
                </Button>
            </Box>}
            <Modal active={showMoreCards && cards.length > 0}>
                <IconButton onClick={() => setShowMoreCard(false)}>
                    <img height='24px' src='/close-black-18dp.svg'></img>
                </IconButton>                <Flex sx={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {cards.map((card, i) =>
                        <Box key={i} sx={{ width: '200px' }} p={2}>
                            <MagicCardImg key={i} {...card} onClick={() => onCardClick(card)} />
                        </Box>)}
                </Flex>
            </Modal>
        </Flex>)
}

const AddAndRemoveMagicCard = ({ onAdd, onRemove, card, numberInDeck }) => (
    /***
     * Wrapper around MagicCard to easily add or remove it from the deck
     */
    <Box>
        <MagicCard {...card} isZoomable={true} />
        <Flex p={1} sx={{bg :'primary', borderRadius: '16px'}}>
            { numberInDeck > 0 && <Button onClick={onRemove}>REMOVE</Button>}
            {numberInDeck}
            <Box variant="spacer" />
            <Button onClick={onAdd}>ADD</Button>
        </Flex>
    </Box>
)

export default function NewDeck({ onClose }) {
    const nameInput = useRef(null)
    const client = useApolloClient()
    const [deck, setDeck] = useState({ name: '', cards: [] })
    const { error, data } = useQuery(queries.GET_ACTION, { client })
    const [newDeck, { newDeckError}] = useMutation(mutations.NEW_DECK, {
        onCompleted({ newDeck }) {
            console.log(newDeck)
            onClose()
        }
    })


    const getNumberOfCardInDeck = (card) => deck.cards.filter(el => el.id === card.id).length
    const isSelected = (card) => getNumberOfCardInDeck(card) > 0

    const onDone = (el) => {
        let deckInput = {...deck}
        deckInput.cards = deckInput.cards.map(el => el.id)
        newDeck({ variables : { deck: deckInput } })
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
        <Card variant='modal'>
            <Text sx={{ fontSize: 4 }}>New Deck</Text>
            <Box py={3} />
            <Stages initialStage={1}>
                {({ onNext }) => (
                    <Card>
                        <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>Info</Text>
                        <Box py={2} />
                        <Box>
                            <Text pb={2}>Name</Text>
                            <InputWithErrors sx={{ width: ['100%', '100%'] }}
                                ref={nameInput}
                                onChange={(el) => setDeck(Object.assign(deck, { name: el.target.value }))}
                            />
                        </Box>
                        <Flex py={5}>
                            <Button onClick={onClose}>Close</Button>
                            <Box variant="spacer" />
                            <Button onClick={() => onInfoDeckComplete(onNext)}>Next</Button>
                        </Flex>
                    </Card>
                )}
                {({ onBack, onNext }) => (
                    <Card>
                        <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>Cards</Text>
                        <Box py={3} />
                        <SearchBar >{({ cards, onLoadMore }) =>
                            (<div>
                                {cards.cards.length > 0 &&
                                    <Flex mt={4} sx={{
                                        flexDirection: 'row',
                                        overflowY: 'scroll',
                                        flexWrap: 'wrap',
                                        height: '50vh'
                                    }}>
                                        {cards.cards.map((card) =>
                                            <Box key={card.id} p={1} sx={{ width: ['50%', '33%'] }}>
                                                <Card variant={isSelected(card) ? 'selected' : 'primary'}
                                                    sx={{ position: 'relative' }}>

                                                    <AddAndRemoveMagicCard
                                                        card={card}
                                                        onRemove={() => removeCardFromDeck(card)}
                                                        onAdd={() => addCardToDeck(card)}
                                                        numberInDeck={getNumberOfCardInDeck(card)} />

                                                </Card>
                                            </Box>)}
                                        <Flex variant='centering'>
                                            <Button onClick={onLoadMore}>More</Button>
                                        </Flex>
                                    </Flex>}
                            </div>)}</SearchBar>
                        <Box py={2} />
                        <Box sx={{height: '10vh'}} >
                        <Text pb={2}>So far</Text>
                        <DeckCardsPickedPreview {...deck} onCardClick={removeCardFromDeck} />
                        <Flex py={5}>
                            <Button onClick={onBack}>Back</Button>
                            <Box variant="spacer" />
                            <Button onClick={onNext}>Next</Button>
                        </Flex>
                        </Box>
                    </Card>
                )}
                {({ onBack }) => (
                    <Card>
                        <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>Preview</Text>
                        <Box p={3} />
                        <Text sx={{ fontSize: 1 }}>Name</Text>
                        <Text sx={{ fontSize: 2 }}>{deck.name}</Text>
                        <Box p={2} />
                        <Text sx={{ fontSize: 1 }}>Cards</Text>
                        <DeckCardsPickedPreview cards={deck.cards}
                            onCardClick={() => ''} />
                        <Flex py={5}>
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
