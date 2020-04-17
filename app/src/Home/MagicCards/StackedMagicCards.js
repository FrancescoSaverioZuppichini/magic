import React from 'react'
import { Flex, Box } from 'theme-ui'

// NOT USED
export default function StackedMagicCards({ card, n }) {

    const cards = []

    for (let i = 0; i < n; i++) {
        cards.push(card)
    }
    return (
        // <Flex sx={{ flexDirection: 'row', maxWidth:'50px' }}>

        //     {cards.map(card =><Box sx={{flex: 1}}><img src={`/cards/${card}`} width='200px'></img></Box> )
        //     }

        // </Flex >

        <img src={`/cards/${card}`} width='200px'></img>
    )
}
