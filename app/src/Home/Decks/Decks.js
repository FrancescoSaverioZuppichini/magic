import React from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import queries from '../../queries'
import { Route, useHistory } from "react-router-dom";
import { Flex, Text, Box, Button, IconButton } from 'theme-ui'
import Modal from '../Modal'
import Deck from './Deck'
import DeckPreview from './DeckPreview'
import DecksSearchBar from './DecksSearchBar'

export default function Decks() {
    /**
     * Decks page.
     */
    const { data } = useQuery(queries.GET_ME)
    const history = useHistory()

    return (
        <Box>
            <Text sx={{ fontSize: 4, fontWeight: 'thin' }}>Decks</Text>
            {data.me.decks.length <= 0 &&
                <Text pt={2} sx={{ fontSize: 2, fontWeight: 'thin' }}>No decks! Create one</Text>}
            <Box py={2} p />
            <DecksSearchBar sx={{ maxWidth: '250px' }} decks={data.me.decks}>
                {decks =>
                    <Flex sx={{ flexDirection: ['column', 'row'], flexWrap: 'wrap' }}>
                        {decks.map(deck => <Box key={deck.id} pr={2} py={2}>
                            <DeckPreview key={deck.id} {...deck}>}</DeckPreview>
                        </Box>)}
                        <Flex sx={{ flex: 1, alignItems: 'center'}}>
                            <Button
                                onClick={() => history.push('/home/decks/newDeck')}>
                                Add
                         </Button>
                        </Flex>
                    </Flex>
                }
            </DecksSearchBar>
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
