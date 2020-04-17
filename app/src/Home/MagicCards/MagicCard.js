import React, { useState } from 'react'
import { Box, Flex, Card, IconButton, Text, Button, Slider } from 'theme-ui'
import Modal from '../Modal.js'
import Stages from '../Stages'
import DecksSearchBar from '../Decks/DecksSearchBar'
import { useQuery, useMutation } from '@apollo/react-hooks'
import queries from '../../queries/index.js'
import mutations from '../../mutations/index.js'

import DeckRow from '../Decks/DeckRow'

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

const CardPage = ({ id, name, scryfallId, onClose }) => {
    const [decksSelected, setDeckSelected] = useState([])
    const [numberOfCards, setNumberOfCards] = useState(1)

    const { error, data } = useQuery(queries.GET_ME)
    const [newDeck, { newDeckError }] = useMutation(mutations.NEW_DECK, {
        onCompleted() {
            onClose()
        },

    })

    const isDeckSelected = (deck) => decksSelected.filter(d => d.id === deck.id).length > 0

    const onDeckRowClick = (deck) => {
        /**
         * Add or remove the clicked deck from `decksSelected`
         */
        if (isDeckSelected(deck)) setDeckSelected(decksSelected.filter(d => d.id !== deck.id))
        else {
            setDeckSelected([...decksSelected, deck])
        }
    }

    const onSliderChange = (el) => setNumberOfCards(el.target.value)

    const AddAndMutate = (deck) => {
        for (let i = 0; i < numberOfCards; i++) {
            deck.cards.push({ id })
        }
        const deckInput = { id: deck.id, cards: deck.cards.map(c => c.id), name: deck.name }
        return newDeck({ variables: { deck: deckInput } })
    }
    const onAdd = () => {
        const updates = decksSelected.map(AddAndMutate)
        Promise.all(updates)
    }
    console.log(decksSelected)
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
                    <Card sx={{ width: ['100%', '100%', '50%', '450px'] }}>
                        <Text sx={{ fontSize: 2 }}>Add to deck</Text>
                        <Box py={2} />
                        <DecksSearchBar decks={data.me.decks} variant="inputTiny">
                            {decks => <Box mt={2} sx={{ bg: 'background' }}>
                                {decks.map(deck => <Box p={2} key={deck.id}>
                                    <DeckRow deck={deck}
                                        key={deck.id}
                                        onClick={onDeckRowClick}
                                        isSelected={isDeckSelected(deck)} />
                                </Box>)}
                            </Box>
                            }
                        </DecksSearchBar>
                        {decksSelected.length > 0 && <Text pt={2}>{`Add ${numberOfCards} cards to ${decksSelected.length} decks`}</Text>}
                        {decksSelected.length > 0 && <Box>
                            <Box p={1} />
                            <Text sx={{ fontSize: 0 }}>How many?</Text>
                            <Box p={1} />
                            <Slider
                                onChange={onSliderChange}
                                defaultValue={1}
                                min={1}
                                max={10}
                                step={1}
                            />
                        </Box>}
                        <Flex pt={4} sx={{ justifyContent: 'space-between' }}>
                            <Button onClick={onBack}>Cancel</Button>
                            <Button onClick={onAdd}>Add</Button>
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
                <CardPage id={id} scryfallId={scryfallId} name={name} onClose={() => setIsZooming(false)} />
            </Modal>}
        </Box>
    )
}

export { MagicCard, MagicCardZoom, MagicCardImg, WithControllers }