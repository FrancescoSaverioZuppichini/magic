import React from 'react'
import {Flex, Card } from 'theme-ui'

export default function MagicCard({ name, scryfallId }) {
    return (
        <Card p={2}>
            <img src={`cards/${scryfallId}.jpg`} height='250px'></img>
        </Card>
    )
}
