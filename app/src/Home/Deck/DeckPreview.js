import React, { useState } from 'react'
import moment from 'moment'
import { Card, Flex, Text, Box, Button } from 'theme-ui'
import { Link } from "react-router-dom"
import DeckControllers from './DeckControllers'

function DeckPreview({ id, name, cards, createdAt=moment() }) {
    
    return (
        <Card sx={{ width: '200px' }} >
            <Link to={`/home/decks/${id}`}><Text sx={{ fontSize: 2 }}>{name}</Text></Link>
            <Text sx={{ fontSize: 0 }}>{moment(createdAt).format('MMM Do YY')}</Text>
            <Box p={2}></Box>
            <Text sx={{ fontSize: 0 }}>{`${cards.length} cards`}</Text>
            <Box p={2}></Box>
            <DeckControllers id={id}/>
           
        </Card>
    )
}

export default DeckPreview
