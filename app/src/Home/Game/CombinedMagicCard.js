import React, { useState, useEffect } from 'react'
import { Card, Flex, Box, Text } from 'theme-ui'
import { MagicCardImg } from '../MagicCards/MagicCard'
import { Droppable, Draggable } from "react-beautiful-dnd";
import Tooltip from 'rc-tooltip'

const GroupPreviewMagicCards = ({ cards, children, onClick }) => (
    /**
     * This compoenent shows a preview of the cards in the group
     */
    <Flex sx={{ flexDirection: 'row', flexWrap: 'wrap', position: 'relative', height: '100%' }} onClick={onClick}>
        {cards.slice(0, 4).map((card, i) =>
            <Box p={1} key={i} sx={{ width: '50%', opacity: 0.6 }}>
                <MagicCardImg {...card} key={i} />
            </Box>
        )}
        <Flex sx={{
            position: 'absolute', width: '100%', height: '100%',
            justifyContent: 'center', alignItems: 'center'
        }}>
            <Text sx={{ fontSize: 5 }}>{cards.length}</Text>
        </Flex>

    </Flex>
)

const CombinedMagicCardZoom = ({ cards, children, droppableId }) => (
    /**
     * This component shows all the combines cards as a popup
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

const CombinedMagicCard = ({ card, children, innerRef, isDragging }) => {
    const [zoom, setZooom] = useState(false)
    const onClick = () => setZooom(!zoom)
    useEffect(() => setZooom(zoom && !isDragging), [isDragging])

    return (
        <Box ref={innerRef} sx={{ height: '100%' }} >{card.length > 1 ?
            <Box>
                <GroupPreviewMagicCards cards={card} children={children} onClick={onClick} />
                {zoom && <CombinedMagicCardZoom cards={card} children={children} droppableId={card.uid} />}
            </Box>
            : children(card.length === 1 ? card[0] : card)
        }
        </Box>
    )
}

export default CombinedMagicCard