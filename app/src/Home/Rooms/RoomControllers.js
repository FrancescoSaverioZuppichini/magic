import React, { useState } from 'react'
import { Flex, Box, Button } from 'theme-ui'
import ConfirmationCard from '../ConfirmationCard'
import Modal from '../Modal'
import mutations from '../../mutations/index'
import queries from '../../queries/index.js'
import { useMutation } from '@apollo/react-hooks'

export default function RoomControllers({ id, name, onCompleted }) {
    /**
     * Buttons for room. They supports delete
     */
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [deleteRoom, { deleteRoomError }] = useMutation(mutations.DELETE_ROOM, {
        onCompleted({ deleteRoom }) {
            console.log(onCompleted)
            if(onCompleted) onCompleted(deleteRoom)
        },
        update(cache, { data: { deleteRoom } }) {
            let { me } = cache.readQuery({ query: queries.GET_ME })
            me.rooms = me.rooms.filter(room => room.id !== deleteRoom.id)
            cache.writeQuery({
                query: queries.GET_ME,
                data: me,
            })
        }
    })

    const onDeleteClick = () => setShowConfirmationModal(true)

    const onConfirmDeleteClick = () => {
        // TODO call mutation
        deleteRoom({ variables: { id } })
        setShowConfirmationModal(false)
    }

    const onConfirmCancelClick = () => setShowConfirmationModal(false)

    return (
        <Flex sx={{ flexDirection: 'row' }}>
            <Button variant='warning' onClick={onDeleteClick}>Delete</Button>
            <Box px={2}></Box>
            <Modal active={showConfirmationModal}>
                <ConfirmationCard
                    onDeleteClick={onConfirmDeleteClick}
                    onCancelClick={onConfirmCancelClick}
                    text={`Do you really want to delete room "${name}?"`} />
            </Modal>
        </Flex>
    )
}
