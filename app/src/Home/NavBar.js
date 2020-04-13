import React from 'react'
import { Flex, Box, Text, Button, Card, Input } from 'theme-ui'
import { Link } from "react-router-dom";
import {  useHistory } from "react-router-dom";

const WithMagicCardsDisplayer = ({ children }) => (
    <Card sx={{ position: 'absolute', left: 0, top: '82px', bg: 'background', flexDirection: 'row', zIndex: 99 }}>
        <Box px={[2, 3]}>
            {children}
        </Box>>
    </Card>
)

function NavBar({ user }) {
    const history = useHistory()
    return (
        <Box>
            <Flex py={3} px={4} sx={{ width: '100vw', bg: 'primary', color: 'textLight', alignItems: 'center' }}>
                <Box px={2} />
                <Text><Link to={'/home/preview'}>Home</Link></Text>
                <Box px={3} />
                <Box variant='spacer'/>
                <Box sx={{ flexGrow: 1 }}>
                    <Input variant='searchbar' placeholder='Search...' onClick={() => history.push('/home/search')}>
                    </Input>
                </Box>
                <Box px={3} />
                <Box variant='spacer'/>
                <Text><Link to={'/home/decks'}>Decks</Link></Text>
                
                <Box px={[2, 3, 4]} />
                <Text>{user.username}</Text>
            </Flex>

        </Box>
    )
}

export default NavBar
