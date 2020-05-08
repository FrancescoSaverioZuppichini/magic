import React from 'react'
import { Flex, Box } from 'theme-ui'
import { MagicCardImg, ZoomMagiCardAction, CardPage } from '../../MagicCards/MagicCard'
import { OrganizedMagicCard } from '../../MagicCards/OrganizedMagicCard'

import OrganizableMagicCards from './OrganizableMagicCards'

const BattleFieldMagicCard = ({ provider, card, onCardClick, selectedCard }) => (
    <Flex
        p={1}
        sx={{ width: '150', transform: card.isTapped ? 'rotate(90deg) scale(0.75)' : 'rotate(0deg)' }}>
        <MagicCardImg {...card} onClick={() => onCardClick(card)} />
    </Flex>
)

const EnemyMagicCards = ({ cards, onCardClick }) => (
    <Box sx={{ position: 'relative' }}>
        <Flex
            sx={{
                flexDirection: 'row',
                overflowX: 'auto',
                minHeight: '200px'
            }}>
            {cards.map(card =>
                <Box sx={{ minWidth: '150px', width: '150px' }} key={card.uid}>
                    <OrganizedMagicCard
                        card={card}>
                        {card => <Box sx={{ minWidth: '150px', width: '150px' }}
                            px={1}> <BattleFieldMagicCard card={card} onCardClick={onCardClick}/></Box>}
                    </OrganizedMagicCard>
                </Box>
            )}
        </Flex>
    </Box>
)
// https://egghead.io/lessons/react-reorder-a-list-with-react-beautiful-dnd
export default function Battlefield({ game, room, onCardClick }) {
    // TODO, just use the first player (1 v 1)
    const keys = Object.keys(room.state.players)
    const enemy = room.state.players[keys[0]]

    return (
        <Flex sx={{ width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
                {enemy && <EnemyMagicCards cards={enemy.battlefield0} onCardClick={onCardClick}/>}
                {enemy && <EnemyMagicCards cards={enemy.battlefield1} onCardClick={onCardClick}/>}
            </Box>
            <Box>
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
            </Box>
        </Flex >
    )
}
