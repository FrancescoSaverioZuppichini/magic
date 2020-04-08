import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import SearchBar from './SearchBar'
import { Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import Modal from './Modal'
import { ACTIONS } from '../utils.js'
import { MagicCardImg } from './MagicCard'
import queries from '../queries/index.js'


// const PickableMagicCard

export default function NewDeck({ }) {
    const [deck, setDeck] = useState({ name: '', cards: [] })
    const client = useApolloClient()
    const { error, data } = useQuery(queries.GET_ACTION, { client })
    console.log(data)
    return (
        <Card variant='modal'>
            New Deck
            <Input placeholder='Deck name'></Input>
            <SearchBar>{({ cards, fetchMore }) => 'wt'}</SearchBar>
            <Button>Done</Button>
        </Card>
    )
}
