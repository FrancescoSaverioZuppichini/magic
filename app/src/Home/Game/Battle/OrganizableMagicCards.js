import React, { useState } from 'react'
import { Flex, Box } from 'theme-ui'
import { Droppable, Draggable } from "react-beautiful-dnd";
import OrganizableMagicCard from './OrganizableMagicCard'

const OrganizableMagicCards = ({ cards, children, droppableId }) => {
    const [isDragDisabled, setIsDragDisable] = useState(false)
    return (
        <Droppable droppableId={droppableId} direction="horizontal" isCombineEnabled={true}>
            {(provided) => (
                <Box sx={{
                    position: 'relative'
                }}>
                    <Flex
                        sx={{
                            flexDirection: 'row',
                            overflowX: 'auto',
                            flexGrow: 1, minHeight: '200px'
                        }}
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
                                        <OrganizableMagicCard
                                            setIsDragDisable={setIsDragDisable}
                                            i={i}
                                            {...shapshot}
                                            card={card}>
                                            {children}
                                        </OrganizableMagicCard>
                                    </Box>
                                )}
                            </Draggable>)
                        )}
                        {provided.placeholder}

                    </Flex>
                </Box>
            )}
        </Droppable>
    )
}

export default OrganizableMagicCards