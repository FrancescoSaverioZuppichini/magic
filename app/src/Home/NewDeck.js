import React, { useState, useRef } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import SearchBar from './SearchBar'
import { Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import Modal from './Modal'
import { ACTIONS } from '../utils.js'
import { MagicCard, MagicCardImg, WithControllers } from './MagicCard'
import queries from '../queries/index.js'
import Stages from './Stages'
import theme from '../theme.js'
import InputWithErrors from '../InputWithErrors'
// const PickableMagicCard

const DeckCardsPickedPreview = ({ cards, onCardClick }) => {
    const subsetOfCards = cards.reverse().slice(0, 4)
    const thereAreMoreCards = cards.length > subsetOfCards.length

    const [showMoreCards, setShowMoreCard] = useState(false)

    return (
        <Flex sx={{ flexDirection: 'row', alignItems: 'center' }}>
            {subsetOfCards.map((card, i) =>
                <Box key={i} sx={{ width: '100px' }} p={2}>
                    <MagicCardImg key={i} {...card} onClick={() => onCardClick(card)} />
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
                            {/* <Box bg={'primary'}>1</Box> */}
                        </Box>)}
                </Flex>
            </Modal>
        </Flex>)
}

const AddToDeckCardDownControllers = ({ onAdd, onRemove }) => (
    <Flex p={1}>
        <Box variant="spacer" />
        <Button onClick={onAdd} variant='circleSmall'><img src='add-white-18dp.svg'></img></Button>
    </Flex>
)

const CardInDecksNumber = ({ number }) => (
    <Box
        p={2}
        sx={{ position: 'absolute', right: 0, top: 0, bg: 'primary' }}>
        {number}
    </Box>)

export default function NewDeck({ onClose }) {
    const nameInput = useRef(null)
    const [deck, setDeck] = useState({ name: '', cards: [] })
    const client = useApolloClient()
    const { error, data } = useQuery(queries.GET_ACTION, { client })


    const getNumberOfCardInDeck = (card) => deck.cards.filter(el => el.id === card.id).length
    const isSelected = (card) => getNumberOfCardInDeck(card) > 0

    const onDone = (el) => {
        console.log(deck)
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
            <Stages initialStage={0}>
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
                                                    {/* <WithControllers
                                                        downControllers={<AddToDeckCardDownControllers onAdd={() => addCardToDeck(card)} />}> */}
                                                    <MagicCardImg
                                                        {...card}
                                                        onClick={() => addCardToDeck(card)}
                                                    // isZoomable={false} 
                                                    />
                                                    {isSelected(card) &&
                                                        <CardInDecksNumber
                                                            number={getNumberOfCardInDeck(card)} />}
                                                    {/* </WithControllers> */}
                                                </Card>
                                            </Box>)}
                                        <Flex variant='centering'>
                                            <Button onClick={onLoadMore}>More</Button>
                                        </Flex>
                                    </Flex>}
                            </div>)}</SearchBar>
                        <Box py={2} />
                        <Text pb={2}>So far</Text>
                        <DeckCardsPickedPreview {...deck} onCardClick={removeCardFromDeck} />
                        <Flex py={5}>
                            <Button onClick={onBack}>Back</Button>
                            <Box variant="spacer" />
                            <Button onClick={onNext}>Next</Button>
                        </Flex>
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
