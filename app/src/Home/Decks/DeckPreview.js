import React from 'react'
import moment from 'moment'
import { Card, Text, Box } from 'theme-ui'
import { Link } from "react-router-dom"
import DeckControllers from './DeckControllers'

function DeckPreview({ id, name, cards=[], createdAt=moment(), controllers=true, linkable=true }) {
    /**
     * Deck preview allowing on click to display the full deck.
     */
    return (
        <Card sx={{ width: '250px' }} >
            {linkable && <Link to={`/home/decks/show/${id}`}><Text sx={{ fontSize: 2 }}>{name}</Text></Link>}
            {!linkable && <Text sx={{ fontSize: 2 }}>{name}</Text>}
            <Text sx={{ fontSize: 0 }}>{moment(createdAt).format('MMM Do YY')}</Text>
            <Box p={2}></Box>
            {cards && <Text sx={{ fontSize: 0 }}>{`${cards.length} cards`}</Text>}
            <Box p={2}></Box>
            {controllers && <DeckControllers id={id} name={name}/>}
        </Card>
    )
}

export default DeckPreview
