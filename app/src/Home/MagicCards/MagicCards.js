import React, { useState, useEffect, useRef } from 'react'
import { MagicCard } from './MagicCard'
import { Flex, Box, Text, Select, Button, IconButton, Image } from 'theme-ui'
import { MagicCardsFilters } from './MagicCardsFilterControllers'
import { filterMagicCards } from '../../utils'

function usePrevious(value) {
    const ref = useRef()

    useEffect(() => {
      ref.current = value;
    })
    return ref.current
  }

export default function MagicCards({ cards, children, hasFilters = true, width = ['100%', '33%', '25%', '20%', '15%'] }) {

    const [showFilters, setShowFilter] = useState(false)
    const [filteredCards, setFilteredCards] = useState([...cards])
    const [filter, setFilter] = useState({})
    
    const prevCards = usePrevious({ cards })
    useEffect(() => {
        setFilteredCards(filterMagicCards(cards, filter))
    }, [cards.length])

    const setFilterAndEnsureAll = (val) => {
        // TODO copied from SearchBar
        let newFilter = {}
        if (Object.values(val)[0] !== undefined) newFilter = { ...filter, ...val }
        else {
            newFilter = { ...filter }
            // when val is 'All' we need to not pass it to the filter
            delete newFilter[Object.keys(val)[0]]
        }
        setFilter(newFilter)
        setFilteredCards(filterMagicCards(cards, newFilter))
    }

    


    return (
        <Box sx={{width: '100%'}}>
            <Text sx={{ fontSize: 2 }}>{`${cards.length} cards`}</Text>
            <Box p={2}/>
            {hasFilters && <Flex pb={1} sx={{ flexDirection: 'column' }}>
                <Flex sx={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                    <Button onClick={() => setShowFilter(!showFilters)} variant="outline" sx={{ opacity: showFilters ? 0.5 : 1 }}>Filter</Button>
                    <Box>
                        <IconButton><Image src='/view_module-black-18dp.svg' width='48px' height='48px'></Image></IconButton>
                        <IconButton><Image src='/view_list-black-18dp.svg' width='48px' height='48px'></Image></IconButton>
                    </Box>
                </Flex>
                {showFilters && <MagicCardsFilters onChange={setFilterAndEnsureAll} />}
            </Flex>}
            <Flex sx={{
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                {filteredCards.map((card, i) =>
                    <Box key={i} p={1} sx={{ flexBasis: width }}>
                        {children(card)}
                    </Box>)}
                {filteredCards.length === 0 && <Flex variant="centering" sx={{ width: '100%', height: '150px' }}>
                    <Text sx={{ fontSize: 3 }}> No cards</Text> </Flex>}
            </Flex>
        </Box>

    )

}
