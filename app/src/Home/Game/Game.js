import React, { useState, useEffect } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import { Provider, Subscribe } from 'unstated';
import RoomContainer from '../../containers/RoomContainer'
import loader from '../../containers/LoaderContainer'
import queries from '../../queries'
import { useQuery } from '@apollo/react-hooks'
import PreGame from './PreGame'
import InGame from './InGame'
import GameContainer from '../../containers/GameContainer'

const JoinAutomatically = ({ room, name, userId, roomId }) => {
    room.joinRoom(name, userId, roomId)
    return ''
}


const Phases = ({ phase, room, game, me }) => {
    console.log(phase)
    let children = <PreGame room={room} me={me} />

    if (phase === room.PHASES.GAME) children = <InGame room={room} game={game} deck={me.decks[0]} />

    return children

}

export default function Game({ id }) {
    const roomRes = useQuery(queries.GET_ROOM, { variables: { id } })
    const meRes = useQuery(queries.GET_ME)

    const roomData = roomRes.data
    const meData = meRes.data

    const roomContainer = new RoomContainer()

    useEffect(() => roomContainer.deselectDeck(), [])
    loader.hide()

    return (
        <Provider>
            <Flex sx={{ flexDirection: 'column', flexGrow: 1 }}>

                <div>Room</div>
                {roomData && meData &&
                    <Subscribe to={[roomContainer, GameContainer]}>
                        {(room, game) => (
                            <Flex sx={{ flexDirection: 'column', flexGrow: 1 }}>
                                <div>{roomData.room.name} </div>
                                <JoinAutomatically room={room} name={roomData.room.id} userId={meData.me.id} roomId={id} />
                                <Phases phase={room.state.phase}
                                    room={room}
                                    game={game}
                                    me={meData.me} />
                            </Flex>)
                        }
                    </Subscribe>
                }
            </Flex>

        </Provider>
    )
}
