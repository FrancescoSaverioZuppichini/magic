import React, { useState, useEffect } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import loader from '../../containers/LoaderContainer'
import { useHistory } from 'react-router-dom'
import DecksSearchBar from '../Decks/MyDecksSearchBar'
import Modal from '../Modal.js'
import Stages from '../Stages.js'
import DeckRow from '../Decks/DeckRow'

export default function PreGame({ me, room, roomId }) {
    const [deckSelected, setDeckSelected] = useState(me.decks[0])
    const history = useHistory()
    const onGo = () => room.selectDeck(deckSelected)
    return (
        <Modal active={true} position={'fixed'} variant='vCentering'>
            <Stages>
                {({ onNext }) => (
                    <Box variant='vCentering'>
                        <Card sx={{ width: ['100%', '100%', '50%', '450px'] }}>
                            <Text sx={{ fontSize: 2 }}>Select a Deck</Text>
                            <Box py={2} />
                            <DecksSearchBar decks={me.decks} variant="inputTiny">
                                {decks => <Box mt={2} sx={{ bg: 'background' }}>
                                    {decks.map(deck => <Box p={2} key={deck.id}>
                                        <DeckRow deck={deck}
                                            key={deck.id}
                                            onClick={() => setDeckSelected(deck)}
                                            isSelected={deckSelected.id === deck.id} />
                                    </Box>)}
                                </Box>
                                }
                            </DecksSearchBar>
                            <Flex pt={4} sx={{ justifyContent: 'space-between' }}>
                                <Button onClick={() => {
                                    loader.hide()
                                    history.goBack()
                                }}>Exit</Button>
                                <Button onClick={() => {
                                    onGo()
                                    onNext()
                                    loader.show()
                                }}>Go!</Button>
                            </Flex>
                        </Card>
                    </Box>
                )}
                {({ onBack }) =>
                    <Box variant='vCentering'>
                        <Card>
                            <Text sx={{ fontSize: 2 }}>Waiting for the other player...</Text>
                            <Flex pt={4} sx={{ justifyContent: 'flex-start' }}>
                                <Button onClick={() => {
                                    room.action(room.PHASES.BATTLE, { roomId, userId: me.id })     
                                    onBack()                             
                                    loader.hide()
                                }}>Edit</Button>
                            </Flex>
                        </Card>
                    </Box>
                }
            </Stages>
        </Modal >
    )
}