import React, { useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import { MagicCardImg, ZoomMagiCardAction, CardPage } from '../MagicCards/MagicCard'
import Modal from '../Modal.js'
import { Droppable, Draggable } from "react-beautiful-dnd";
import OrganizableMagicCards from './OrganizableMagicCards'

const BattleFieldMagicCard = ({ provider, card, onCardClick, selectedCard }) => (
    <Flex
        p={1}
        sx={{ minWidth: '100px', transform: card.isTapped ? 'rotate(90deg)' : 'rotate(0deg)', justifyContent: 'center' }}>
        <MagicCardImg {...card} onClick={() => onCardClick(card)} />
    </Flex>
)
// https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
export default function InGameDeck({ game, onCardClick }) {
    const [cards, setCards] = useState(false)

    return (
        <Flex sx={{ width: '100%', flexDirection: 'column' }}>
            <OrganizableMagicCards cards={game.state.battlefield1} droppableId='battlefield1'>
                {card => <BattleFieldMagicCard
                    card={card}
                    onCardClick={onCardClick} />}
            </OrganizableMagicCards> 
            <OrganizableMagicCards cards={game.state.battlefield0} droppableId='battlefield0'>
                {card => <BattleFieldMagicCard
                    card={card}
                    onCardClick={onCardClick} />}
            </OrganizableMagicCards>
        </Flex >
    )
}
