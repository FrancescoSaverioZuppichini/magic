import React from 'react'
import { Flex, Box, Text, Button, Card, Input } from 'theme-ui'
import SearchBar from './SearchBar'
import { MagicCard } from './MagicCards/MagicCard'
import MagicCards from './MagicCards/MagicCards.js'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SearchPage = ({ }) => {
    const history = useHistory()

    return (

        <Flex p={[2, 3, 4]} sx={{
            position: 'absolute', left: 0, top: 0, bg: 'white',
            flexDirection: 'column', zIndex: 99, width: '100%', minHeight: '100vh'
        }}>
            <Flex sx={{ justifyContent: 'flex-end' }}>
                <Button onClick={history.goBack}>Close</Button>
            </Flex>
            <SearchBar  onSearchEnd={history.goBack}>{({ cards, onLoadMore }) => (<Box>
                {cards && <Box pt={3}>
                    <MagicCards cards={cards} hasFilters={false}>
                        {card => <MagicCard key={card.id} {...card} isZoomable={true} />
                        }
                    </MagicCards>
                    {cards && cards.hasMore &&
                        <Flex p={2} sx={{ width: '100%' }}>
                            <Box variant='spacer' />
                            <Button onClick={onLoadMore}>More</Button>
                            <Box variant='spacer' />
                        </Flex>}
                </Box>}
            </Box>
            )}
            </SearchBar>
        </Flex>
    )
}

export default SearchPage