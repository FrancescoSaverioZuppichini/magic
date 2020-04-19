import React, { useState, useEffect, useRef } from 'react'
import { Flex, Box, Text, Button, IconButton, Image } from 'theme-ui'
import { MagicCardsFilters } from './MagicCardsFilterControllers'
import { filterMagicCards } from '../../utils'

export default function MagicCards({ cards, children, hasFilters = true, width = ['100%', '50%', '33%', '20%'] }) {
    /**
     * Container for cards. It allows to filter the cards is `harFilters=true`. 
     * Custom card types can be passed as children.
     */
    const [showFilters, setShowFilter] = useState(false)
    const [filteredCards, setFilteredCards] = useState([...cards])
    const [cardsVisMode, setCardVisMode] = useState('BLOCK')
    const [filter, setFilter] = useState({})

    useEffect(() => {
        /**
         * Filters cards when different cards are passed
         */
        setFilteredCards(filterMagicCards(cards, filter))
    }, [cards.length])

    const setFilterAndEnsureAll = (val) => {
        /**
         * Build up the filter and filter the cards client side.
         */
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
        <Box sx={{ width: '100%' }}>
            <Text sx={{ fontSize: 2 }}>{`${cards.length} cards`}</Text>
            <Flex pb={2} sx={{ flexDirection: 'column' }}>
                <Flex sx={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                    {hasFilters && <Button onClick={() => setShowFilter(!showFilters)} variant="outline" sx={{ opacity: showFilters ? 0.5 : 1 }}>Filter</Button>}
                    <Box variant='spacer' />
                    <Box>
                        <IconButton onClick={() => setCardVisMode('BLOCK')}><Image src='/view_module-black-18dp.svg' width='48px' height='48px'></Image></IconButton>
                        <IconButton onClick={() => setCardVisMode('TABLE')}><Image src='/view_list-black-18dp.svg' width='48px' height='48px'></Image></IconButton>
                    </Box>
                </Flex>
                {showFilters && <MagicCardsFilters onChange={setFilterAndEnsureAll} />}
            </Flex>
            {!hasFilters && <Box p={2} />}
            {/* cards */}
            <Flex p={2} sx={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: 'background',
                borderRadius: '16px'
            }}>
                {cardsVisMode === 'BLOCK' &&
                    filteredCards.map((card, i) =>
                        <Box key={i} p={2} sx={{ flexBasis: width }}>
                            {children(card, i)}
                        </Box>)
                }
                {cardsVisMode === 'TABLE' && <div>show table</div>}
                {filteredCards.length === 0 && <Flex variant="centering" sx={{ width: '100%', height: '150px' }}>
                    <Text sx={{ fontSize: 3 }}> No cards</Text> </Flex>}
            </Flex>
        </Box>

    )

}
