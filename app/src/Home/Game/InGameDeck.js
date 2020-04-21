import React, { useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import { MagicCard } from '../MagicCards/MagicCard'

export default function InGameDeck({ hand, deck }) {
    const [isHiding, setIsHiding] = useState(false)

    console.log(hand)
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
                        <Flex sx={{ flexDirection: 'row', overflow: 'auto', flexGrow: 1, justifyContent: 'center' }}>
                            {hand.map(card => (
                                <Box
                                    sx={{ maxWidth: '225px', minWidth: '150px' }}>
                                    <MagicCard card={card} />
                                </Box>)
                            )}
                        </Flex>
                        <Flex sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Flex pt={1}>
                                <Button onClick={() => setIsHiding(true)} variant='outline'>Hide</Button>
                                <Box px={1} />
                                <Button>Pick</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>}
        </Box>
    )
}
