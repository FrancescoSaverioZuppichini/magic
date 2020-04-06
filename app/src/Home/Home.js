import React from 'react'
import NavBar from './NavBar'
import queries from '../queries'
import { useQuery } from '@apollo/react-hooks'

function Home() {
    const {error, data } = useQuery(queries.GET_ME)
    // if error here we have to redirect to login!
    return (
        <div>
            {data && <NavBar user={data.me}/>}
        </div>
    )
}

export default Home
