import React, { useState } from 'react'
import NavBar from './NavBar'
import queries from '../queries'
import { useQuery } from '@apollo/react-hooks'
import { Card, Text, Flex, Box, IconButton, Button } from 'theme-ui'
import { Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import Modal from './Modal'

function Home() {
    const { error, data } = useQuery(queries.GET_ME)
    let { path, url } = useRouteMatch();
    const [openNewDeck, setOpenDeck] = useState(false)
    const [openNewRoom, setNewRoom] = useState(false)

    // if error here we have to redirect to login!
    return (
        <Box>
            {data && <NavBar user={data.me} />}
            <Card variant='container'>
                <Card variant='container'>
                    <Text sx={{ fontSize: 4, fontWeight: 'thin' }}>Your Deck</Text>
                    <IconButton variant='circle' sx={{ height: '54px', width: '54px' }}
                        onClick={() => setOpenDeck(true)}>
                        <img height='48px' width='48px' src='add-white-18dp.svg'></img>
                    </IconButton>

                    <Modal active={openNewDeck}> newDeck
                    <Button onClick={() => setOpenDeck(false)}>Close</Button>
                    </Modal>
                </Card>
                <Card variant='container'>
                    <Text sx={{ fontSize: 4, fontWeight: 'thin' }}>Rooms</Text>
                    <IconButton variant='circle' sx={{ height: '54px', width: '54px' }}
                        onClick={() => setNewRoom(true)}>
                        <img height='48px' width='48px' src='add-white-18dp.svg'></img>
                    </IconButton>
                    <Modal active={openNewRoom}> asdsd
                    <Button onClick={ () => setNewRoom(false)}>Close</Button>
                    </Modal>
                </Card>
            </Card>

        </Box>

    )
}

export default Home
