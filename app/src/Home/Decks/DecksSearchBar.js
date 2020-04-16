import React, { useState } from 'react'
import { Input, IconButton, Box, Flex } from 'theme-ui'

export default function DecksSearchBar({ decks, children }) {

    const [matchedDecks, setMatchedDecks] = useState(decks)

    const filter = (name) => setMatchedDecks(decks.filter(deck => deck.name.includes(name)))


    return (
        <Box>
            <Input variant='searchbar' placeholder='Search for decks...'
                onChange={e => filter(e.target.value)} >
            </Input>

            <Box sx={{ flex: 1 }}>
                {children(matchedDecks)}
            </Box>
        </Box>
    )
}
