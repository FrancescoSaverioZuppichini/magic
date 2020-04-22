import React, { useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import { MagicCard, ZoomMagiCardAction, CardPage } from '../MagicCards/MagicCard'
import Modal from '../Modal.js'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const InGameDeckActions = ({ }) => (
    <Flex sx={{ justifyContent: 'space-between' }}>
        <Button variant='warning'>Discard</Button>

        <Button>Play</Button>

    </Flex>
)

// https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
export default function InGameDeck({ game }) {
    const [isHiding, setIsHiding] = useState(false)
    const [card, setCard] = useState()
    const [showCardModal, setShowCardModal] = useState(false)

    const onCardClick = (card) => {
        setCard(card)
        setShowCardModal(true)
    }

    const onDragEnd = res => {

    }

    return (
        <Box>
            {isHiding ?
                // button to show the hand
                <Flex sx={{ justifyContent: 'flex-end' }} pb={2} pl={2}>
                    <Button onClick={() => setIsHiding(false)} variant='primary'>Deck</Button>
                </Flex>
                :
                // hand
                <Card>
                    <Flex sx={{ flexDirection: 'column' }}>
                        <DragDropContext>
                            <Droppable droppableId={'inGameDeck'} direction="horizontal">
                                {(provided) => (
                                    <Flex key={0}
                                        sx={{ flexDirection: 'row', overflow: 'auto', flexGrow: 1, justifyContent: 'center' }}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {game.state.hand.map((card, i) => (
                                            <Draggable draggableId={'' + i} index={i}>
                                                {(provider) => (

                                                    <Box
                                                        {...provider.draggableProps}
                                                        {...provider.dragHandleProps}
                                                        ref={provider.innerRef}
                                                        key={i}
                                                        sx={{ maxWidth: '225px', minWidth: '150px' }}>
                                                        <MagicCard card={card} onClick={() => onCardClick(card)} />
                                                    </Box>
                                                )}
                                            </Draggable>)
                                        )}
                                        {provided.placeholder}
                                    </Flex>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Text>{game.state.deck.cards.length} in deck </Text>
                            </Box>
                            <Flex pt={1}>
                                <Button onClick={() => setIsHiding(true)} variant='outline'>Hide</Button>
                                <Box px={1} />
                                {game.state.deck.cards.length > 0 && <Button onClick={() => game.pickACard()}>Pick</Button>}
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>}
            {/* Show the card modal */}
            {<Modal active={showCardModal}>
                <CardPage {...card} onClose={() => setShowCardModal(false)}>
                    <InGameDeckActions />
                </CardPage>}
               </Modal>}

        </Box>
    )
}
