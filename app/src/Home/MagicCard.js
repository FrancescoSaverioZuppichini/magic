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
    <img src={`cards/${scryfallId}.jpg`} width='100%' style={{ borderRadius: '4%' }}
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

const MagicCard = ({ name, scryfallId, id, upControllers, downControllers, isZoomable = false, variant = 'primary' }) => {
    const [isZooming, setIsZooming] = useState(false)
    return (
        <Card p={2} sx={{ flex: '1', flexBasis: '200px' }} variant={variant}>
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

export { MagicCard, MagicCardZoom, MagicCardImg, WithControllers }