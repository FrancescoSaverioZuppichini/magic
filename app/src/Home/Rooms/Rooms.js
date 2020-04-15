import React from 'react'
import { Card, Box, Flex, Text, Button } from 'theme-ui'
import queries from '../../queries'
import { Route } from "react-router-dom"
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from "react-router-dom"
import RoomPreview from './RoomPreview.js'
import Modal from '../Modal'
import Room from './Room'

export default function Rooms() {
    const { error, data } = useQuery(queries.GET_ME)
    const history = useHistory()

    return (
        <Box>
            <Box>
                <Text sx={{ fontSize: 4, fontWeight: 'thin' }}>Rooms</Text>
                <Box py={2} p />
                <Flex sx={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {data.me.rooms.reverse().map(room => <Box key={room.id} pr={2} py={2}>
                        <RoomPreview key={room.id} {...room}>}</RoomPreview></Box>)}
                    <Box px={3} />
                    <Button
                        onClick={() => history.push('/home/rooms/newRoom')}>
                        Add
            </Button>
                </Flex>
            </Box>
            <Route path='/home/rooms/show/:roomId'>
            {({ match }) => match ? <Modal active={true}>
                    <Room id={match.params.roomId} />
                </Modal> : ''
                }
            </Route>
        </Box>
    )
}
