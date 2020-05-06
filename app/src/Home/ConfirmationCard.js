import React from 'react'
import { Card, Box, Text, Button, Flex } from 'theme-ui'

export default function ConfirmationCard({ onDeleteClick, onCancelClick, text }) {
    /**
     * Small card used to confirm an user input.
     */
    return (
        <Card sx={{ textAlign: 'center', minWidth: '300px' }}>
            <Text sx={{ fontSize: 4 }}>Are you sure?</Text>
            {text && <Text py={3} sx={{ fontSize: 2, fontWeight: 'thin' }}>{text}</Text>}
            <Text>This action <strong>cannot</strong> be undone</Text>
            <Flex pt={3} sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button variant='warning' onClick={onDeleteClick}>Delete</Button>
                <Button onClick={onCancelClick}>Cancel</Button>
            </Flex>
        </Card>
    )
}
