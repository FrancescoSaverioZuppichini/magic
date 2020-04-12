import React from 'react'
import { Flex, Box, Text, Button, Card } from 'theme-ui'
import SearchBar from './SearchBar'
import { MagicCard } from './MagicCard'
import MagicCards from './MagicCards.js'
import { Link } from "react-router-dom";

const WithMagicCardsDisplayer = ({ children }) => (
    <Card sx={{ position: 'absolute', left: 0, top: '82px', bg: 'background', flexDirection: 'row', zIndex: 99 }}>
        <Box px={[2, 3]}>
            {children}
        </Box>>
    </Card>
)

function NavBar({ user }) {
    return (
        <Box>
            <Flex py={3} px={4} sx={{ width: '100vw', bg: 'primary', color: 'textLight', alignItems: 'center' }}>
                <Box px={2}/>
                <Text><Link to={'/home/preview'}>Home</Link></Text>
                <Box px={3}/>
                <Box sx={{ flexGrow: 2 }}>
                    <SearchBar>{({ cards, onLoadMore }) => (<Box>
                        {cards && <WithMagicCardsDisplayer>
                            <MagicCards cards={cards}>
                                {card => <MagicCard key={card.id} {...card} isZoomable={true} />
                                }
                            </MagicCards>
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
                <Box px={3}/>
                <Text><Link to={'/home/decks'}>Decks</Link></Text>
                <Box px={2}/>
                <Text>{user.username}</Text>
            </Flex>

        </Box>
    )
}

export default NavBar
