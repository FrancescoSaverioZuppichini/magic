import React, { useRef, useState, useEffect } from 'react'
import { Input, IconButton, Box, Button, Flex, Card, Text } from 'theme-ui'
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import queries from '../queries/index'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { MagicCardsFilters } from './MagicCards/MagicCardsFilterControllers'
import loader from '../containers/LoaderContainer'

function SearchBar({ children, onChange, onSearchEnd, inputVariant = 'searchbar' }) {
    /**
     * This component allows to search for cards and return them as a render props + a function to fetch more
     */
    const input = useRef(null)
    const [showFull, setShowFull] = useState(false)
    const [filter, setFilter] = useState({})
    const [hideCards, setHideCards] = useState(true)
    const [filterHasChanged, setFilterHasChanged] = useState(true)

    const [getCards, { error, data, loading, fetchMore, updateQuery }] = useLazyQuery(queries.GET_CARDS,
        { fetchPolicy: 'network-only' }
    )

    if (loading) loader.show()
    if (data || error) loader.hide()

    const history = useHistory()

    const searchCards = () => {
        /**
         * In order we first ensure that cards are displayed and we fix the input.
         * Then we get the cards and, finally, we update the history
         */
        let cursor = { skip: 0, limit: 4 }


        setHideCards(false)
        setFilterHasChanged(false)

        getCards({ variables: { filter, cursor } })
        // history.push(
        //     {
        //         pathname: window.location.pathname,
        //         search: `?${queryString.stringify({ 'filter': filter })}`
        //     }
        // )

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
        <Flex sx={{ flexDirection: 'column', flex: 1}}>
                <Flex sx={{ flexDirection: 'column' }}>
                    <Flex sx={{  position: 'relative', alignItems: 'center'}}>
                        <Input variant={inputVariant} placeholder='Search for cards...'
                            ref={input} onChange={e => {
                                if (onChange) onChange(e)
                                e.target.value !== '' ? setFilterHasChanged(true) : setFilterHasChanged(false)
                                setFilter({ ...filter, ...{ name: e.target.value } })
                            }}>
                        </Input>
                        {/* small controllers */}
                        <Box sx={{ visibility: ['visible', 'visible', 'hidden'] }}>
                            {(hideCards || filterHasChanged) ? <IconButton onClick={() => searchCards(filter)}
                                sx={{
                                    position: 'absolute', top: 0, right: 0, bg: 'dark', height: '100%'
                                    , borderRadius: '0px 16px 16px 0px', outline: 'none',
                                    width: '40px'
                                }} variant='static'>
                                <img height='24px' src='/search-white-18dp.svg'></img>
                            </IconButton> : <IconButton onClick={() => setHideCards(true)}
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
                            {(hideCards || filterHasChanged) ? <Button onClick={() => searchCards(filter)}>
                                Search
                </Button> : <Button onClick={() => setHideCards(true)}>
                                    Clear
                    </Button>}
                        </Box>

                    </Flex>
                    <Box p={2}></Box>
                    <Box sx={{ flex: 1 }}>
                        <MagicCardsFilters onChange={setFilterAndEnsureAll} />
                    </Box>

            </Flex>
            {!data && <Flex sx={{ flex: '1 1'}} pt={5} variant='centering'><Text sx={{ fontSize: 3, fontWeight: 'thin' }} >Nothing so far</Text></Flex>}
            {data && !hideCards && children({ cards: data.cards, onLoadMore, filter, setFilter, searchCards })}
        </Flex>
    )
}

export default SearchBar
