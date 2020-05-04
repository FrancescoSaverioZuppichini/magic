import React, { useState } from 'react'
import { Flex, Box, Text, Input } from 'theme-ui'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import DropDown from './DropDown'
import { useApolloClient } from '@apollo/react-hooks'

function NavBar({ user }) {
    const history = useHistory()
    const client = useApolloClient()
    const [openDropDown, setOpenDropDown] = useState(false)

    const onLogOut = () => {
        localStorage.removeItem('token')
        client.writeData({ data: { isAuthenticated: false } })
    }
    return (
        <Box>
            <Flex py={3} px={4} sx={{ width: '100vw', bg: 'primary', color: 'textLight', alignItems: 'center' }}>
                <Box px={2} />
                <Text><Link to={'/home/preview'}>Home</Link></Text>
                <Box px={3} />
                <Box variant='spacer' />
                <Box sx={{ flexGrow: 1 }}>
                    <Input variant='searchbar' placeholder='Search...' onClick={() => history.push('/home/search?type=CARDS', )}>
                    </Input>
                </Box>
                <Box px={3} />
                <Box variant='spacer' />
                <Text><Link to={'/home/decks'}>Decks</Link></Text>
                <Box px={23} />
                <Text><Link to={'/home/rooms'}>Rooms</Link></Text>

                <Box px={[2, 3, 4]} />

                <Box sx={{ position: 'relative' }}>
                    <Text
                        onClick={() => setOpenDropDown(!openDropDown)}>{user.username}
                    </Text>
                    <DropDown open={openDropDown} width={100}>
                        <Text sx={{ color: 'black' }} onClick={onLogOut}>Log out</Text>
                    </DropDown>
                </Box>
            </Flex>

        </Box>
    )
}

export default NavBar
