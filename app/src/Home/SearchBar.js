import React, { useRef, useState, useEffect } from 'react'
import { Input, IconButton, Box, Button, Flex, Card, Text } from 'theme-ui'
import { useLazyQuery, useApolloClient } from '@apollo/react-hooks';
import queries from '../queries/index'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { MagicCardsFilters } from './MagicCards/MagicCardsFilterControllers'

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
    const history = useHistory()

    const searchCards = () => {
        /**
         * In order we first ensure that cards are displayed and we fix the input.
         * Then we get the cards and, finally, we update the history
         */
        let cursor = { skip: 0, limit: 32 }


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
        <Flex sx={{ flexDirection: 'column', flexGrow: '1' }}>
            <Flex sx={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <Flex sx={{ flex: 1, flexDirection: ['column', 'column', 'row'], flexWrap: 'wrap' }}>
                    <Box sx={{ flexGrow: '1', flex: 1 }}>
                        <Text pb={1}>Name</Text>
                        <Input variant={inputVariant} placeholder='Search for cards...'
                            ref={input} onChange={e => {
                                if (onChange) onChange(e)
                                e.target.value !== '' ? setFilterHasChanged(true) : setFilterHasChanged(false)
                                setFilter({ ...filter, ...{ name: e.target.value } })
                            }}>
                        </Input>
                    </Box>
                    <Box p={2}></Box>
                    <Box sx={{ flex: 1 }}>
                        <MagicCardsFilters onChange={setFilterAndEnsureAll} />
                    </Box>
                </Flex>
                <Flex pt={3} sx={{ justifyContent: 'start', alignItems: 'center' }}>
                    {(hideCards || filterHasChanged) ? <Button onClick={() => searchCards(filter)}>
                        Search
                </Button> : <Button onClick={() => setHideCards(true)}>
                            Clear
                    </Button>}
                </Flex>
            </Flex>
            {!data && <Flex sx={{ flexGrow: 1 }} pt={5} variant='centering'><Text sx={{ fontSize: 3, fontWeight: 'thin' }} >No search so far</Text></Flex>}
            {data && !hideCards && children({ cards: data.cards.cards, onLoadMore, filter, setFilter, searchCards })}
        </Flex>
    )
}

export default SearchBar
