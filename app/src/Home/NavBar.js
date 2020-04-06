import React from 'react'
import { Flex, Box, Text, Button } from 'theme-ui'
import SearchBar from './SearchBar'
import { useLazyQuery } from '@apollo/react-hooks';
import queries from '../queries/index'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'

function NavBar({ user }) {
    const [getCards, { error, data, fetchMore }] = useLazyQuery(queries.GET_CARDS, 
        { fetchPolicy: 'network-only' })
    const history = useHistory()

    const searchCards = (value) => {
        const filter = JSON.parse(value)
        let cursor = { skip: 0, limit: 32 }

        getCards({ variables: { filter, cursor } })

        history.push(
            {
                pathname: '/home',
                search: `?${queryString.stringify({ 'filter': value })}`
            }
        )
    }

    const onLoadMore = () => {
        fetchMore({
            variables: {
                cursor: { limit: data.cards.cursor.limit, skip: data.cards.cursor.skip }
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                fetchMoreResult.cards.cards = [...prev.cards.cards, ...fetchMoreResult.cards.cards]
                return Object.assign({}, prev, fetchMoreResult)

            }
        })
    }

    return (
        <Box>
            <Flex py={3} px={4} sx={{ width: '100vw', bg: 'primary', color: 'textLight', alignItems: 'center' }}>
                <Box variant="spacer" />
                <Box sx={{ flexGrow: 2 }}>
                    <SearchBar onSearchClick={searchCards} />
                </Box>
                <Box variant="spacer" />
                <Text>{user.username}</Text>
            </Flex>
            {data && data.cards.cards.map(card => (<img src={`cards/${card.scryfallId}.jpg`} height='250px'></img>))}
            {data && data.cards.hasMore && <Button onClick={onLoadMore}>More</Button>}
        </Box>
    )
}

export default NavBar
