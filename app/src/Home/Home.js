import React from 'react'
import NavBar from './NavBar'
import queries from '../queries'
import { useQuery } from '@apollo/react-hooks'
import { Card, Text, Flex, Box, IconButton } from 'theme-ui'

function Home() {
    const { error, data } = useQuery(queries.GET_ME)
    // if error here we have to redirect to login!
    return (
        <Box>
            {data && <NavBar user={data.me} />}
            <Card variant='container'>
                <Card variant='container'>
                    <Text sx={{ fontSize: 4, fontWeight: 'thin' }}>Your Deck</Text>
                    <IconButton variant='circle' sx={{height: '54px', width: '54px'}}><img height='48px' width='48px' src='add-white-18dp.svg'></img></IconButton>
                </Card>
                <Card variant='container'>
                    <Text sx={{ fontSize: 4, fontWeight: 'thin' }}>Rooms</Text>
                    <IconButton variant='circle' sx={{height: '54px', width: '54px'}}><img height='48px' width='48px' src='add-white-18dp.svg'></img></IconButton>
                </Card>
            </Card>

        </Box>

    )
}

export default Home
