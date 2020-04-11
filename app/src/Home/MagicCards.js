import React from 'react'
import { MagicCard } from './MagicCard'
import {Flex, Card, Box, Button } from 'theme-ui'

export default function MagicCards( { cards, children, onLoadMore }) {
    return (
            <Flex mt={4} sx={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                // maxHeight: '70vh',
                // justifyContent: 'center'
            }}>
                {cards.cards.map((card) =>
                    <Box key={card.id} p={1} sx={{ flexBasis: ['100%', '33%', '25%', '20%', '15%'] }}>
                        {children(card)}
                    </Box>)}
            </Flex>
        )
        
}
