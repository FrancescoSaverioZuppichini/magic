import React, { useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import InGameMagicCard from './InGameMagicCard'
import Modal from '../Modal.js'
import { Droppable, Draggable } from "react-beautiful-dnd";
import CombinedMagicCard from './CombinedMagicCard'
// https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
export default function InGameDeck({ game, onCardClick, selectedCard }) {
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
                        <Droppable droppableId={'hand'} direction="horizontal" isCombineEnabled={true}>
                            {(provided) => (
                                <Flex key={0}
                                    sx={{ flexDirection: 'row', overflowX: 'auto', flexGrow: 1 }}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {game.state.hand.map((card, i) => (
                                        <Draggable draggableId={i.toString()} index={i}>
                                            {(provider, shapshot) => (
                                                <Box

                                                    {...provider.draggableProps}
                                                    {...provider.dragHandleProps}
                                                    ref={provider.innerRef}
                                                    sx={{ minWidth: '150px', width: '150px' }}
                                                    px={1}
                                                    key={i}>
                                                    <CombinedMagicCard
                                                        {...shapshot}
                                                        card={card}>
                                                        {card => (
                                                            <InGameMagicCard {...card} onClick={() => onCardClick(card)}
                                                                selected={selectedCard.id === card.id} />)}
                                                    </CombinedMagicCard>
                                                </Box>

                                            )}
                                        </Draggable>)
                                    )}
                                    {provided.placeholder}
                                </Flex>
                            )}
                        </Droppable>
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
