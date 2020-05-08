import React from 'react'
import { Flex, Box } from 'theme-ui'

export default function DeckStats({ colors }) {
    const URL = 'https://img.scryfall.com/symbology'

    return (
        <Flex sx={{ flexDirection: 'row' }}>
            {colors.map(({ count, color }) => <Box pr={1} key={color}>
                <img width='20px' height='20px' src={`${URL}/${color}.svg`} />
            </Box>)}
        </Flex>
    )
}
