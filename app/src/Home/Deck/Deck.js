import React from 'src/Home/Deck/node_modules/react'
import moment from 'src/Home/Deck/node_modules/moment'
import { useQuery } from 'src/Home/Deck/node_modules/@apollo/react-hooks'
import queries from 'src/queries'
import { Card, Flex, Button, Text, Box } from 'src/Home/Deck/node_modules/theme-ui'
import MagicCards from 'src/Home/MagicCards'
import { MagicCard } from 'src/Home/MagicCard'

export default function Deck({ id }) {
    const { loading, error, data } = useQuery(queries.GET_DECK, { variables: { id: id } })

    console.log(data)
    return (
        <Card sx={{ width : ['100%', '100%', '66%']}}>
            {data &&
                <Box>
                    <Text sx={{ fontSize: 4 }}>{data.deck.name}</Text>
                    <Text sx={{ fontSize: 0 }}>{moment(Number(data.deck.createdAt)).format('MMM Do YY')}</Text>
                    <Box p={2}/>
                    <MagicCards cards={{ cards : data.deck.cards}}>
                        {card =>  <MagicCard key={card.id} {...card}/>}
                    </MagicCards>
                    <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button variant='warning'>Delete</Button>
                        <Button>Edit</Button>
                    </Flex>
                </Box>
            }
        </Card>
    )
}
