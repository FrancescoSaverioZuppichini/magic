import React, { useRef, useState, useEffect } from 'react'
import { Input, IconButton, Box, Button, Flex, Card, Text } from 'theme-ui'
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import queries from '../../queries/index'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import loader from '../../containers/LoaderContainer'





function DecksSearchBar({ children, onChange, onSearchEnd, inputVariant = 'searchbar', isClearable=true }) {
    /**
     * This component allows to search for cards and return them as a render props + a function to fetch more
     */
    const input = useRef(null)
    const [filter, setFilter] = useState({})
    const [hideDecks, sethideDecks] = useState(true)
    const [filterHasChanged, setFilterHasChanged] = useState(true)

    const [getDecks, { error, data, loading, fetchMore, updateQuery }] = useLazyQuery(queries.GET_DECKS,
        { fetchPolicy: 'network-only' }
    )

    if (loading) loader.show()
    if (data || error) loader.hide()
    
    const searchDecks = () => {
        /**
         * In order we first ensure that cards are displayed and we fix the input.
         * Then we get the cards and, finally, we update the history
         */
        let cursor = { skip: 0, limit: 32 }

        sethideDecks(false)
        setFilterHasChanged(false)

        getDecks({ variables: { filter, cursor } })
    }

    const onLoadMore = () => {
        /**
         * Here we append the new cards
         */
        fetchMore({
            variables: {
                cursor: { limit: data.decks.cursor.limit, skip: data.decks.cursor.skip }
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                fetchMoreResult.cards.cards = [...prev.cards.cards, ...fetchMoreResult.cards.cards]
                return Object.assign({}, prev, fetchMoreResult)

            }
        })
    }

    const setFilterAndEnsureAll = (val) => {
        let newFilter = {}
        if (Object.values(val)[0] !== undefined) newFilter = { ...filter, ...val }
        else {
            newFilter = { ...filter }
            // when val is 'All' we need to not pass it to the filter
            delete newFilter[Object.keys(val)[0]]
        }
        setFilterHasChanged(true)
        setFilter(newFilter)
    }

    return (
        <Flex sx={{ flexDirection: 'column', flex: 1,  minHeight: 0  }}>
            <Flex sx={{ flexDirection: 'column' }}>
                <Flex sx={{ position: 'relative', alignItems: 'center' }}>
                    <Input variant={inputVariant} placeholder='Search for decks...'
                        ref={input} onChange={e => {
                            if (onChange) onChange(e)
                            e.target.value !== '' ? setFilterHasChanged(true) : setFilterHasChanged(false)
                            setFilter({ ...filter, ...{ name: e.target.value } })
                        }}>
                    </Input>
                    {/* small controllers */}
                    <Box sx={{ visibility: ['visible', 'visible', 'hidden'] }}>
                        {(hideDecks || filterHasChanged) ? <IconButton onClick={() => searchDecks(filter)}
                            sx={{
                                position: 'absolute', top: 0, right: 0, bg: 'dark', height: '100%'
                                , borderRadius: '0px 16px 16px 0px', outline: 'none',
                                width: '40px'
                            }} variant='static'>
                            <img height='24px' src='/search-white-18dp.svg'></img>
                        </IconButton> : <IconButton onClick={() => sethideDecks(true)}
                            sx={{
                                position: 'absolute', top: 0, right: 0, bg: 'dark', height: '100%'
                                , borderRadius: '0px 16px 16px 0px', outline: 'none',
                                width: '40px'
                            }} variant='static'>
                                <img height='24px' src='/close-white-18dp.svg'></img>
                            </IconButton>}
                    </Box>
                    {/* big controllers */}
                    <Box pl={3} sx={{
                        justifyContent: 'start', alignItems: 'center',
                        width: [0, 0, 'auto'],
                        height: [0, 0, 'auto'],
                        visibility: ['hidden', 'hidden', 'visible']
                    }}>
                        {(hideDecks || filterHasChanged) ? <Button onClick={() => searchDecks(filter)}>
                            Search
                </Button> : <Button onClick={() => isClearable && sethideDecks(true)}>
                                Clear
                    </Button>}
                    </Box>
                </Flex>
                <Box p={2}></Box>
                <Box sx={{ flex: 1 }}>
                    {/* <MagicCardsFilters onChange={setFilterAndEnsureAll} /> */}
                </Box>
                <Box py={1}></Box>

            </Flex>
            {!data && <Flex sx={{ flex: '1 1' }} pt={5} variant='centering'><Text sx={{ fontSize: 3, fontWeight: 'thin' }} >Nothing so far</Text></Flex>}
            {data && !hideDecks && children({ decks: data.decks, onLoadMore, filter, setFilter, searchDecks })}
        </Flex>
    )
}

export default DecksSearchBar
