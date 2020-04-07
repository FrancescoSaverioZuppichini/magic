import React, { useState } from 'react'
import { Box, Flex, Card, IconButton } from 'theme-ui'

// TODO would be better to go to the next if clicked
const MagicCardZoom = ({ scryfallId, onClose }) => (
    <Flex sx={{
        position: 'absolute',
        top: 0, left: 0,
        zIndex: 99, width: '100vw', height: '100vh', flexDirection: 'row', bg: 'rgba(244, 244, 244, 0.8)'
    }}>
        <Box variant="spacer" onClick={onClose} />
        <Box sx={{ width: ['100vw', '50%'] }}>
            <Card>
                <IconButton onClick={onClose}>
                    <img height='24px' src='/close-black-18dp.svg'></img>
                </IconButton>
                <img src={`cards/${scryfallId}.jpg`} width='100%'></img>
            </Card>
        </Box>
        <Box variant="spacer" onClick={onClose} />
    </Flex>
)

export default function MagicCard({ name, scryfallId }) {
    const [isZooming, setIsZooming] = useState(false)

    return (
        <Card p={2} sx={{ flex: '1', flexBasis: '200px' }}>
            <img src={`cards/${scryfallId}.jpg`} width='200px'
                onClick={() => setIsZooming(true)}></img>
            {isZooming && <MagicCardZoom
                scryfallId={scryfallId}
                onClose={() => setIsZooming(false)}
            />}
        </Card>
    )
}
