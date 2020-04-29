import React, { useState, useEffect } from 'react'
import { Card, Flex, Box, Text } from 'theme-ui'
import { MagicCardImg } from '../MagicCards/MagicCard'

const MagicCardsFolder = ({ cards, children, onClick }) => (
    <Flex sx={{ flexDirection: 'row', flexWrap: 'wrap', position: 'relative', height: '100%' }} onClick={onClick}>
        {cards.slice(0, 4).map((card, i) =>
            <Box p={1} key={i} sx={{ width: '50%', opacity: 0.6 }}>
                <MagicCardImg {...card} key={i} />
            </Box>)}
        <Flex sx={{
            position: 'absolute', width: '100%', height: '100%',
            justifyContent: 'center', alignItems: 'center'
        }}>
            <Text sx={{ fontSize: 5 }}>{cards.length}</Text>
        </Flex>

    </Flex>
)

const CombinedMagicCardZoom = ({ cards, children }) => (
    <Card sx={{ position: 'absolute', top: '-200px', zIndex: 99 }} variant='tiny'>
        <Flex >
            {cards.map((card , i) => <Box p={1} key={i} sx={{ width: '150px' }}>{children(card)}</Box>)}
        </Flex>
    </Card>
)

const CombinedMagicCard = ({ card, children, innerRef, isDragging }) => {
    const [zoom, setZooom] = useState(false)
    const onClick = () => setZooom(!zoom)
    useEffect(() => setZooom(zoom && !isDragging), [isDragging])
    return (
        <Box ref={innerRef} sx={{ height: '100%' }} >{card.length > 0 ?
            <Box>
                <MagicCardsFolder cards={card} children={children} onClick={onClick} />
                {zoom && <CombinedMagicCardZoom cards={card} children={children} />}
            </Box>
            : children(card)
        }
        </Box>
    )
}

export default CombinedMagicCard