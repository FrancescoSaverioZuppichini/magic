import React, { useRef, useState } from 'react'
import { Input, IconButton, Box, Button } from 'theme-ui'
import Cards from './MagicCards'
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import queries from '../queries/index'
import { useHistory, useLocation } from 'react-router-dom'

import queryString from 'query-string'
function SearchBar({ children }) {
    const input = useRef(null)
    const [filter, setFilter ] = useState({})
    const [hideCards, setHideCards] = useState(true)
    const [filterHasChanged, setFilterHasChanged] = useState(true)

    const [getCards, { error, data, loading, fetchMore, updateQuery }] = useLazyQuery(queries.GET_CARDS,
        { fetchPolicy: 'network-only' }
        )
    const history = useHistory()

    const searchCards = () => {
        /**
         * In order we first ensure that cards are displayed and we fix the input.
         * Then we get the cards and, finally, we update the history
         */
        setHideCards(false)
        setFilterHasChanged(false)
        let cursor = { skip: 0, limit: 32 }
        getCards({ variables: { filter, cursor } })
        history.push(
            {
                pathname: '/home',
                search: `?${queryString.stringify({ 'filter': JSON.stringify(filter) })}`
            }
        )
    }

    const onLoadMore = () => {
        /**
         * Here we append the new cards
         */
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
                <Input variant='searchbar' placeholder='{ "name" : "search me", "type": "creature" }' 
                ref={input} onChange={e => {
                    setFilterHasChanged(true)
                setFilter(JSON.parse(e.target.value))}}></Input>
                {(hideCards || filterHasChanged) ? <IconButton onClick={() => searchCards(filter)}
                    sx={{
                        position: 'absolute', top: 0, right: 0, bg: 'dark', height: '100%'
                        , borderRadius: '0px 16px 16px 0px', outline: 'none',
                        width: '40px'
                    }}>
                    <img height='24px' src='/search-white-18dp.svg'></img>
                </IconButton> : <IconButton onClick={() => setHideCards(true)}
                    sx={{
                        position: 'absolute', top: 0, right: 0, bg: 'dark', height: '100%'
                        , borderRadius: '0px 16px 16px 0px', outline: 'none',
                        width: '40px'
                    }}>
                    <img height='24px' src='/close-white-18dp.svg'></img>
                </IconButton>}
            </Box>
            {data && !hideCards && children({ cards: data.cards, onLoadMore })}
        </Box>
    )
}

export default SearchBar
