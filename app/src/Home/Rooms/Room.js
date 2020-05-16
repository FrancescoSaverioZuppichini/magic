import React from 'react'
import { Flex, Text, Box, Card, Button } from 'theme-ui'
import { useHistory, useLocation } from "react-router-dom";
import queries from '../../queries'
import { useQuery } from '@apollo/react-hooks'
import RoomControllers from './RoomControllers'

export default function Room({ id }) {
    /**
     * This cards display the room's information as well as how to join it.
     */
    const history = useHistory()
    const location = useLocation()
    const { data } = useQuery(queries.GET_ROOM, { variables: { id: id } })

    const sharableLink = `/home/game/${id}`
    // join is simply a redirect to /home/game/{id}
    const onJoin = () => window.location = sharableLink

    return (
        <Card sx={{ width: ['100%', '100%', '50%', '450px'] }}>
            {data && <Box>
                <Flex sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Text sx={{ fontSize: 4 }}>{data.room.name}</Text>
                    <Box px={2}></Box>
                    <Button onClick={history.goBack}>Close</Button>
                </Flex>
                <Box py={2} />
                <Text sx={{ fontSize: 2 }}>Sharable link</Text>
                <Box py={1} />
                <Text sx={{ fontSize: 1, fontWeight: 'thin' }}>Just send it to your friends!</Text>
                <Box py={1} />
                <Text>{sharableLink}</Text>
                <Flex pt={4}>
                    <RoomControllers {...data.room} onCompleted={history.goBack} />
                    <Box variant="spacer" />
                    <Button onClick={onJoin}>Join</Button>
                </Flex>
            </Box>}
        </Card>

    )
}
