
import React, { useState, useEffect } from 'react'
import { Card, Flex, Box, Text } from 'theme-ui'
import { MagicCardImg } from './MagicCard'

const GroupPreviewMagicCard = ({ cards, children, onClick }) => (
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

const OrganizedMagicCardZoom = ({ cards, children }) => (
    /**
     * This component shows all the combines cards as a popup
     */
    <Card sx={{ position: 'absolute', top: '-200px', zIndex: 99 }} variant='tiny'>
        <Flex>
            {cards.map((card, i) =>
                <Box p={1} key={i} sx={{ width: '150px' }}>
                    {children(card, cards)}
                </Box>
            )}
        </Flex>
    </Card>
)

const OrganizedMagicCard = ({ card, children, innerRef, isDragging }) => {
    const [zoom, setZooom] = useState(false)
    const onClick = () => setZooom(!zoom)
    useEffect(() => setZooom(zoom && !isDragging), [isDragging])

    return (
        <Box ref={innerRef} sx={{ height: '100%' }} >{card.cards ? (
            card.cards.length > 1 ?
            <Box>
                <GroupPreviewMagicCard cards={card.cards} children={children} onClick={onClick} />
                {zoom && <OrganizedMagicCardZoom cards={card.cards} children={children} droppableId={card.uid} />}
            </Box> : children(card.cards[0]))
            : children(card)
        }
        </Box>
    )
}

export { OrganizedMagicCard, OrganizedMagicCardZoom, GroupPreviewMagicCard }