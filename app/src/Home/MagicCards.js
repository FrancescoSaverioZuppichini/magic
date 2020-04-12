import React from 'react'
import { MagicCard } from './MagicCard'
import {Flex, Card, Box, Button } from 'theme-ui'

export default function MagicCards( { cards, children, width=['100%', '33%', '25%', '20%', '15%'] }) {
    return (
            <Flex mt={4} sx={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                // maxHeight: '70vh',
                // justifyContent: 'center'
            }}>
                {cards.cards.map((card, i) =>
                    <Box key={i} p={1} sx={{ flexBasis:width}}>
                        {children(card)}
                    </Box>)}
            </Flex>
        )
        
}
