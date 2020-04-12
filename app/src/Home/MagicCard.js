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

const MagicCardImg = ({ scryfallId, onClick, width='100%', height='auto'  }) => (
    <img src={`/cards/${scryfallId}.jpg`} width={width} height={height} style={{ borderRadius: '4%' }}
        onClick={onClick}></img>
)
// REVIEW not working
const WithControllers = (props) => (
    <Card  sx={{ bg: 'primary', borderRadius: '4%'  }}>
        {props.upControllers && <Card sx={{  borderRadius: '8%' }}>
            {props.upControllers}
        </Card>}
        {props.children}
        {props.downControllers && <Card sx={{  borderRadius: '8%' }}>
            {props.downControllers}
        </Card>}
    </Card>
)

const MagicCard = ({ name, sx, scryfallId, id, upControllers, downControllers, isZoomable = false, variant = 'primary' }) => {
    const [isZooming, setIsZooming] = useState(false)
    return (
        <Box sx={sx}>
            <MagicCardImg onClick={() => setIsZooming(true)} scryfallId={scryfallId}>
            </MagicCardImg>
            {isZoomable && <Modal active={isZooming} position={'fixed'}>
                <Box>
                    <IconButton onClick={() => setIsZooming(false)} variant="close">
                        <img height='100%' src='/close-black-18dp.svg'></img>
                    </IconButton>
                    <MagicCard scryfallId={scryfallId} />
                </Box>
            </Modal>}
            </Box>
    )
}

export { MagicCard, MagicCardZoom, MagicCardImg, WithControllers }