import React, { useState } from 'react'
import { Card, Text, Flex, Box, Button, Slider } from 'theme-ui'
import { MagicCard } from '../../MagicCards/MagicCard'
import uniqid from 'uniqid'

export default function DeckFromHand({ deck, onClose, game }) {
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
                    <Box p={1} />
                    <Box sx={{ textAlign: 'center' }}>
                        <Text sx={{ fontSize: 1 }}>See your deck, one card at the time like in real life 😘</Text>
                    </Box>
                    <Box p={1} />
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