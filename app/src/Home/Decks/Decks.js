import React from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import queries from '../../queries'
import { Route, useHistory } from "react-router-dom";
import { Flex, Text, Box, Button, IconButton } from 'theme-ui'
import Modal from '../Modal'
import DeckPage from './DeckPage'
import DeckPreview from './DeckPreview'
import MyDecksSearchBar from './MyDecksSearchBar'
import MyDeckControllers from './MyDeckControllers'

export default function Decks() {
    /**
     * Decks page.
     */
    const { data } = useQuery(queries.GET_ME)
    const history = useHistory()

    return (
        <Box>
            <Text sx={{ fontSize: 4, fontWeight: 'thin' }} >Decks</Text>
            {data.me.decks.length <= 0 ?
                <Text py={2} sx={{ fontSize: 2, fontWeight: 'thin' }}>No decks! Create one</Text>
                :
                <Box py={2}>
                    <MyDecksSearchBar sx={{
                        maxWidth: '250px',
                        backgroundColor: 'white',
                        borderColor: 'white'
                    }} decks={data.me.decks}>
                        {decks =>
                            <Flex sx={{ flexDirection: ['column', 'row'], flexWrap: 'wrap', alignItems: 'center', }}>
                                {decks.map(deck => <Box key={deck.id} pr={2} py={2}>
                                    <DeckPreview key={deck.id} deck={deck} controllers={
                                        deck => <MyDeckControllers {...deck} />
                                    }>}</DeckPreview>
                                </Box>)}
                                <Box>
                                <Button
                                    onClick={() => history.push('/home/decks/newDeck')}>
                                    Add
                                  </Button>
                                  </Box>
                            </Flex>

                        }
                    </MyDecksSearchBar>
                </Box>}
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
        </Box>
    )
}
