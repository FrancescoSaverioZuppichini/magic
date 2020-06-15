import React from 'react'
import moment from 'moment'
import { Card, Text, Box } from 'theme-ui'
import { Link, useLocation } from "react-router-dom"
import DeckStats from './DeckStats'
function DeckPreview({ deck, controllers, linkable=true, width='300px', url='/home/decks/show/', onClick }) {
    const { id, name, cards, createdAt, colors = [], type } = deck
    /**
     * Deck preview allowing on click to display the full deck.
     */
    return (
        <Card sx={{ width }} >
            {linkable && <Text sx={{ fontSize: 2 }}><Link to={`${url}${id}`}>{name}</Link></Text>}
            {!linkable && <Text sx={{ fontSize: 2 }}><a onClick={onClick}>{name}</a></Text>}
            <Text sx={{ fontSize: 0 }}>{moment(Number(createdAt)).format('MMM Do YY')}</Text>
            {type && <Text py={1}>{type}</Text>}
            <Box py={1}/>
            <DeckStats colors={colors} />
            <Box p={2}></Box>
            {cards && <Text sx={{ fontSize: 0 }}>{`${cards.length} cards`}</Text>}
            <Box p={2}></Box>
            {controllers && controllers(deck)}
        </Card>
    )
}

export default DeckPreview
