import React, { useState } from 'react'
import moment from 'moment'
import { Card, Flex, Text, Box, Button } from 'theme-ui'
import { useHistory } from "react-router-dom";


function DeckPreview({ id, name, cards, createdAt=moment() }) {
    // TODO remove deck
    const history = useHistory()
    const onDeckPreviewClick = () => history.push(`/home/decks/${id}`)
    
    return (
        <Card sx={{ width: '200px' }} onClick={onDeckPreviewClick}>
            <Text sx={{ fontSize: 2 }}>{name}</Text>
            <Text sx={{ fontSize: 0 }}>{moment(createdAt).format('MMM Do YY')}</Text>
            <Box p={2}></Box>
            <Text sx={{ fontSize: 0 }}>{`${cards.length} cards`}</Text>
           
        </Card>
    )
}

export default DeckPreview
