import React, { useState } from 'react'
import { Box, Button } from 'theme-ui'
import Modal from '../Modal'
import ConfirmationCard from '../ConfirmationCard'

export default function GameOwnerActions({ room, data }) {
    const [showConfirmation, setShowConfirmation] = useState(false)
    const confirmationText = `Delete room ${data.name}`
    return (
        <Box>
            <Button variant='warning' onClick={() => setShowConfirmation(true)}>Delete</Button>
            <Modal active={showConfirmation}>
                <ConfirmationCard
                    text={confirmationText}
                    onDeleteClick={() => room.deleteRoom(data)}
                    onCancelClick={() => setShowConfirmation(false)}
                ></ConfirmationCard>
            </Modal>
        </Box>
    )
}