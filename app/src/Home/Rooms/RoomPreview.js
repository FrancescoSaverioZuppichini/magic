import React from 'react'
import { Card, Text, Flex } from 'theme-ui'
import moment from 'moment'
import { Link } from "react-router-dom"

export default function RoomPreview( {name, id, createdAt }) {
    return (
        <Card>
            <Link to={`/home/rooms/show/${id}`}><Text sx={{ fontSize: 2 }}>{name}</Text></Link>
            <Text sx={{fontSize: 0}}>{moment(createdAt).format('MMM Do YY')}</Text>
        </Card>
    )
}
