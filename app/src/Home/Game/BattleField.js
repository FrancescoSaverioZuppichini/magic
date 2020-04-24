import React, { useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import { MagicCardImg, ZoomMagiCardAction, CardPage } from '../MagicCards/MagicCard'
import Modal from '../Modal.js'
import { Droppable, Draggable } from "react-beautiful-dnd";

const BattleFieldMagicCard = ({ provider, card, onCardClick, selectedCard }) => (
    <Flex
        p={1}
        {...provider.draggableProps}
        {...provider.dragHandleProps}
        ref={provider.innerRef}
        sx={{minWidth: '100px', transform: card.isTapped ? 'rotate(90deg)' : 'rotate(0deg)', justifyContent: 'center' }}>
        <MagicCardImg {...card} onClick={() => onCardClick(card)} />
    </Flex>
)
// https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
export default function InGameDeck({ game, onCardClick }) {
    const [isHiding, setIsHiding] = useState(false)

    return (
        <Flex sx={{ width: '100%' }}>
            <Droppable droppableId={'battlefield'} direction="horizontal">
                {(provided) => (
                    <Flex key={0}
                        sx={{ flexDirection: 'row', overflow: 'auto'}}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {game.state.battlefield.map((card, i) => (
                            <Draggable draggableId={'' + i + 'battlefield'} index={i}>
                                {(provider) => <BattleFieldMagicCard
                                    key={i}
                                    provider={provider}
                                    card={card}
                                    onCardClick={onCardClick} />}
                            </Draggable>)
                        )}
                        {provided.placeholder}
                    </Flex>
                )}
            </Droppable>
        </Flex >
    )
}
