import React, { useState } from 'react'
import { Box, Flex, Card, IconButton, Text, Button } from 'theme-ui'
import Modal from '../Modal.js'
import Stages from '../Stages'
import DecksSearchBar from '../Decks/DecksSearchBar'
import { useQuery } from '@apollo/react-hooks'
import queries from '../../queries/index.js'

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

const CardPage = ({ scryfallId, onClose }) => {

    const { error, data } = useQuery(queries.GET_ME)
    return (
        <Stages initialStage={0}>
            {({ onNext }) =>
                <Box variant="vCentering">

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
                                <Button onClick={onNext}>Add to deck</Button>
                            </Flex>
                        </Flex>
                    </Card>
                </Box>
            }
            {({ onBack, onNext }) =>
                <Box variant="vCentering">
                    <Card>
                        <Text sx={{ fontSize: 2 }}>Add to deck</Text>
                        <Box py={2} />
                        <DecksSearchBar decks={data.me.decks} variant="inputTiny">
                            {decks => decks.map(deck => <Box py={2}>{deck.name}</Box>)
                            }
                        </DecksSearchBar>
                        <Flex sx={{ justifyContent: 'space-between' }}>
                            <Button onClick={onBack}>Cancel</Button>
                            <Button onClick={onNext}>Add</Button>
                        </Flex>
                    </Card>
                </Box>

            }
        </Stages>
    )
}

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