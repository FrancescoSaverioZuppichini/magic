import React, { useState, useRef } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import SearchBar from './SearchBar'
import { Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import Modal from './Modal'
import { ACTIONS } from '../utils.js'
import { MagicCard, MagicCardImg } from './MagicCard'
import queries from '../queries/index.js'
import Stages from './Stages'

// const PickableMagicCard

export default function NewDeck({ onClose }) {
    const nameInput = useRef(null)
    const [deck, setDeck] = useState({ name: '', cards: [] })
    const client = useApolloClient()
    const { error, data } = useQuery(queries.GET_ACTION, { client })

    const onDone = (el) => {
        console.log(deck)
    }

    const addCardToDeck = (card) => {
        const newDeck = { name: deck.name, cards: [...deck.cards, card] }
        setDeck(newDeck)
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
                            <Input sx={{ width: ['100%', '100%'] }}
                                ref={nameInput}
                                onChange={(el) => setDeck(Object.assign(deck, { name: el.target.value }))}>

                            </Input>
                        </Box>
                        <Flex py={5}>
                            <Button onClick={onClose}>Close</Button>
                            <Box variant="spacer" />
                            <Button onClick={onNext}>Next</Button>
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
                                        height: '66vh'
                                    }}>
                                        {cards.cards.map((card) => <Box key={card.id} p={1} sx={{ width: ['50%', '33%'] }}>
                                            <MagicCardImg
                                                {...card}
                                                // isZoomable={false} 
                                                onClick={() => addCardToDeck(card)} />
                                        </Box>)}
                                        <Flex variant='centering'>
                                            <Button onClick={onLoadMore}>More</Button>
                                        </Flex>
                                    </Flex>}
                            </div>)}</SearchBar>
                        <Box py={2} />
                        <Text pb={2}>So far</Text>
                        <Flex sx={{ flexDirection: 'row', overflowX: 'scroll'}}>
                        {deck.cards.map((card) => <Box sx={{ width: '100px' }}><MagicCardImg {...card} /></Box>)}
                        </Flex>
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
