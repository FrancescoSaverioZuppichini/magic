import React from 'react'
import { useHistory } from "react-router-dom";
import { Card, Flex, Button, Text, Box } from 'theme-ui'
import moment from 'moment'

const Deck = ({ deck, controllers, children, onClose }) => {
    const history = useHistory()

    return (
        <Card>
            <Box>
                <Flex sx={{ justifyContent: 'space-between' }}>
                    <Text sx={{ fontSize: 4 }}>{deck.name}</Text>
                    <Button onClick={onClose}>Close</Button>
                </Flex>
                <Text sx={{ fontSize: 0 }}>{moment(Number(deck.createdAt)).format('MMM Do YY')}</Text>
                <Box p={2} />
                {controllers && controllers(deck)}
                <Box p={2} />
                {children && children(deck)}
            </Box>
        </Card>
    )
}

export default  Deck
