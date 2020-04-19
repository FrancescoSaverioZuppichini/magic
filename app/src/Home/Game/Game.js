import React, { useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import { Provider, Subscribe, Container } from 'unstated';
import RoomContainer from '../../containers/RoomContainer'
import queries from '../../queries'
import { useQuery } from '@apollo/react-hooks'
import DecksSearchBar from '../Decks/DecksSearchBar'
import Modal from '../Modal.js'
import DeckRow from '../Decks/DeckRow'

const JoinAutomatically = ({ room, name, userId, roomId }) => {
    room.joinRoom(name, userId, roomId)
    return ''
}

const PreGame = ({ me, room }) => {
    const [deckSelected, setDeckSelected] = useState({})

    const onStart = () => console.log(deckSelected)
   
    return (
        <Modal active={true} position={'fixed'} variant='vCentering'>
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
                <Flex pt={4} sx={{ justifyContent: 'flex-end' }}>
                    <Button onClick={onStart}>Go!</Button>
                </Flex>
            </Card>
    </Modal>
    )
}


const Phases = ({phase, room, me}) => {
    console.log(phase)
    let children =  <PreGame room={room} me={me}/>

    if(phase === room.PHASES.GAME) children = <Box>Game</Box>

    return children
    
}

export default function Game({ id }) {
    const roomRes = useQuery(queries.GET_ROOM, { variables: { id } })
    const meRes = useQuery(queries.GET_ME)
    
    const roomData = roomRes.data
    const meData = meRes.data

    console.log(roomData)
    return (
        <Provider>
            <div>Room</div>
            {roomData && meData &&
                <Subscribe to={[RoomContainer]}>
                    {room => (
                        <Box>
                            <div>{roomData.room.name} </div>
                            <JoinAutomatically room={room} name={roomData.room.name} userId={meData.me.id} roomId={id}/>
                            <Phases phase={room.state.phase} room={room} me={meData.me}/>
                        </Box>
                        
                        )
                    }
                </Subscribe>
            }
        </Provider>
    )
}
