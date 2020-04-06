import React from 'react'
import { Flex, Box, Text } from 'theme-ui'
import SearchBar from './SearchBar'

function NavBar({ user }) {
    return (
        <Flex py={3} px={4} sx={{width: '100vw', bg: 'primary', color: 'textLight', alignItems: 'center'}}>
            <Box variant="spacer"/>
            <Box sx={{flexGrow: 2}}>
            <SearchBar />
            </Box>
            <Box variant="spacer"/>
            <Text>{user.username}</Text>
        </Flex>
    )
}

export default NavBar
