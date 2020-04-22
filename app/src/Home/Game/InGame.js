
import React, { useEffect } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import loader from '../../containers/LoaderContainer'
import { Provider, Subscribe } from 'unstated'
import InGameDeck from './InGameDeck'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const BattleField = ({game}) => {
    return ('')
}

export default function InGame({ room, game, deck }) {
    useEffect(() => {
        loader.hide()
        game.setDeck(deck)
    }, [])

    return (
        
        <Flex sx={{ flexDirection: 'column', flexGrow: 1 }}>
            <Card sx={{ flex: 1 }}>
            {game.state.deck && <BattleField game={game}/>}
            </Card>
            <Box py={2} />
            <Box>
                {game.state.deck && <InGameDeck
                    game={game}
                />}
            </Box>
        </Flex>
    )
}
