import React, { useState } from 'react'
import { Box, Flex, Card, IconButton } from 'theme-ui'
import Modal from './Modal.js'
// TODO would be better to go to the next if clicked
const MagicCardZoom = ({ scryfallId, onClose, active }) => (
    <Modal active={active}>
        <Card sx={{ width: ['100%', '50%'] }}>
            <IconButton onClick={onClose}>
                <img height='24px' src='/close-black-18dp.svg'></img>
            </IconButton>
            <MagicCardImg scryfallId={scryfallId} />
        </Card>
    </Modal>
)

const MagicCardImg = ({ scryfallId, onClick }) => (
    <img style={{ borderRadius: '16px' }} src={`cards/${scryfallId}.jpg`} width='100%'
        onClick={onClick}></img>
)

const MagicCard = ({ name, scryfallId, id, upControllers, downControllers, isZoomable = false }) => {
    const [isZooming, setIsZooming] = useState(false)
    return (
        <Card p={2} sx={{ flex: '1', flexBasis: '200px' }}>
            <MagicCardImg onClick={() => setIsZooming(true)} scryfallId={scryfallId} />
            {isZoomable && <Modal active={isZooming}>
                <Box>
                    <IconButton onClick={() => setIsZooming(false)}>
                        <img height='24px' src='/close-black-18dp.svg'></img>
                    </IconButton>
                    <MagicCard scryfallId={scryfallId} />
                </Box>
            </Modal>}
        </Card>
    )
}

export { MagicCard, MagicCardZoom, MagicCardImg }