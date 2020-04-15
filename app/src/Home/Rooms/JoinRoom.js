import React, { useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'

export default function JoinRoom({ onClose, id }) {


    const onJoin = () => {
        console.log('onJoin')
    }

    return (
        <Card sx={{ width: ['100%', '100%', '66%'] }}>
            <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>Join Room?</Text>
            <Box py={3} />
            <Text pb={2}>{id}</Text>
            <Flex pt={5}>
                <Button onClick={onClose}>Close</Button>
                <Box variant="spacer" />
                <Button onClick={onJoin}>Join</Button>
                <Box px={2}></Box>
            </Flex>

        </Card>
    )
}
