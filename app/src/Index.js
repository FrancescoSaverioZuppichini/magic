import React from 'react'
import { Flex, Text, Button, Card } from 'theme-ui'

function Index() {
    return (
        <Flex>
            <Card variant='viewport' sx={{ flex: 1,  backgroundColor: 'white' }}>
                Index
            </Card>
            <Card variant='viewport' sx={{ flex: 1, backgroundColor: 'background' }}></Card>
        </Flex>
    )
}

export default Index
