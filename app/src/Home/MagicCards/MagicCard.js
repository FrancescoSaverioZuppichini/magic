import React, { useState } from 'react'
import { Box, Flex, Card, IconButton, Text, Button, Slider } from 'theme-ui'
import Modal from '../Modal.js'
import Stages from '../Stages'
import DecksSearchBar from '../Decks/DecksSearchBar'
import { useQuery, useMutation } from '@apollo/react-hooks'
import queries from '../../queries/index.js'
import mutations from '../../mutations/index.js'

import DeckRow from '../Decks/DeckRow'


const MagicCardRow = ({ name, colors, convertedManaCost }) => <Flex sx={{ flexDirection: 'row' }}><Text>{name}</Text><Text>{colors}</Text><Text>convertedManaCost</Text></Flex>



const CardPage = ({ id, name, scryfallId, onClose, children }) => (
    /**
     * Single cards highlighted
     */
    <Box variant="vCentering">
        <Card>
            <Flex sx={{ flexDirection: 'column' }}>
                <Flex>
                    <Box variant='spacer' />
                    <Button onClick={onClose}>Close</Button>
                </Flex>
                <Box p={2} />
                <MagicCard card={{ scryfallId }} />
                {children && <Box pt={2}>{children}</Box>}
            </Flex>
        </Card>
    </Box>
)

const MagicCardMana = ({ manaCost }) => {
    const URL = 'https://img.scryfall.com/symbology'
    const parsedManaCost = manaCost[0].split('}').join('').split('{').filter(el => el !== "")

    return (
        <Flex>
            {parsedManaCost.map(mana => <Box px={1}>
                <img width='20px' height='20px' src={`${URL}/${mana}.svg`} />
            </Box>)}
        </Flex>
    )
}

const MagicCardHeader = ({ name, manaCost }) => (
    <Flex sx={{ justifyContent: 'space-between' }}>
        <Text sx={{ fontSize: 2 }}>{name}</Text>
        {manaCost && <MagicCardMana manaCost={manaCost} />}
    </Flex>
)

const MagicCardImg = ({ scryfallId, onClick }) => (
    <img width='100%' height='auto' src={`/cards/${scryfallId}.jpg`} onClick={onClick} />

)

const MagicCardText = ({ types, subtypes, artist, text, power, life, toughness }) => (
    <Box>
        <Flex>
            <Text sx={{ fontSize: 1, fontWeight: 'bold' }}>{types.join()}</Text>
            <Box px={1} />
            {subtypes.length > 0 && <Text sx={{ fontSize: 1 }}>{subtypes.join().replace(',', ' ')}</Text>}
        </Flex>
        <Box py={2} />
        <Text sx={{ fontSize: 1, fontWeight: 'thin' }}>{text}</Text>
        <Flex sx={{ justifyContent: 'flex-end' }}>
            {(power && toughness) && <MagicCardStats power={power} toughness={toughness} />}
        </Flex>
    </Box>
)

const MagicCardStats = ({ power = '-', toughness = '-' }) => (
    <Box>
        <Text sx={{ fontSize: 2 }}>{`${power}/${toughness}`}</Text>
    </Box>
)
// TODO better to pass card!
const AddToDeckMagiCardAction = ({ scryfallId, id, name, variant, selectedDecks = [] }) => {
    /**
     * Button for adding a cards to different decks.
     */
    const [isAdding, setIsAdding] = useState(false)
    const onClose = () => setIsAdding(false)
    const onClick = () => setIsAdding(true)

    const [decksSelected, setDeckSelected] = useState(selectedDecks)
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
            deck.cards.push({ id, scryfallId })
        }
        const deckInput = { id: deck.id, cards: deck.cards.map(c => c.id), name: deck.name }
        return newDeck({ variables: { deck: deckInput } })
    }
    const onAdd = () => {
        const updates = decksSelected.map(AddAndMutate)
        Promise.all(updates)
    }


    return (
        <Box>
            <Button onClick={onClick} variant={variant || 'action'}>
                Add
            </Button>
            <Modal active={isAdding} position={'fixed'} variant='vCentering'>
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
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onAdd}>Add</Button>
                    </Flex>
                </Card>
            </Modal>
        </Box>
    )
}

const AddToDeckMagiCardsAction = ({ cards, selectedDecks = [], variant, onDone }) => {
    /**
     * Button for adding a cards to different decks.
     */
    const [isAdding, setIsAdding] = useState(false)
    const onClose = () => setIsAdding(false)
    const onClick = () => setIsAdding(true)

    const [decksSelected, setDeckSelected] = useState(selectedDecks)

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

    const AddAndMutate = (deck) => {
        const cardsIDs = [...deck.cards.map(c => c.id), ...cards.map(c => c.id)]
        const deckInput = { id: deck.id, cards: cardsIDs, name: deck.name }
        return newDeck({ variables: { deck: deckInput } })
    }
    const onAdd = () => {
        const updates = decksSelected.map(AddAndMutate)
        Promise.all(updates)
        onDone()

    }

    return (
        <Box>
            <Button onClick={onClick} variant={variant || 'action'}>
                Add
            </Button>
            <Modal active={isAdding} position={'fixed'} variant='vCentering'>
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
                    {decksSelected.length > 0 && <Text pt={2}>{`Add ${cards.length} cards to ${decksSelected.length} decks`}</Text>}
                    <Flex pt={4} sx={{ justifyContent: 'space-between' }}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onAdd}>Add</Button>
                    </Flex>
                </Card>
            </Modal>
        </Box>
    )
}

const ZoomMagiCardAction = ({ scryfallId, id, name, children }) => {
    /**
     * Button for zooming on a card.
     */
    const [isZooming, setIsZooming] = useState(false)
    const onClose = () => setIsZooming(false)
    const onClick = () => setIsZooming(true)

    return (
        <Box>
            <IconButton onClick={onClick} sx={{ width: '38px' }}>
                <img width='38px' src='/zoom_in-white-18dp.svg'></img>
            </IconButton>
            <Modal active={isZooming} position={'fixed'} variant='vCentering'>
                {children ? children(onClose) : <CardPage {... { scryfallId, id, name }} onClose={onClose} />}
            </Modal>
        </Box>
    )
}

const MagicCardActions = ({ children }) => {

    return (
        <Box>
            {children}
        </Box>
    )
}


const MagicCard = (props) => (
    <Card variant={props.variant || 'tiny'}>
        {/* <MagicCardHeader {...props} />
        <Box py={1} /> */}
        <MagicCardImg {...props.card} onClick={props.onClick} />
        {/* <MagicCardText {...props} /> */}
        <MagicCardActions>
            {props.actions && props.actions(props.card)}
        </MagicCardActions>
    </Card>
)

export { MagicCard, MagicCardImg, CardPage, AddToDeckMagiCardAction, ZoomMagiCardAction, AddToDeckMagiCardsAction }