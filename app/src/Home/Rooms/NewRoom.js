import React, { useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import Stages from '../Stages'
import mutations from '../../mutations/index'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import queries from '../../queries/index.js'

export default function NewRoom({ onClose }) {
    const [room, setRoom] = useState({ name: '' })

    const [newRoom, { newRoomError }] = useMutation(mutations.NEW_ROOM, {
        onCompleted({ newRoom }) {
            console.log(newRoom)
            // onClose()
        },
        update(cache, { data: { newRoom } }) {
            let { me } = cache.readQuery({ query: queries.GET_ME })
            me.rooms.push(newRoom)
            cache.writeQuery({
                query: queries.GET_ME,
                data: { ...me },
            })
        }
    })


    const onCreate = () => {
        console.log('onCreate')
        newRoom({ variables: { room } })
    }

    return (
        <Card sx={{ width: ['100%', '100%', '66%', '50%'] }}>
            <Text sx={{ fontSize: 4 }}>New Room</Text>
            <Box py={3} />
            <Text pb={2}>Name</Text>
            <Input placeholder='name' sx={{ maxWidth: '350px' }} 
            onChange={(el) => setRoom({ name : el.target. value})}></Input>
            <Flex pt={5}>
                <Button onClick={onClose}>Close</Button>
                <Box variant="spacer" />
                <Button onClick={() => onCreate()}>Create</Button>
            </Flex>


            {/* <Card>
                        <Text sx={{ fontSize: 3, fontWeight: 'thin' }}>Room crated!</Text>
                        <Box py={3} />
                        <Text pb={2}>Sharable link</Text>
                        <Text pb={2}>bla bla bla</Text>
                        <Flex pt={5}>
                            <Button onClick={onBack}>Edit</Button>
                            <Box variant="spacer" />
                            <Button onClick={onClose} >Close</Button>
                            <Box px={2}></Box>
                            <Button onClick={onJoin} variant='outline'>Join</Button>
                            <Box px={2}></Box>
                        </Flex>
                    </Card> */}

        </Card>
    )
}
