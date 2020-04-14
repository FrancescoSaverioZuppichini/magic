import React, { useState } from 'react'
import NavBar from './NavBar'
import queries from '../queries'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { Card, Text, Flex, Box, IconButton, Button } from 'theme-ui'
import { Switch, Route, Link, Redirect, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import Modal from './Modal'
import NewDeck from './NewDeck'
import DeckPreview from './Decks/DeckPreview'
import Decks from './Decks/Decks.js'
import Search from './Search.js'
import io from 'socket.io-client';
import { ACTIONS } from '../utils.js'

function Home() {
    const [openNewDeck, setOpenDeck] = useState(false)
    const [openNewRoom, setNewRoom] = useState(false)
    const location = useLocation()
    const history = useHistory()
    // const socket = io('http://localhost');
    const client = useApolloClient()
    const { error, data } = useQuery(queries.GET_ME)
    let { path, url } = useRouteMatch()


    const onNewDeckClick = () => {
        history.push("/home/decks/newDeck");
        // setOpenDeck(true)
        client.writeData({ data: { action: ACTIONS.NEW_DECK } })
    }

    const onNewDeckClose = () => {
        history.goBack()
        // setOpenDeck(false)
        client.writeData({ data: { action: null } })
    }
    // if error here we have to redirect to login!
    return (
        <Box>
            {data && <NavBar user={data.me} />}
            {data && <Card variant='container'>
                <Route path='/home/search' component={Search}></Route>
                <Route path='/home/decks' component={Decks}></Route>
                <Route path='/home/decks/newDeck'>
                    <Modal active={true}>
                        <NewDeck onClose={onNewDeckClose} />
                    </Modal>
                </Route>
                <Route path='/home/preview'>
                    <Box>
                        <Link to='/home/decks'><Text sx={{ fontSize: 4, fontWeight: 'thin' }}>Your Decks</Text></Link>
                        <Box p={2} />
                        <Text>Latest created</Text>
                        <Flex sx={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {data.me.decks.reverse().slice(0, 3).map(deck => <Box key={deck.id} pr={2} py={2}><DeckPreview key={deck.id} {...deck}>}</DeckPreview></Box>)}

                            <Box px={3} />

                            <Button
                                onClick={onNewDeckClick}>
                                Add
                    </Button>
                        </Flex>
                        <Modal active={openNewDeck}>
                            <NewDeck onClose={onNewDeckClose} />
                        </Modal>
                    </Box>
                    <Box py={3} />
                    <Box>
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
                    </Box>
                </Route>
            </Card>}

        </Box>

    )
}

export default Home
