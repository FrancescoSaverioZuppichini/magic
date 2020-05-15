import React, { useState } from 'react'
import NavBar from './NavBar'
import queries from '../queries'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { Card, Text, Flex, Box, IconButton, Button } from 'theme-ui'
import { Route, Link, Redirect, useRouteMatch, useLocation, useHistory } from "react-router-dom"
import { Provider, Subscribe } from 'unstated';
import loader from '../containers/LoaderContainer'
import snackbar from '../containers/SnackbarContainer'

import Modal from './Modal'

import NewDeck from './Decks/NewDeck'
import DeckPreview from './Decks/DeckPreview'
import Decks from './Decks/Decks.js'
import DeckPage from './Decks/DeckPage.js'

import Rooms from './Rooms/Rooms.js'
import RoomPreview from './Rooms/RoomPreview'
import NewRoom from './Rooms/NewRoom'
import JoinRoom from './Rooms/JoinRoom'
import PlayedRooms from './Rooms/PlayedRooms'

import Game from './Game/Game'

import Snackbar from './Snackbar'
import Loader from '../Loader.js'

import Search from './Search.js'

import { ACTIONS } from '../utils.js'

function Home() {
    const [openNewDeck, setOpenDeck] = useState(false)
    const [openNewRoom, setNewRoom] = useState(false)
    const history = useHistory()
    // const socket = io('http://localhost');
    const client = useApolloClient()
    const { error, loading, data } = useQuery(queries.GET_ME)

    if (loading) loader.show()
    if (data || error) loader.hide()

    const onNewDeckClick = () => {
        history.push("/home/decks/newDeck")
        // setOpenDeck(true)
        client.writeData({ data: { action: ACTIONS.NEW_DECK } })
    }

    const onNewDeckClose = () => {
        history.goBack()
        // setOpenDeck(false)
        client.writeData({ data: { action: null } })
    }

    // if   error here we have to redirect to login!
    return (
        <Provider>
            <Flex sx={{ flexDirection: 'column', height: '100%' }}>
                <Subscribe to={[loader]}>
                    {({ state }) => state.show && <Loader />}
                </Subscribe>
                <Subscribe to={[snackbar]}>
                    {({ state }) => state.show && <Snackbar title={state.title} text={state.text} />}
                </Subscribe>
                {data && <NavBar user={data.me} />}
                {data && <Card variant='container' sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Route path='/home/search' component={Search}></Route>
                    <Route path='/home/decks' component={Decks}></Route>
                    {/* open a specific deck */}
                    <Route path='/home/decks/show/:deckId'>
                        {({ match }) => match ? <Modal active={true} variant='none'>
                            <DeckPage id={match.params.deckId} me={data.me} onClose={() => history.goBack()} />
                        </Modal> : ''
                        }
                    </Route>
                    <Route path='/home/rooms' component={Rooms}></Route>
                    <Route path='/home/decks/newDeck'>
                        <Modal active={true}>
                            <NewDeck onClose={onNewDeckClose} />
                        </Modal>
                    </Route>
                    <Route path='/home/rooms/newRoom'>
                        <Modal active={true}>
                            <NewRoom onClose={onNewDeckClose} />
                        </Modal>
                    </Route>
                    <Route path='/home/rooms/join/:roomId'>
                        {({ match }) => match ? <Modal active={true}>
                            <JoinRoom onClose={onNewDeckClose} id={match.params.roomId} />
                        </Modal> : ''}
                    </Route>
                    <Route path='/home/game/:gameId'>
                        {({ match }) => match ? <Game id={match.params.gameId} /> : ''}
                    </Route>

                    <Route path='/home/preview'>
                        <Box>
                            <Text sx={{ fontSize: 4, fontWeight: 'thin' }}>Played rooms</Text>
                            <Box p={1} />
                            <Text>Latest played</Text>
                            <Box py={2}></Box>
                            <PlayedRooms />
                        </Box>
                        <Box>
                            <Box py={3} />
                            <Text sx={{ fontSize: 4, fontWeight: 'thin' }}><Link to='/home/decks'>Your Decks</Link></Text>
                            <Box p={1} />
                            <Text>Latest created</Text>
                            <Box py={2}></Box>
                            <Flex sx={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {data.me.decks.reverse().slice(0, 3).map(deck => <Box key={deck.id} p={2}>
                                    <DeckPreview key={deck.id} deck={deck}>}</DeckPreview></Box>)}
                                <Button onClick={onNewDeckClick}>Add</Button>
                            </Flex>

                            <Modal active={openNewDeck}>
                                <NewDeck onClose={onNewDeckClose} />
                            </Modal>
                        </Box>
                        <Box py={3} />
                        <Box>
                            <Text sx={{ fontSize: 4, fontWeight: 'thin' }}><Link to='/home/rooms'>Your Rooms</Link></Text>
                            <Box p={1} />
                            <Text>Latest created</Text>
                            <Box py={2}></Box>
                            <Flex sx={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {data.me.rooms.reverse().slice(0, 3).map(room => <Box key={room.id} p={2}>
                                    <RoomPreview key={room.id} {...room}>}</RoomPreview></Box>)}
                                <Button onClick={() => history.push("/home/rooms/newRoom")}>Add</Button>
                            </Flex>
                            {/* <Box py={2} />
                            <Text sx={{ fontSize: 2, fontWeight: 'thin' }}>Have an invite?</Text>
                            <Box py={2} />
                            <Button
                                onClick={onJoinClick}>
                                Join
                             </Button> */}
                        </Box>
                    </Route>
                </Card>}
            </Flex>
        </Provider>

    )
}

export default Home
