
import React, { useEffect, useState, Children } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import loader from '../../../containers/LoaderContainer'
import { Subscribe } from 'unstated'
import Hand from './Hand'
import Modal from '../../Modal.js'
import { MagicCard, ZoomMagiCardAction, CardPage } from '../../MagicCards/MagicCard'
import BattleField from './BattleField'
import { DragDropContext } from "react-beautiful-dnd"
import GameCardsContainer from '../../../containers/GameCardsContainer'

const HandActions = ({ onPlay, onShow }) => (
    <Flex>
        <Button variant='warning'>Discard</Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={onShow}>Show</Button>
        <Box px={1} />
        <Button onClick={onPlay}>Play</Button>
    </Flex>
)

const BattleFieldDeckActions = ({ onTap, onShow }) => (
    <Flex sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={onShow}>Show</Button>
        <Box px={1} />
        <Button onClick={onTap}>Tap</Button>
    </Flex>
)

const ShowCardFromUsers = ({ card, from }) => {
    const [showCardFromUserModal, setShowCardFromUserModal] = useState(true)
    useEffect(() => setShowCardFromUserModal(true), [card])

    return (
        <Modal active={showCardFromUserModal}>
            <CardPage {...card}
                onClose={() => setShowCardFromUserModal(false)} />
        </Modal>)
}


const game = new GameCardsContainer()

export default function Battle({ deck, room }) {
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

    const sendUpdates = () => {
        const action = { battlefield0: game.state.battlefield0, battlefield1: game.state.battlefield1, }
        room.emitAction(action)
    }

    const onDragEnd = ({ source, destination, combine }) => {
        if (destination) {
            game.swap(source, destination)
        }
        else if (combine) {
            game.combine(combine, source)
        }

        sendUpdates()

    }

    const onPlay = (card) => {
        game.play(card)
        setShowCardModal(false)
        sendUpdates()
    }


    const onTap = (card) => {
        game.tap(card)
        setShowCardModal(false)
        sendUpdates()
    }

    const onShow = (card) => {
        room.showCard(card)
        setShowCardModal(false)
    }

    return (
        <Subscribe to={[game]}>
            {game =>
                <Flex sx={{ flexDirection: 'column', flexGrow: 1 }}>
                    {room.state.cardToShow && <ShowCardFromUsers {...room.state.cardToShow} />}
                    {/* <AutomaticallySendUpdates room={room} game={game}/> */}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Flex sx={{ flexDirection: 'column', flexGrow: 1 }}>
                            {/* Battlefield */}
                            <Flex sx={{ flexDirection: 'row', flex: 1 }}>
                                <Card sx={{ flex: 1, flexGrow: 1, display: 'flex' }}>
                                        {game.state.deck && <BattleField game={game} room={room} selectedCard={card} onCardClick={onCardClick} />}
                                </Card>
                                {/* show card on right */}
                                {card && <Box
                                    pl={2}
                                    sx={{
                                        visibility: ['hidden', 'hidden', 'hidden', 'hidden', 'visible'],
                                        width: [0, 0, 0, 'hidden', '450px']
                                    }}>
                                    <Card variant='tiny'>
                                        <MagicCard card={card} />
                                        {card.isPlayed}
                                        {!card.isPlayed ?
                                            <HandActions
                                                onPlay={() => onPlay(card)}
                                                onShow={() => onShow(card)} /> :
                                            <BattleFieldDeckActions
                                                onTap={() => onTap(card)}
                                                onShow={() => onShow(card)} />}
                                    </Card>
                                </Box>}
                            </Flex>
                            <Box py={2} />
                            <Box>
                                {game.state.deck && <Hand
                                    game={game}
                                    selectedCard={card}
                                    onCardClick={onCardClick}
                                />}
                            </Box>
                        </Flex>
                    </DragDropContext>
                    {/* Show the card modal */}
                    <Box
                        sx={{
                            visibility: ['visible', 'visible', 'visible', 'visible', 'hidden'],
                            width: ['auto', 'auto', 'auto', 'auto', 0]
                        }}>
                        <Modal active={showCardModal}>
                            <CardPage {...card} onClose={() => setShowCardModal(false)}>
                                {!card.isPlayed ?
                                    <HandActions
                                        onPlay={() => onPlay(card)}
                                        onShow={() => onShow(card)} /> :
                                    <BattleFieldDeckActions
                                        onTap={() => onTap(card)}
                                        onShow={() => onShow(card)} />}
                            </CardPage>
                        </Modal>
                    </Box>
                </Flex>
            }
        </Subscribe>
    )
}
