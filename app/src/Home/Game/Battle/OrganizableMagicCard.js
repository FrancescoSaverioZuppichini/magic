import React, { useState, useEffect } from 'react'
import { Card, Flex, Box, Text } from 'theme-ui'
import { Droppable, Draggable } from "react-beautiful-dnd";
import { GroupPreviewMagicCard } from '../../MagicCards/OrganizedMagicCard'

const OrganizableMagicCardZoom = ({ cards, children, droppableId }) => (
    /**
     * This component shows all the combines cards as a popup and allows the user to reorganize them
     */
    <Card sx={{ position: 'absolute', top: '-200px', zIndex: 99 }} variant='tiny'>
        <Droppable droppableId={droppableId} direction="horizontal" isCombineEnabled={true}>
            {(provided) => (
                <Flex
                    {...provided.droppableProps}
                    ref={provided.innerRef} >
                    {cards.map((card, i) =>
                        <Draggable draggableId={card.uid} index={i} key={card.uid} >
                            {(provider, shapshot) => (
                                <Box p={1} key={i} sx={{ width: '150px' }}
                                    {...provider.draggableProps}
                                    {...provider.dragHandleProps}
                                    ref={provider.innerRef}
                                >{children(card, cards)}</Box>
                            )}
                        </Draggable>)}
                    {provided.placeholder}
                </Flex>
            )}
        </Droppable>
    </Card>
)

const OrganizableMagicCard = ({ card, children, innerRef, isDragging }) => {
    const [zoom, setZooom] = useState(false)
    const onClick = () => setZooom(!zoom)
    useEffect(() => setZooom(zoom && !isDragging), [isDragging])

    return (
        <Box ref={innerRef} sx={{ height: '100%' }} >{card.cards ? (
            card.cards.length > 1 ?
            <Box>
                <GroupPreviewMagicCard cards={card.cards} children={children} onClick={onClick} />
                {zoom && <OrganizableMagicCardZoom cards={card.cards} children={children} droppableId={card.uid} />}
            </Box> : children(card.cards[0]))
            : children(card)
        }
        </Box>
    )
}

export default OrganizableMagicCard