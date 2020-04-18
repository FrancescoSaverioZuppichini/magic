import React from 'react'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import queries from '../../queries'
import { Card, Flex, Button, Text, Box } from 'theme-ui'
import MagicCards from '../MagicCards/MagicCards'
import { MagicCard, ZoomMagiCardAction, AddToDeckMagiCardAction } from '../MagicCards/MagicCard'
import DeckControllers from './DeckControllers'
import { useHistory } from "react-router-dom";

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
                <MagicCards cards={data.deck.cards}>
                    {(card, i) => <MagicCard key={i} {...card}
                        actions={props => <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <AddToDeckMagiCardAction {...props} />
                            <ZoomMagiCardAction {...props} /> </Flex>} />}
                </MagicCards>
            </Box>
        }
    </Card>
    )
}
