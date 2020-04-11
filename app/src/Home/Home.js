import React, { useState } from 'react'
import NavBar from './NavBar'
import queries from '../queries'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { Card, Text, Flex, Box, IconButton, Button } from 'theme-ui'
import { Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import Modal from './Modal'
import NewDeck from './NewDeck'
import DeckPreview from './Deck/DeckPreview'

import { ACTIONS } from '../utils.js'
function Home() {
    const [openNewDeck, setOpenDeck] = useState(true)
    const [openNewRoom, setNewRoom] = useState(false)
    const client = useApolloClient()
    const { error, data } = useQuery(queries.GET_ME)
    let { path, url } = useRouteMatch();
    console.log(data)
    const onNewDeckClick = () => {
        setOpenDeck(true)
        client.writeData({ data: { action: ACTIONS.NEW_DECK } })
    }

    const onNewDeckClose = () => {
        setOpenDeck(false)
        client.writeData({ data: { action: null } })
    }
    // if error here we have to redirect to login!
    return (
        <Box>
            {data && <NavBar user={data.me} />}
            {data && <Card variant='container'>
                <Card variant='container'>
                    <Text sx={{ fontSize: 4, fontWeight: 'thin' }}>Your Decks</Text>
                    <Box p={2} />
                    <Flex sx={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
                        {data.me.decks.map(deck => <Box key={deck.id} p={2}><DeckPreview key={deck.id} {...deck}>}</DeckPreview></Box>)}
                        <Button
                            onClick={onNewDeckClick}>
                            Add
                    </Button>
                    </Flex>
                    <Modal active={openNewDeck}>
                        <NewDeck onClose={onNewDeckClose} />
                    </Modal>
                </Card>
                <Card variant='container'>
                    <Text sx={{ fontSize: 4, fontWeight: 'thin' }}>Rooms</Text>
                    <Box p={2} />
                    <Flex sx={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Button
                            onClick={() => setNewRoom(true)}>
                            Add
                    </Button>
                    </Flex>
                    <Modal active={openNewRoom}> asdsd
                    <Button onClick={() => setNewRoom(false)}>Close</Button>
                    </Modal>
                </Card>
            </Card>}

        </Box>

    )
}

export default Home
