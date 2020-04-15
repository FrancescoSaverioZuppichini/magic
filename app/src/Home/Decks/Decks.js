import React from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import queries from '../../queries'
import { Route, useParams, useHistory } from "react-router-dom";
import { Card, Flex, Text, Box, Button, IconButton } from 'theme-ui'
import Modal from '../Modal'
import Deck from './Deck'
import DeckPreview from './DeckPreview'

export default function Decks() {
    const { error, data } = useQuery(queries.GET_ME)

    const history = useHistory()

    console.log(data, 'Decks')
    return (
        <Box>
            <Text sx={{ fontSize: 4, fontWeight: 'thin' }}>Decks</Text>
            {data.me.decks.length <= 0 && <Text pt={2} sx={{fontSize: 2, fontWeight: 'thin'}}>No decks! Create one</Text>}
            <Box py={2} p/>
            <Flex sx={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                {data.me.decks.map(deck => <Box key={deck.id} pr={2} py={2}>
                    <DeckPreview key={deck.id} {...deck}>}</DeckPreview>
                    </Box>)}
                <Button
                    onClick={() => history.push('/home/decks/newDeck')}>
                    Add
                </Button>
            </Flex>
            {/* edit a deck */}
            <Route path='/home/decks/edit/:deckId'>
                {({ match }) => match ? <Modal active={true}>
                    {`Editings ${match.params.deckId}`}
                    <IconButton onClick={() => history.goBack()} variant='close'>
                        <img height='48px' src='/close-black-18dp.svg'></img>
                    </IconButton>
                </Modal>
                    : ''}
            </Route>
            {/* open a specific deck */}
            <Route path='/home/decks/show/:deckId'>
                {({ match }) => match ? <Modal active={true} variant='none'>
                    <Deck id={match.params.deckId} />
                </Modal> : ''
                }
            </Route>
        </Box>
    )
}
