import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { Flex, Box, Button } from 'theme-ui'
import { useHistory } from "react-router-dom";
import ConfirmationCard from '../ConfirmationCard'
import Modal from '../Modal'

export default function DeckControllers({ id }) {
    const history = useHistory()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    const onDeleteClick = () => setShowConfirmationModal(true)


    const onConfirmDeleteClick = () => {
        // TODO call mutation
        setShowConfirmationModal(false)
    }

    const onConfirmCancelClick = () => setShowConfirmationModal(false)


    const onEditClick = () => {
        history.push(`/home/decks/edit/${id}`)
        // switch to edit mode!
        // TODO push history
    }



    return (
        <Flex sx={{ flexDirection: 'row' }}>
            <Button variant='warning' onClick={onDeleteClick}>Delete</Button>
            <Box px={2}></Box>
            <Button onClick={onEditClick}>Edit</Button>
            <Modal active={showConfirmationModal}>
                <ConfirmationCard
                    onDeleteClick={onConfirmDeleteClick}
                    onCancelClick={onConfirmCancelClick}
                    text={`Do you really want to delete deck ${id}?`} />
            </Modal>
        </Flex>
    )
}
