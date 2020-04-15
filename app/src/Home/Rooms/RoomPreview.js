import React from 'react'
import { Card, Text, Flex } from 'theme-ui'

export default function RoomPreview({name}) {
    return (
        <Card>
            <Text>{name}</Text>
        </Card>
    )
}
