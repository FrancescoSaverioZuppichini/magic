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

// const MagicCardImg = ({ scryfallId, onClick, width = '100%', height = 'auto' }) => (
//     <img src={`/cards/${scryfallId}.jpg`} width={width} height={height} style={{ borderRadius: '4%' }}
//         onClick={onClick}></img>
// )



const CardPage = ({ id, name, scryfallId, onClose, children }) => (
    <Box variant="vCentering">
        <Card>
            <Flex sx={{ flexDirection: 'column' }}>
                <Flex>
                    <Box variant='spacer' />
                    <Button onClick={onClose}>Close</Button>
                </Flex>
                <Box p={2} />
                <MagicCard scryfallId={scryfallId} />
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

const MagicCardImg = ({ scryfallId }) => (
    <img width='100%' src={`/cards/${scryfallId}.jpg`} />

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

const MagicCardActions = ({ children }) => {

    return (
        <Box>
            {children}
        </Box>
    )
}

const AddToDeckMagiCardAction = ({ scryfallId, id, name }) => {
    const [isAdding, setIsAdding] = useState(false)
    const onClose = () => setIsAdding(false)
    const onClick = () => setIsAdding(true)

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


    return (
        <Box>
            <Button onClick={onClick} variant='action'>
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

const ZoomMagiCardAction = ({ scryfallId, id, name, children }) => {
    const [isZooming, setIsZooming] = useState(false)
    const onClose = () => setIsZooming(false)
    const onClick = () => setIsZooming(true)

    return (
        <Box>
            <IconButton onClick={onClick}>
                <img height='48px' src='/zoom_in-white-18dp.svg'></img>
            </IconButton>
            <Modal active={isZooming} position={'fixed'} variant='vCentering'>
                {children ? children : <CardPage id={id} scryfallId={scryfallId} name={name} onClose={onClose} />}
            </Modal>
        </Box>
    )
}

const MagicCard = (props) => (
    <Card variant='tiny'>
        {/* <MagicCardHeader {...props} />
        <Box py={1} /> */}
        <MagicCardImg {...props} />
        {/* <MagicCardText {...props} /> */}
        <MagicCardActions>
            {props.actions && props.actions(props)}
        </MagicCardActions>
    </Card>
)


const ZommableMagicCard = (props) => (
    <MagicCard {...props} actions={() => <Box>
        {props.actions}
        <ZoomMagiCardAction {...props}>
            {props.children}
        </ZoomMagiCardAction>
    </Box>
    }>
    </MagicCard>
)

export { MagicCard, MagicCardZoom, MagicCardImg, CardPage, ZommableMagicCard, AddToDeckMagiCardAction, ZoomMagiCardAction }