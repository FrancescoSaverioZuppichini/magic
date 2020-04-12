import React from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import queries from '../../queries/index.js'
import { Route, useParams, useHistory } from "react-router-dom";
import { Card, Flex, Text, Box, Button, IconButton } from 'theme-ui'
import Modal from '../Modal'
import Deck from '../Deck/Deck.js'
import DeckPreview from '../Deck/DeckPreview'

export default function Decks() {
    const { error, data } = useQuery(queries.GET_ME)

    const history = useHistory()
    return (
        <Box>
            <Text sx={{ fontSize: 4, fontWeight: 'thin' }}>Decks</Text>

            <Flex sx={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                {data.me.decks.reverse().map(deck => <Box key={deck.id} p={2}>
                    <DeckPreview key={deck.id} {...deck}>}</DeckPreview></Box>)}
                <Button
                    onClick={() => history.push('/home/decks/newDeck')}>
                    Add
                    </Button>
            </Flex>
            <Route path='/home/decks/:deckId'>
                {({ match }) => match ? <Modal active={true}>
                    <Deck id={match.params.deckId} />
                    <IconButton onClick={() => history.goBack()} variant='close'>
                        <img height='48px' src='/close-black-18dp.svg'></img>
                    </IconButton>
                </Modal> : ''
                }
            </Route>
        </Box>
    )
}
