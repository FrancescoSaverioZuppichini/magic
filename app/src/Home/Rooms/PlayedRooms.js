import React from 'react'
import { Flex, Box } from 'theme-ui'
import RoomPreview from './RoomPreview.js'
import queries from '../../queries/index'
import { useQuery } from '@apollo/react-hooks'

export default function PlayedRooms() {
    const { data, error } = useQuery(queries.GET_PLAYED_ROOM)
    return (
        <Flex sx={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
            {data && data.playedRooms.map(room => (
                 <Box key={room.id} p={2}>
                <RoomPreview {...room} isOwner={false}/>
                </Box>
            ))}
        </Flex>
    )
}
