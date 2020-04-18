import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { Flex, Box, Button } from 'theme-ui'
import { useHistory } from "react-router-dom";
import ConfirmationCard from '../ConfirmationCard'
import Modal from '../Modal'
import mutations from '../../mutations/index'
import queries from '../../queries/index.js'
import { useMutation } from '@apollo/react-hooks'

export default function DeckControllers({ id }) {
    const history = useHistory()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    
    const [deleteDeck, { deleteDeckError }] = useMutation(mutations.DELETE_DECK, {
        onCompleted({ deleteDeck }) {
            console.log(deleteDeck)
        },
        update(cache, { data: { deleteDeck } }) {
            let { me } = cache.readQuery({ query: queries.GET_ME })
            console.log(me.decks.length)
            me.decks = me.decks.filter(deck => deck.id !== deleteDeck.id)
            console.log(me.decks.length)
            cache.writeQuery({
                query: queries.GET_ME,
                data: me,
            })
        }
    })
 
    const onDeleteClick = () => setShowConfirmationModal(true)


    const onConfirmDeleteClick = () => {
        // TODO call mutation
        deleteDeck({ variables: { id } })
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
