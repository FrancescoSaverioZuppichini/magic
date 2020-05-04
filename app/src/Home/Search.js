import React, { useState } from 'react'
import { Flex, Box, Text, Button, IconButton } from 'theme-ui'
import SearchBar from './SearchBar'
import DecksSearchBar from './Decks/DecksSearchBar'

import { MagicCard, AddToDeckMagiCardAction, ZoomMagiCardAction, AddToDeckMagiCardsAction } from './MagicCards/MagicCard'
import { SelectableMagigCards } from './MagicCards/SelectableMagicCards'
import { useHistory } from "react-router-dom";
import DeckPreview from './Decks/DeckPreview'
import Modal from './Modal'
import DeckPage from './Decks/DeckPage'

const ZooomDeckAction = ({ deck }) => {
    const [zoom, setZoom] = useState(false)
    return (
        <Box>
            <IconButton onClick={() => setZoom(true)} sx={{ width: '38px' }}>
                <img width='38px' src='/zoom_in-white-18dp.svg'></img>
            </IconButton>
            {zoom && <Modal active={zoom} variant='vCentering'>
                <DeckPage id={deck.id} onClose={() => setZoom(false)} />
            </Modal>}
        </Box>
    )
}

const SearchPage = ({ }) => {
    const history = useHistory()
    const [searchType, setSearchType] = useState('CARDS')
    const setSearchTypeAndUrl = (type) => {
        setSearchType(type)
    }

    return (
        <Flex p={[2, 3, 4]} sx={{
            position: 'absolute', left: 0, top: 0, bg: 'white',
            flexDirection: 'column', zIndex: 99, width: '100%', minHeight: '100vh'
        }}>
            <Flex sx={{ justifyContent: 'flex-end' }}>
                <Button onClick={history.goBack}>Close</Button>
            </Flex>
            <Box py={2}></Box>
            <Flex>
                <Button
                    onClick={() => setSearchTypeAndUrl('CARDS')}
                    variant={searchType === 'CARDS' ? 'primary' : 'outline'}>Cards</Button>
                <Box px={1}></Box>
                <Button
                    onClick={() => setSearchTypeAndUrl('DECKS')}
                    variant={searchType === 'DECKS' ? 'primary' : 'outline'}>Decks</Button>
            </Flex>
            <Box py={1}></Box>

            {searchType === 'CARDS' && <SearchBar onSearchEnd={history.goBack}>
                {({ cards, onLoadMore }) => (<Box>
                    {cards && <Box pt={3}>
                        <SelectableMagigCards cards={cards.cards} hasFilters={false}
                            card={(card, i, setSelectedCard) =>
                                <MagicCard key={card.id} card={card}
                                    onClick={() => setSelectedCard(card, i)}
                                    actions={
                                        (props =>
                                            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                                <AddToDeckMagiCardAction {...props} />
                                                <ZoomMagiCardAction {...props} />
                                            </Flex>)
                                    }>
                                </MagicCard>}>
                            {/* selected view */}
                            {(selectedCards, onClear) => <Box>
                                {selectedCards.length > 0 &&
                                    <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text >{`${selectedCards.length} selected`}</Text>
                                        <AddToDeckMagiCardsAction cards={selectedCards} onDone={() => onClear()} />
                                    </Flex>
                                }
                            </Box>
                            }
                        </SelectableMagigCards>
                        {cards.hasMore &&
                            <Flex p={2} sx={{ width: '100%' }}>
                                <Box variant='spacer' />
                                <Button onClick={onLoadMore}>More</Button>
                                <Box variant='spacer' />
                            </Flex>}
                    </Box>}
                </Box>
                )}
            </SearchBar>}
            {searchType === 'DECKS' && <DecksSearchBar>
                {({ decks }) => <Flex sx={{ flexDirection: 'row', flexWrap: 'wrap', bg: 'background' }}>
                    {decks && decks.decks.map(deck => <Box key={deck.id} p={2}>
                        <DeckPreview deck={deck} linkable={false} controllers={
                            deck => <ZooomDeckAction deck={deck} />
                        } />
                    </Box>)}
                </Flex>}
            </DecksSearchBar>}
        </Flex>
    )
}

export default SearchPage