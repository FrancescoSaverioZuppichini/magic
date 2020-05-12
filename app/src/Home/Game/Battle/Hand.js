import React, { useState } from 'react'
import { Card, Text, Flex, Box, Button, Slider } from 'theme-ui'
import GameMagicCard from './SelectableMagicCard'
import OrganizableMagicCards from './OrganizableMagicCards'
import { Droppable, Draggable } from "react-beautiful-dnd";
import Modal from '../../Modal'
import { MagicCard } from '../../MagicCards/MagicCard'
import uniqid from 'uniqid'

const DeckFromHand = ({ deck, onClose, game }) => {
    const [idx, setIdx] = useState(0)
    const deckLength = deck.cards.length

    const onPrev = () => setIdx(idx < 1 ? deckLength - 1 : idx - 1)
    const onNext = () => setIdx(idx === deckLength - 1 ? 0 : idx + 1)
    const onPick = () => {
        // copy old card, avoiding pending references
        let card = { ...deck.cards[idx] }
        card.uid = uniqid()
        const hand = [...game.state.hand, card]
        deck.cards.splice(idx, 1)
        onNext()
        game.setState({ hand, deck })
    }
    const onSliderChange = (el) => setIdx(Number(el.target.value))

    return (
        <Box variant="vCentering">
            <Card>
                <Flex sx={{ flexDirection: 'column' }}>
                    <Flex>
                        <Box variant='spacer' />
                        <Button onClick={onClose}>Close</Button>
                    </Flex>
                    <Box p={2} />
                    <Flex sx={{ flexDirection: 'column' }}>
                        <Flex sx={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text px={1}>{idx}</Text>
                            <Slider
                                sx={{ width: '90%' }}
                                onChange={onSliderChange}
                                min={0}
                                max={deckLength - 1}
                                value={idx}
                                step={1}
                            />
                            <Text px={1}>{deckLength - 1}</Text>
                        </Flex>
                        <MagicCard card={deck.cards[idx]} />
                    </Flex>
                    <Flex sx={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button onClick={onPrev} variant='outline'>Prev</Button>
                        <Box px={1} />
                        <Button onClick={onPick}>Pick</Button>
                        <Box px={1} />
                        <Button onClick={onNext} variant='outline'>Next</Button>
                    </Flex>
                </Flex>

            </Card>
        </Box>
    )
}

// https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
export default function Hand({ game, onCardClick, selectedCard }) {
    const [isHiding, setIsHiding] = useState(false)
    const [openDeck, setOpenDeck] = useState(false)

    return (
        <Box>
            <Modal active={openDeck}>
                <DeckFromHand
                    deck={game.state.deck}
                    game={game}
                    onClose={() => setOpenDeck(false)}
                />
            </Modal>
            <Box sx={{ position: 'relative' }}>
                {isHiding ?
                    // button to show the hand
                    <Flex sx={{ justifyContent: 'flex-end' }} pb={2} pl={2}>
                        <Button onClick={() => setIsHiding(false)} variant='primary'>Deck</Button>
                    </Flex>
                    :
                    // hand
                    <Card>
                        <Flex sx={{ flexDirection: ['column', 'column', 'column'] }}>
                            <OrganizableMagicCards cards={game.state.hand} droppableId='hand'>
                                {card => (
                                    <GameMagicCard {...card} onClick={() => onCardClick(card)}
                                        selected={selectedCard.uid === card.uid} />)}
                            </OrganizableMagicCards>
                            <Flex sx={{
                                flexDirection: ['row', 'row', 'row'],
                                justifyContent: 'space-between',
                                alignItems: 'center', flex: 1
                            }}>
                                <Box>
                                    <Button onClick={() => setOpenDeck(true)}>{game.state.deck.cards.length} deck </Button>
                                </Box>
                                <Flex pt={1}>
                                    <Button onClick={() => setIsHiding(true)} variant='outline'>Hide</Button>
                                    <Box px={1} />
                                    {game.state.deck.cards.length > 0 && <Button onClick={() => game.pickACard()}>Pick</Button>}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>}
            </Box>
        </Box>

    )
}
