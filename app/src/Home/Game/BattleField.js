import React, { useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import { MagicCard, ZoomMagiCardAction, CardPage } from '../MagicCards/MagicCard'
import Modal from '../Modal.js'
import { Droppable, Draggable } from "react-beautiful-dnd";

// https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
export default function InGameDeck({ game, onCardClick }) {
    const [isHiding, setIsHiding] = useState(false)


    return (
        <Box sx={{ width: '100%'}}>
                <Droppable droppableId={'battlefield'} direction="horizontal">
                    {(provided) => (
                        <Flex key={0}
                            sx={{ flexDirection: 'row', overflow: 'auto' }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {game.state.battlefield.map((card, i) => (
                                <Draggable draggableId={'' + i + 'battlefield'} index={i}>
                                    {(provider) => (

                                        <Box
                                            {...provider.draggableProps}
                                            {...provider.dragHandleProps}
                                            ref={provider.innerRef}
                                            key={i}
                                            sx={{ width: '150px', transform: card.isTapped ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                                            <MagicCard card={card} onClick={() => onCardClick(card)}/>
                                        </Box>
                                    )}
                                </Draggable>)
                            )}
                            {provided.placeholder}
                        </Flex>
                    )}
                </Droppable>
        </Box >
    )
}
