import React, { useState } from 'react'
import { Flex, Box, Text, Select, Button, IconButton, Image } from 'theme-ui'
import { COLORS, TYPES } from '../../utils.js'
import { filterMagicCards } from '../../utils'

const MagicCardsFilters = ({ onChange }) =>
    (<Flex sx={{ flexWrap: 'wrap' }}>
        <Box pr={2}>
            <Text py={1} sx={{ color: 'text' }}>Type</Text>
            <Select onChange={(el) => onChange({ type: el.target.value !== 'All' ? el.target.value : undefined } )}> defaultValue='All'>
                     <option>All</option>
                {TYPES.map(t => <option key={t}>{t}</option>)}
            </Select>
        </Box>
        <Box pr={2}>
            <Text py={1} sx={{ color: 'text' }}>Color</Text>
            <Select onChange={(el) => onChange({ colors: el.target.value !== 'All' ?  [el.target.value] : undefined })}> defaultValue=''>
                     <option>All</option>
                {COLORS.map(c => <option key={c}>{c}</option>)}
            </Select>

        </Box>
        <Box pr={2}>
            <Text py={1} sx={{ color: 'text' }}>Mana cost</Text>
            <Select onChange={(el) => onChange({ convertedManaCost: el.target.value !== 'All' ?  el.target.value : undefined })}> defaultValue=''>
                     <option>All</option>
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>
                     <option>6</option>
                     <option>7</option>
                     <option>8</option>
                     <option>9</option>
                     <option>10 +</option>
            </Select>

        </Box>


    </Flex>)

// DEPRECATED
const MagicCardsFilterControllers = ({ cards=[], children }) => {
    const [showFilters, setShowFilter] = useState(false)
    const [filteredCards, setFilteredCards] = useState([...cards])
    const [filter, setFilter] = useState({})

    const setFilterAndEnsureAll = (val) => {
        // TODO copied from SearchBar
        let newFilter = {}
        if(Object.values(val)[0] !== 'All') newFilter = {...filter, ...val}
        else {
            newFilter = {...filter}
            // when val is 'All' we need to not pass it to the filter
            delete newFilter[Object.keys(val)[0]]
        }
        setFilter(newFilter)
        setFilteredCards(filterMagicCards(cards, filter))
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Flex sx={{ flexDirection: 'column' }}>
                <Flex sx={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                    <Button onClick={() => setShowFilter(!showFilters)} variant="outline" sx={{ opacity: showFilters ? 0.5 : 1 }}>Filter</Button>
                    <Box>
                        <IconButton><Image src='/view_module-black-18dp.svg' width='48px' height='48px'></Image></IconButton>
                        <IconButton><Image src='/view_list-black-18dp.svg' width='48px' height='48px'></Image></IconButton>
                    </Box>
                    {showFilters && <MagicCardsFilters onChange={setFilterAndEnsureAll} />}
                </Flex>
            </Flex>
            {children(filteredCards)}
        </Box>
    )
}


export { MagicCardsFilters, MagicCardsFilterControllers }