import React, { useState } from 'react'
import { Card, Text, Flex, Box, IconButton, Button, Input } from 'theme-ui'
import mutations from '../../mutations/index'
import { useMutation  } from '@apollo/react-hooks'
import queries from '../../queries/index.js'

export default function NewRoom({ onClose }) {
    /**
     * Create a room.
     */
    const [room, setRoom] = useState({ name: '' })

    const [newRoom, { newRoomError }] = useMutation(mutations.NEW_ROOM, {
        onCompleted({ newRoom }) {
            onClose()
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
        newRoom({ variables: { room } })
    }

    return (
        <Card sx={{ width: ['100%', '100%', '50%', '450px'] }}>
            <Text sx={{ fontSize: 4 }}>New Room</Text>
            <Box py={2} />
            <Text pb={2}>Name</Text>
            <Input variant='inputTiny' placeholder='name' 
            onChange={(el) => setRoom({ name : el.target. value})}></Input>
            <Flex pt={4}>
                <Button onClick={onClose}>Close</Button>
                <Box variant="spacer" />
                <Button onClick={() => onCreate()}>Create</Button>
            </Flex>
        </Card>
    )
}
