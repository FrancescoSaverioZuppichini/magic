import React from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import queries from '../../queries/index'

export default function Deck({ id }) {
    console.log(id)
    const { loading, error, data } = useQuery(queries.GET_DECK, { variables: { id: id } })

    console.log(data)
    return (
        <div>

        </div>
    )
}
