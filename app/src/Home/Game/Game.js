import React, { useState, useEffect } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
<<<<<<< HEAD
import { Provider, Subscribe } from 'unstated'
import RoomContainer from '../../containers/RoomContainer'
import loader from '../../containers/LoaderContainer'
import queries from '../../queries'
import { useQuery } from '@apollo/react-hooks'
import PreGame from './PreGame'
import Battle from './Battle/Battle'
import GameOwnerActions from './GameOwnerActions'

const JoinAutomatically = ({ room, data, userId }) => {
    room.joinRoom(data.name, userId, data.id)
    return ''
}

const Phases = ({ phase, room, me }) => {
    let children;
    switch (phase) {
        case room.PHASES.PRE:
            children = <PreGame room={room} me={me} />
            break

        case room.PHASES.BATTLE:
            children = <Battle room={room} deck={me.decks[0]} />
            break
    }

    return children
}

const roomContainer = new RoomContainer()
=======
import { Provider, Subscribe, Container } from 'unstated';
import RoomContainer from '../../containers/RoomContainer'
import loader from '../../containers/LoaderContainer'
import { useHistory } from 'react-router-dom'
import queries from '../../queries'
import { useQuery } from '@apollo/react-hooks'
import DecksSearchBar from '../Decks/DecksSearchBar'
import Modal from '../Modal.js'
import Stages from '../Stages.js'
import DeckRow from '../Decks/DeckRow'

const JoinAutomatically = ({ room, name, userId, roomId }) => {
    room.joinRoom(name, userId, roomId)
    return ''
}

const PreGame = ({ me, room }) => {
    const [deckSelected, setDeckSelected] = useState({})
    const history = useHistory()
    const onGo = () => room.selectDeck({ id: deckSelected.id })

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
                                    room.deselectDeck()
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

const InGame = ({ room }) => {
    useEffect(() => loader.hide(), [])
    return (
        <Box>Game</Box>
    )
}

const Phases = ({ phase, room, me }) => {
    console.log(phase)
    let children = <PreGame room={room} me={me} />

    if (phase === room.PHASES.GAME) children = <InGame room={room} />

    return children

}
>>>>>>> c5bea406fed5d371065eba64def74ff14308c9a7

export default function Game({ id }) {
    const roomRes = useQuery(queries.GET_ROOM, { variables: { id } })
    const meRes = useQuery(queries.GET_ME)

    const roomData = roomRes.data
    const meData = meRes.data

<<<<<<< HEAD
    useEffect(() => roomContainer.deselectDeck(), [])
    loader.hide()

    return (
        <Provider>
            <Flex sx={{ flexDirection: 'column', flexGrow: 1 }}>
                {roomData && <Text sx={{ fontSize: 2, fontWeight: 'thin' }}>{`Room ${roomData.room.name}`}</Text>}
                <Box py={1}></Box>
                {roomData && meData &&
                    <Subscribe to={[roomContainer]}>
                        {(room) => (
                            <Flex sx={{ flexDirection: 'column', flexGrow: 1 }}>
                                {meData.me.id === roomData.room.owner.id && <GameOwnerActions
                                    room={room}
                                    data={roomData.room}
                                />}
                                <JoinAutomatically room={room} data={roomData.room} userId={meData.me.id} />
                                <Phases phase={room.state.phase}
                                    room={room}
                                    me={meData.me} />
                            </Flex>)
                        }
                    </Subscribe>
                }
            </Flex>
=======
    const roomContainer = new RoomContainer()

    useEffect(() => roomContainer.deselectDeck(), [])
    loader.hide()

    console.log(roomRes.data)

    return (
        <Provider>
            <div>Room</div>
            {roomData && meData &&
                <Subscribe to={[roomContainer]}>
                    {room => (
                        <Box>
                            <div>{roomData.room.name} </div>
                            <JoinAutomatically room={room} name={roomData.room.id} userId={meData.me.id} roomId={id} />
                            <Phases phase={room.state.phase} room={room} me={meData.me} />
                        </Box>

                    )
                    }
                </Subscribe>
            }
>>>>>>> c5bea406fed5d371065eba64def74ff14308c9a7
        </Provider>
    )
}
