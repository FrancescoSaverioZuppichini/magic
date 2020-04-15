import React, { useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import { Provider, Subscribe, Container } from 'unstated';
import RoomContainer from '../../containers/RoomContainer'
import queries from '../../queries'
import { useQuery } from '@apollo/react-hooks'

const JoinAutomatically = ({ room, name, userId }) => {
    room.joinRoom(name, userId)
    return ''
}

export default function Game({ id }) {
    const roomRes = useQuery(queries.GET_ROOM, { variables: { id } })
    const meRes = useQuery(queries.GET_ME)

    const roomData = roomRes.data
    const meData = meRes.data

    console.log(meData)
    return (
        <Provider>
            <div>Room</div>
            {roomData && meData &&
                <Subscribe to={[RoomContainer]}>
                    {room => (
                        <Box>
                            <div>{roomData.room.name} </div>
                            <JoinAutomatically room={room} name={roomData.room.name} userId={meData.me.id} />
                            <Button onClick={() => room.emitAction(roomData.room.name, 'wee')}>Action</Button>
                        </Box>)
                    }
                </Subscribe>
            }
        </Provider>
    )
}
