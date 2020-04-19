import React, { useState } from 'react';
import { Card, Flex, Button, Text, Box } from 'theme-ui'
import MagicCards from './MagicCards'

const SelectedCardsActions = ({ cards, onRemove }) => (
    <Box>
        {cards.length > 0 &&
            <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Text >{`${cards.length} selected`}</Text>
                <Button onClick={onRemove} variant='actionWarning' >Remove</Button>
            </Flex>
        }
    </Box>

)
const SelectableMagigCards = (props) => {
    /**
     * This component allows to select some card. The selected cards
     * and a function to clear the seletions is returned as render props to the children. 
     * The card component must be specified in the card render prop, a function to 
     * trigger the selection is returned in the card render prop.
     */
    const [selectedCards, setSelectedCard] = useState({})

    const onCardClick = (card, i) => {
        if (selectedCards[i]) delete selectedCards[i]
        else {
            selectedCards[i] = card
        }
        setSelectedCard({ ...selectedCards })
    }

    const onClear = () => setSelectedCard([])

    return (
        <Box>
            <Box>
                {props.children(Object.values(selectedCards), onClear)}
            </Box>
            <MagicCards cards={props.cards}>
                {(card, i) => <Box key={i}
                    variant={selectedCards[i] ? 'cards.selected' : ''}
                >
                    {props.card(card, i, onCardClick)}
                </Box>}
            </MagicCards>
        </Box>
    )
}


export { SelectedCardsActions, SelectableMagigCards }