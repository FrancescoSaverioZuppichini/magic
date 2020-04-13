import React from 'react'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import queries from '../../queries'
import { Card, Flex, Button, Text, Box } from 'theme-ui'
import MagicCards from '../MagicCards/MagicCards'
import { MagicCard } from '../MagicCards/MagicCard'
import DeckControllers from './DeckControllers'
import { useHistory } from "react-router-dom";

export default function Deck({ id }) {
    const { loading, error, data } = useQuery(queries.GET_DECK, { variables: { id: id } })
    const history = useHistory()

return (<Card sx={{ width: ['100%'] }}>
        {data &&
            <Box>
                <Flex sx={{ justifyContent: 'space-between' }}>
                    <Text sx={{ fontSize: 4 }}>{data.deck.name}</Text>
                    <Button onClick={history.goBack}>Close</Button>
                </Flex>

                <Text sx={{ fontSize: 0 }}>{moment(Number(data.deck.createdAt)).format('MMM Do YY')}</Text>
                <Box p={2} />
                <DeckControllers id={data.deck.id} />
                <Box p={3} />
                <MagicCards cards={data.deck.cards }>
                    {(card, i) => <MagicCard key={i} {...card} isZoomable />}
                </MagicCards>
            </Box>
        }
    </Card>
    )
}
