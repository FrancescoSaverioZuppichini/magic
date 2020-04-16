import React, { useState } from 'react'
import { Input, IconButton, Box, Flex } from 'theme-ui'

export default function DecksSearchBar({ decks, children, sx }) {

    const [matchedDecks, setMatchedDecks] = useState(decks)

    const filter = (name) => setMatchedDecks(decks.filter(deck => deck.name.includes(name)))


    return (
        <Flex sx={{flexDirection: 'column'}}>
            <Input variant='inputTiny' sx={sx} placeholder='Search in decks...'
                onChange={e => filter(e.target.value)} >
            </Input>
            <Box sx={{ flex: 1 }} py={2}>
                {children(matchedDecks)}
            </Box>
        </Flex>
    )
}
