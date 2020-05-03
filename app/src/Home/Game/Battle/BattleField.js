import React, { useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import { MagicCardImg, ZoomMagiCardAction, CardPage } from '../../MagicCards/MagicCard'
import { Droppable, Draggable } from "react-beautiful-dnd";
import OrganizableMagicCards from './OrganizableMagicCards'

const BattleFieldMagicCard = ({ provider, card, onCardClick, selectedCard }) => (
    <Flex
        p={1}
        sx={{ width: '150', transform: card.isTapped ? 'rotate(90deg) scale(0.75)' : 'rotate(0deg)'}}>
        <MagicCardImg {...card} onClick={() => onCardClick(card)} />
    </Flex>
)
// https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
export default function Battlefield({ game, onCardClick }) {

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
