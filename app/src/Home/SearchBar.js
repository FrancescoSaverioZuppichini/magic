import React, { useRef } from 'react'
import { Input, IconButton, Box, Button } from 'theme-ui'
import Cards from './MagicCards'
import { useLazyQuery } from '@apollo/react-hooks';
import queries from '../queries/index'
import { useHistory, useLocation } from 'react-router-dom'

import queryString from 'query-string'
function SearchBar({children}) {
    const input = useRef(null)
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
        <Box sx={{ position: 'relative' }}>
            <Input variant='searchbar' placeholder='{ "name" : "search me", "type": "creature" }' ref={input}></Input>
            <IconButton onClick={() => searchCards(input.current.value)}
                sx={{
                    position: 'absolute', top: 0, right: 0, bg: 'dark', height: '100%'
                    , borderRadius: '0px 16px 16px 0px', outline: 'none',
                    width: '40px'
                }}>
                <img height='24px' src='/search-white-18dp.svg'></img>
            </IconButton>
        </Box>
        {data && children({cards: data.cards, onLoadMore})}
        </Box>
    )
}

export default SearchBar
