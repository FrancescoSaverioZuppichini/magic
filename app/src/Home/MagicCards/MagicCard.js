import React, { useState } from 'react'
import { Box, Flex, Card, IconButton, Text, Button } from 'theme-ui'
import Modal from '../Modal.js'
// TODO would be better to go to the next if clicked
const MagicCardZoom = ({ scryfallId, onClose, active }) => (
    <Modal active={active}>
        <Card sx={{ width: ['100%', '50%'] }}>
            <Button onClick={onClose}>Close</Button>
            <MagicCardImg scryfallId={scryfallId} />
        </Card>
    </Modal>
)

const MagicCardRow = ({ name, colors, convertedManaCost }) => <Flex sx={{ flexDirection: 'row' }}><Text>{name}</Text><Text>{colors}</Text><Text>convertedManaCost</Text></Flex>

const MagicCardImg = ({ scryfallId, onClick, width = '100%', height = 'auto' }) => (
    <img src={`/cards/${scryfallId}.jpg`} width={width} height={height} style={{ borderRadius: '4%' }}
        onClick={onClick}></img>
)
// REVIEW not working
const WithControllers = (props) => (
    <Card sx={{ bg: 'primary', borderRadius: '4%' }}>
        {props.upControllers && <Card sx={{ borderRadius: '8%' }}>
            {props.upControllers}
        </Card>}
        {props.children}
        {props.downControllers && <Card sx={{ borderRadius: '8%' }}>
            {props.downControllers}
        </Card>}
    </Card>
)

const CardPage = ({ scryfallId, onClose }) => (
    <Card>
        <Flex sx={{ flexDirection: 'column' }}>
            <Flex>
                <Box variant='spacer' />
                <Button onClick={onClose}>Close</Button>
            </Flex>
            <Box p={2} />
            <MagicCard scryfallId={scryfallId} />
            <Box p={2} />
            <Flex sx={{ justifyContent: 'center' }}>
                <Button>Add to deck</Button>
            </Flex>
        </Flex>
    </Card>
)

const MagicCard = ({ name, sx, scryfallId, id, upControllers, downControllers, isZoomable = false, variant = 'primary', addable = true }) => {
    const [isZooming, setIsZooming] = useState(false)
    return (
        <Box sx={sx}>
            <MagicCardImg onClick={() => setIsZooming(true)} scryfallId={scryfallId}>
            </MagicCardImg>
            {isZoomable && <Modal active={isZooming} position={'fixed'} variant='vCentering'>
                <CardPage scryfallId={scryfallId} onClose={() => setIsZooming(false)} />
            </Modal>}
        </Box>
    )
}

export { MagicCard, MagicCardZoom, MagicCardImg, WithControllers }