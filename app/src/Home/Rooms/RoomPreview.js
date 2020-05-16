import React from 'react'
import { Card, Text, Box } from 'theme-ui'
import moment from 'moment'
import { Link } from "react-router-dom"
import RoomControllers from './RoomControllers.js'

export default function RoomPreview({ name, id, createdAt, controllers = true, isOwner=true }) {
    /**
     * Room preview allowing on click to show the full room card.
     */
    return (
        <Card sx={{ minWidth: '250px' }}>
            <Text sx={{ fontSize: 2 }}>
                {isOwner ?  <Link to={`/home/rooms/show/${id}`}>{name}</Link> : <Link to={`/home/game/${id}`}>{name}</Link>}
                </Text>
            <Box p={1} />
            <Text sx={{ fontSize: 0 }}>{moment(createdAt).format('MMM Do YY')}</Text>
            <Box p={2} />
            {/* {controllers && <RoomControllers id={id} name={name} />} */}
        </Card>
    )
}
