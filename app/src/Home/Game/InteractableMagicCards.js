import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'

const MagicCardsZoom = ({ cards }) => {

}

const MagicCardsFolder = ({ cards }) => {

}

export default function InteractableMagicCards({ cards,  children, id }) {
    // const [cards, setCards] = useState(cards)

    // const onDragEnd = ({ source, destination, combine }) => {
    //     console.log(combine)
    //     if (destination) {
    //         if (source.droppableId === destination.droppableId) {
    //             // game.swap(source.index, destination.index, destination.droppableId)
    //         }
    //     }
    // }

    return (
            <Droppable droppableId={id}
                direction="horizontal"
                isCombineEnabled={true}>
                {(provided) => (
                    <Flex key={'0'}
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {cards.map((card, i) => (
                            <Draggable draggableId={'' + i} index={i}>
                                {(provider) => (
                                    <Box
                                        {...provider.draggableProps}
                                        {...provider.dragHandleProps}
                                        ref={provider.innerRef}
                                        key={i}>
                                        {children(card)}
                                    </Box>
                                )}
                            </Draggable>)
                        )}
                        {provided.placeholder}

                    </Flex>)
                }
            </Droppable>

    )
}
