import React, { useRef, useState } from 'react'
import { Input, IconButton, Box, Button } from 'theme-ui'
import Cards from './MagicCards'
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import queries from '../queries/index'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'

function SearchBar({ children, onChange, inputVariant='searchbar' }) {
    /**
     * This component allows to search for cards and return them as a render props + a function to fetch more
     */
    const input = useRef(null)
    const [filter, setFilter] = useState({})
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
        let cursor = { skip: 0, limit: 32 }
        setHideCards(false)
        setFilterHasChanged(false)
        // base case, we are searching only for name
        let parsedFilter = { name: filter }

        try {
            parsedFilter = JSON.parse(filter)
        } catch (err) {
            console.log(err)
        }
        finally {
            console.log(parsedFilter)
            getCards({ variables: { filter: parsedFilter, cursor } })
            history.push(
                {
                    pathname: window.location.pathname,
                    search: `?${queryString.stringify({ 'filter': filter })}`
                }
            )
        }


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
        <Box sx={{maxHeight: 'inherit'}}>
            <Box sx={{ position: 'relative' }}>
                <Input variant={inputVariant} placeholder='{ "name" : "search me", "type": "creature" }'
                    ref={input} onChange={e => {
                        if(onChange) onChange(e)
                        e.target.value !== '' ? setFilterHasChanged(true) : setFilterHasChanged(false)
                        setFilter(e.target.value)
                    }}>

                </Input>
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
