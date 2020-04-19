import React, { useState } from 'react'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import queries from '../../queries'
import { Card, Flex, Button, Text, Box } from 'theme-ui'
import MagicCards from '../MagicCards/MagicCards'
import { MagicCard, ZoomMagiCardAction, AddToDeckMagiCardAction } from '../MagicCards/MagicCard'
import DeckControllers from './DeckControllers'
import { useHistory } from "react-router-dom";

const SelectableMagigCards = (props) => {
    const [selectedCards, setSelectedCard] = useState([])
    const containCard = (card) => selectedCards.filter(c => c.id === card.id).length > 0

    const onCardClick = (card) => {
        let cards = selectedCards
        if (containCard(card)) {
            // remove first occurrence
            for (let i = 0; i < selectedCards.length; i++) {
                if (selectedCards[i].id === card.id) {
                    selectedCards.splice(i, 1)
                    console.log(i)
                    break
                }
            }

            cards = [...selectedCards]
        }
        else {
            cards = [...selectedCards, card]
        }

        setSelectedCard(cards)
    }

    return (
        <Box>
            <Box>
                {props.children(selectedCards)}
            </Box>
            <MagicCards cards={props.cards}>
                {(card, i) => props.card(card, i, onCardClick)}
            </MagicCards>
        </Box>
    )
}


export default function Deck({ id }) {
    /**
     * Single Deck
     */
    const { data } = useQuery(queries.GET_DECK, { variables: { id: id } })
    const history = useHistory()

    return (<Card >
        {data &&
            <Box>
                <Flex sx={{ justifyContent: 'space-between' }}>
                    <Text sx={{ fontSize: 4 }}>{data.deck.name}</Text>
                    <Button onClick={history.goBack}>Close</Button>
                </Flex>
                <Text sx={{ fontSize: 0 }}>{moment(Number(data.deck.createdAt)).format('MMM Do YY')}</Text>
                <Box p={2} />
                <DeckControllers id={data.deck.id} />
                <Box p={2} />
                {/* cards */}

                <SelectableMagigCards cards={data.deck.cards} card={
                    (card, i, setSelectedCard) => <MagicCard key={i} card={card}
                        onClick={setSelectedCard}
                        actions={props => <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <AddToDeckMagiCardAction {...props} />
                            <ZoomMagiCardAction {...props} /> </Flex>} />}
                >
                    {selectedCards => <Text >{`${selectedCards.length} selected`}</Text>
                    }
                </SelectableMagigCards>
                {/* <MagicCards cards={data.deck.cards}>
                    {(card, i) => <MagicCard key={i} {...card}
                        actions={props => <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <AddToDeckMagiCardAction {...props} />
                            <ZoomMagiCardAction {...props} /> </Flex>} />}
                </MagicCards> */}
            </Box>
        }
    </Card>
    )
}
