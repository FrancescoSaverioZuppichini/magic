
import React, { useEffect, useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import loader from '../../containers/LoaderContainer'
import { Provider, Subscribe } from 'unstated'
import InGameDeck from './InGameDeck'
import Modal from '../Modal.js'
import { MagicCard, ZoomMagiCardAction, CardPage } from '../MagicCards/MagicCard'
import BattleField from './BattleField'
import { DragDropContext } from "react-beautiful-dnd"

const InGameDeckActions = ({ onPlay }) => (
    <Flex sx={{ justifyContent: 'space-between' }}>
        <Button variant='warning'>Discard</Button>
        <Button onClick={onPlay}>Play</Button>
    </Flex>
)

const InBattleFieldDeckActions = ({ onTap }) => (
    <Flex sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={onTap}>Tap</Button>
    </Flex>
)

export default function InGame({ room, game, deck }) {
    const [card, setCard] = useState({})
    const [showCardModal, setShowCardModal] = useState(false)

    useEffect(() => {
        loader.hide()
        game.setDeck(deck)
    }, [])


    const onCardClick = (card) => {
        setCard(card)
        setShowCardModal(true)
    }

    const onDragEnd = ({ source, destination }) => {
        if (destination) {
            if (source.droppableId === destination.droppableId){
                game.swap(source.index, destination.index, destination.droppableId)
            }
        }
    }

    return (
        <Flex sx={{ flexDirection: 'column', flexGrow: 1 }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Flex sx={{ flexDirection: 'column', flexGrow: 1 }}>
                    {/* Battlefield */}
                    <Flex sx={{flexDirection: 'row', flex: 1}}>
                    <Card sx={{ flex: 1, flexGrow: 1, display: 'flex' }}>
                        <Flex sx={{ flexDirection: 'column', flexGrow: 1 }}>
                            <Box sx={{ flex: 1, alignItems: 'flex-end'}}></Box>
                            <Flex sx={{ flex: 1, alignItems: 'flex-end'}}>
                                {game.state.deck && <BattleField onCardClick={onCardClick} game={game} />}
                            </Flex>
                        </Flex>
                    </Card>
                     {/* show card on right */}
                    {card && <Box
                        pl={2}
                        sx={{
                            visibility: ['hidden', 'hidden', 'hidden', 'visible'],
                            width: [0, 0, 0, '450px']
                        }}>
                        <Card variant='tiny'>
                            <MagicCard card={card} />
                            {!card.isPlayed ? 
                            <InGameDeckActions onPlay={() => game.play(card)}/> :
                            <InBattleFieldDeckActions onTap={() => game.tap(card)}/> }
                        </Card>
                    </Box>}
                    </Flex>
                    <Box py={2} />
                    <Box>
                        {game.state.deck && <InGameDeck
                            onCardClick={onCardClick}
                            game={game}
                        />}
                    </Box>
                </Flex>
            </DragDropContext>
            {/* Show the card modal */}
            <Box
                sx={{
                    visibility: ['visible', 'visible', 'visible', 'hidden'],
                    width: ['auto', 'auto', 'auto', 0]
                }}>
                <Modal active={showCardModal}>
                    <CardPage {...card} onClose={() => setShowCardModal(false)}>
                    {!card.isPlayed ? 
                    <InGameDeckActions onPlay={() => game.play(card)}/> :
                    <InBattleFieldDeckActions onTap={() => game.tap(card)}/> }
                    </CardPage>
                </Modal> 
            </Box>
        </Flex>
    )
}
