import React from 'react'
import { Flex, Box, Text, Button } from 'theme-ui'
import SearchBar from './SearchBar'
import { MagicCard, AddToDeckMagiCardAction, ZoomMagiCardAction, AddToDeckMagiCardsAction } from './MagicCards/MagicCard'
import { SelectableMagigCards } from './MagicCards/SelectableMagicCards'

import MagicCards from './MagicCards/MagicCards.js'
import { useHistory } from "react-router-dom";

const SearchPage = ({ }) => {
    const history = useHistory()

    return (
        <Flex p={[2, 3, 4]} sx={{
            position: 'absolute', left: 0, top: 0, bg: 'white',
            flexDirection: 'column', zIndex: 99, width: '100%', minHeight: '100vh'
        }}>
            <Flex sx={{ justifyContent: 'flex-end' }}>
                <Button onClick={history.goBack}>Close</Button>
            </Flex>
            <Box py={2}></Box>
            <SearchBar onSearchEnd={history.goBack}>
                {({ cards, onLoadMore }) => (<Box>
                    {cards && <Box pt={3}>
                        <SelectableMagigCards cards={cards.cards}
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
            </SearchBar>
        </Flex>
    )
}

export default SearchPage