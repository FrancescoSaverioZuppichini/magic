import React, { useState } from 'react'
import { Card, Text, Flex, Box, Button } from 'theme-ui'
import GameMagicCard from './SelectableMagicCard'
import OrganizableMagicCards from './OrganizableMagicCards'
import { Droppable, Draggable } from "react-beautiful-dnd";
import Modal from '../../Modal'
import DeckFromHand from './DeckFromHand'
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
                                    <Button onClick={() => setIsHiding(true)} variant='outline'>Hide</Button>
                                </Box>
                                <Flex pt={1}>
                                    <Button onClick={() => setOpenDeck(true)}>{game.state.deck.cards.length} deck </Button>
                                    <Box px={1} />
                                    <Button onClick={() => game.shuffle()}>Shuffle</Button>
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
