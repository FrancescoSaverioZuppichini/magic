import React from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { Flex, Box, Button } from 'theme-ui'

export default function DeckControllers({ id }) {

    const onDeleteClick = () => {
        // TODO show confirmation
        // TODO call mutation
    }

    const onEditClick = () => {
        // switch to edit mode!
        // TODO push history
    }
    
    return (
        <Flex sx={{ flexDirection: 'row' }}>
            <Button variant='warning'>Delete</Button>
            <Box px={2}></Box>
            <Button>Edit</Button>
        </Flex>
    )
}
