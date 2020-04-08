import React from 'react'
import { Flex, Box, Text, Button, Card } from 'theme-ui'
import SearchBar from './SearchBar'
import MagicCards from './MagicCards'

const WithMagicCardsDisplayer = ({ children }) => (
    <Card sx={{ position: 'absolute', left: 0, top: 6, bg: 'background', flexDirection: 'row' }}>
        <Box px={[2, 3]}>
            {children}
        </Box>>
    </Card>
)

function NavBar({ user }) {
    // TODO onLoadMore and also scroll down a bit
    return (
        <Box>
            <Flex py={3} px={4} sx={{ width: '100vw', bg: 'primary', color: 'textLight', alignItems: 'center' }}>
                <Box variant="spacer" />
                <Box sx={{ flexGrow: 2 }}>
                    <SearchBar>{({ cards, onLoadMore }) => (<Box>
                        {cards && <WithMagicCardsDisplayer>
                            <MagicCards cards={cards.cards} />
                            {cards && cards.hasMore &&
                                <Flex sx={{ width: '100%' }}>
                                    <Box variant='spacer' />
                                    <Button onClick={onLoadMore}>More</Button>
                                    <Box variant='spacer' />
                                </Flex>}
                        </WithMagicCardsDisplayer>}
                    </Box>
                    )}
                    </SearchBar>
                </Box>
                <Box variant="spacer" />
                <Text>{user.username}</Text>
            </Flex>

        </Box>
    )
}

export default NavBar
