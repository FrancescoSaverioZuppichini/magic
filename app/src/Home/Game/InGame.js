
import React, { useEffect, useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import loader from '../../containers/LoaderContainer'
import { Provider, Subscribe } from 'unstated'
import InGameDeck from './InGameDeck'
import Modal from '../Modal.js'
import { MagicCard, ZoomMagiCardAction, CardPage } from '../MagicCards/MagicCard'

const BattleField = ({ game }) => {
    return ('')
}

const InGameDeckActions = ({ }) => (
    <Flex sx={{ justifyContent: 'space-between' }}>
        <Button variant='warning'>Discard</Button>

        <Button>Play</Button>

    </Flex>
)

export default function InGame({ room, game, deck }) {
    const [card, setCard] = useState()
    const [showCardModal, setShowCardModal] = useState(false)

    useEffect(() => {
        loader.hide()
        game.setDeck(deck)
    }, [])


    const onCardClick = (card) => {
        setCard(card)
        setShowCardModal(true)
    }

    return (
        <Flex sx={{ flexDirection: 'row', flexGrow: 1 }}>
            <Flex sx={{ flexDirection: 'column', flexGrow: 1 }}>
                <Card sx={{ flex: 1 }}>
                    {game.state.deck && <BattleField game={game} />}
                </Card>
                <Box py={2} />
                <Box>
                    {game.state.deck && <InGameDeck
                        onCardClick={onCardClick}
                        game={game}
                    />}
                </Box>
            </Flex>
            {/* Show the card modal */}
            <Box
                sx={{
                    visibility: ['visible', 'visible', 'visible', 'hidden'],
                    width: ['auto', 'auto', 'auto', 0]
                }}>
                <Modal active={showCardModal}>
                    <CardPage {...card} onClose={() => setShowCardModal(false)}>
                        <InGameDeckActions />
                    </CardPage>
                </Modal> </Box>

            {/* show card on right */}
            {card && <Box
                pl={2}
                sx={{
                    visibility: ['hidden', 'hidden', 'hidden', 'visible'],
                    width: [0, 0, 0, '450px']
                }}>
                <Card variant='tiny'>
                    <MagicCard card={card} />
                    <InGameDeckActions />
                </Card>
            </Box>}
        </Flex>
    )
}
