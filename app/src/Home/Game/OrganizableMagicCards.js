import React, { useState } from 'react'
import { Flex, Box } from 'theme-ui'
import { Droppable, Draggable } from "react-beautiful-dnd";
import CombinedMagicCard from './CombinedMagicCard'

const OrganizableMagicCards = ({ cards, children, droppableId }) => {
    const [isDragDisabled, setIsDragDisable] = useState(false)
    return (
        <Droppable droppableId={droppableId} direction="horizontal" isCombineEnabled={true}>
            {(provided) => (
                <Flex
                    sx={{ flexDirection: 'row', overflowX: 'auto', flexGrow: 1 }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {cards.map((card, i) => (
                        <Draggable draggableId={card.uid} index={i} key={card.uid} isDragDisabled={isDragDisabled} >
                            {(provider, shapshot) => (
                                <Box
                                    {...provider.draggableProps}
                                    {...provider.dragHandleProps}
                                    ref={provider.innerRef}
                                    sx={{ minWidth: '150px', width: '150px' }}
                                    px={1}
                                    >
                                    <CombinedMagicCard
                                        setIsDragDisable={setIsDragDisable}
                                        i={i}
                                        {...shapshot}
                                        card={card}>
                                        {children}
                                    </CombinedMagicCard>
                                </Box>
                            )}
                        </Draggable>)
                    )}
                    {provided.placeholder}
                </Flex>
            )}
        </Droppable>
    )
}

export default OrganizableMagicCards