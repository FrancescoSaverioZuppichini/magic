
import React, { useEffect } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import loader from '../../containers/LoaderContainer'
import { Provider, Subscribe } from 'unstated'
import InGameDeck from './InGameDeck'

export default function InGame({ room, game, deck }) {
    useEffect(() => {
        loader.hide()
        game.setDeck(deck)
    }, [])

    console.log(game.state)
    return (

        <Flex sx={{ flexDirection: 'column', flexGrow: 1 }}>
            <Card sx={{ flex: 1 }}>

            </Card>
            <Box py={2}/>
            <Box>
                {game.state.deck && <InGameDeck
                    deck={game.state.deck}
                    hand={game.state.hand} />}
            </Box>
        </Flex>
    )
}
