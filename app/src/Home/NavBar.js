import React from 'react'
import { Flex, Box, Text, Button } from 'theme-ui'
import SearchBar from './SearchBar'
import Cards from './MagicCards'
import { useLazyQuery } from '@apollo/react-hooks';
import queries from '../queries/index'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'


const MagicCardsDisplayer = ( { cards, onLoadMore} ) => (
    <div></div>
)

function NavBar({ user }) {

    return (
        <Box>
            <Flex py={3} px={4} sx={{ width: '100vw', bg: 'primary', color: 'textLight', alignItems: 'center' }}>
                <Box variant="spacer" />
                <Box sx={{ flexGrow: 2 }}>
                    <SearchBar children={({ cards, onLoadMore}) => (<Box>
                            {cards && <Cards cards={cards.cards} />}
                            {cards && cards.hasMore && <Button onClick={onLoadMore}>More</Button>}
                        </Box>
                        )}>
                    </SearchBar>
                </Box>
                <Box variant="spacer" />
                <Text>{user.username}</Text>
            </Flex>

        </Box>
    )
}

export default NavBar
