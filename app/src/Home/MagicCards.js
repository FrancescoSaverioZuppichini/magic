import React from 'react'
import MagicCard from './MagicCard'
import {Flex, Card } from 'theme-ui'

export default function Cards( { cards }) {
    return (
        <Flex sx={{flexDirection : 'row', flexWrap : 'wrap'}}>
            {cards.map(card => (<MagicCard key={card.id} {...card}/>))}
        </Flex>
    )
}
