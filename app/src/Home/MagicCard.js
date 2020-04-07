import React, { useState } from 'react'
import { Box, Flex, Card, IconButton } from 'theme-ui'
import Modal from './Modal.js'
// TODO would be better to go to the next if clicked
const MagicCardZoom = ({ scryfallId, onClose, active }) => (
    <Modal active={active}>
                <Card sx={{ width: ['100%', '50%']}}>
                    <IconButton onClick={onClose}>
                        <img height='24px' src='/close-black-18dp.svg'></img>
                    </IconButton>
                    <img src={`cards/${scryfallId}.jpg`} style={{borderRadius: '16px'}}  width='100%'></img>
                </Card>
    </Modal>
)

export default function MagicCard({ name, scryfallId, }) {
    const [isZooming, setIsZooming] = useState(false)

    return (
        <Card p={2} sx={{ flex: '1', flexBasis: '200px' }}>
            <img style={{borderRadius: '16px'}} src={`cards/${scryfallId}.jpg`} width='200px'
                onClick={() => setIsZooming(true)}></img>
            <MagicCardZoom
                active={isZooming}
                scryfallId={scryfallId}
                onClose={() => setIsZooming(false)}
            />
        </Card>
    )
}
