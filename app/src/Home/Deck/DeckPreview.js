import React, { useState } from 'react'
import moment from 'moment'
import { Card, Flex, Text, Box, Button } from 'theme-ui'
import Modal from '../Modal'
import Deck from './Deck'


function DeckPreview({ id, name, cards, createdAt=moment() }) {
    const [isDeckOpen, setIsDeckOpen] = useState(false)
    // TODO remove deck
    return (
        <Card sx={{ width: '200px' }} onClick={() => setIsDeckOpen(true)}>
            <Text sx={{ fontSize: 2 }}>{name}</Text>
            <Text sx={{ fontSize: 0 }}>{moment(createdAt).format('MMM Do YY')}</Text>
            <Box p={2}></Box>
            <Text sx={{ fontSize: 0 }}>{`Cards ${cards.length}`}</Text>
            <Modal active={isDeckOpen}>
                <Deck id={id}/>
                <Button onClick={() => setIsDeckOpen(false)}>Close</Button>
            </Modal>
        </Card>
    )
}

export default DeckPreview
