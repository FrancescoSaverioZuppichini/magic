import React, { useState, useEffect } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import { Provider, Subscribe } from 'unstated'
import RoomContainer from '../../containers/RoomContainer'
import loader from '../../containers/LoaderContainer'
import queries from '../../queries'
import { useQuery } from '@apollo/react-hooks'
import PreGame from './PreGame'
import Battle from './Battle/Battle'
import GameOwnerActions from './GameOwnerActions'

const JoinAutomatically = React.memo(({ room, data, userId }) => {
    console.log('wee')
    room.joinRoom(data.name, userId, data.id)
    return ''
})

const Phases = ({ phase, room, me }) => {
    let children;
    switch (phase) {
        case room.PHASES.PRE:
            children = <PreGame room={room} me={me} />
            break

        case room.PHASES.BATTLE:
            children = <Battle room={room} deck={room.state.deck} />
            break
    }

    return children
}

const roomContainer = new RoomContainer()

export default function Game({ id }) {
    const roomRes = useQuery(queries.GET_ROOM, { variables: { id } })
    const meRes = useQuery(queries.GET_ME)

    const roomData = roomRes.data
    const meData = meRes.data

    useEffect(() => {
        // check if we have a previusly saved state
        const lastGameState = window.localStorage.getItem(id)
        if(lastGameState && lastGameState.deck !== null) roomContainer.start()
        else { roomContainer.deselectDeck() }
    }, [])
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
        </Provider>
    )
}
