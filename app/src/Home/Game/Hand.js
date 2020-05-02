import React, { useState } from 'react'
import { Card, Text, Flex, Box, Button } from 'theme-ui'
import GameMagicCard from './GameMagicCard'
import OrganizableMagicCards from './OrganizableMagicCards'


// https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
export default function Hand({ game, onCardClick, selectedCard }) {
    const [isHiding, setIsHiding] = useState(false)

    return (
        <Box sx={{ position: 'relative' }}>
            {isHiding ?
                // button to show the hand
                <Flex sx={{ justifyContent: 'flex-end' }} pb={2} pl={2}>
                    <Button onClick={() => setIsHiding(false)} variant='primary'>Deck</Button>
                </Flex>
                :
                // hand
                <Card>
                    <Flex sx={{ flexDirection: ['column', 'column', 'column'] }}>
                        <OrganizableMagicCards cards={game.state.hand} droppableId='hand'>
                            {card => (
                                <GameMagicCard {...card} onClick={() => onCardClick(card)}
                                    selected={selectedCard.uid === card.uid} />)}
                        </OrganizableMagicCards>
                        <Flex sx={{ flexDirection: ['row', 'row', 'row'], justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                            <Box>
                                <Text>{game.state.deck.cards.length} in deck </Text>
                            </Box>
                            <Flex pt={1}>
                                <Button onClick={() => setIsHiding(true)} variant='outline'>Hide</Button>
                                <Box px={1} />
                                {game.state.deck.cards.length > 0 && <Button onClick={() => game.pickACard()}>Pick</Button>}
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>}

        </Box>
    )
}
