import React, { useRef } from 'react'
import { Input, IconButton, Box } from 'theme-ui'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'

function SearchBar() {
    const input = useRef(null)
    const history = useHistory()
    const location = useLocation()

    let { filter } = queryString.parse(location.search)
    // restore old search value!
    if (filter) input.current.value = filter

    const searchCards = () => {
        const filter = JSON.parse(input.current.value)
        // call guery
        history.push(
            {
                pathname: '/home',
                search: `?${queryString.stringify({ 'filter': input.current.value })}`
            }
        )
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <Input variant='searchbar' placeholder='{ "name" : "search me", "type": "creature" }' ref={input}></Input>
            <IconButton onClick={searchCards}
                sx={{
                    position: 'absolute', top: 0, right: 0, bg: 'dark', height: '100%'
                    , borderRadius: '0px 16px 16px 0px', outline: 'none',
                    width: '40px'
                }}>
                <img height='24px' src='/search-white-18dp.svg'></img>
            </IconButton>
        </Box>
    )
}

export default SearchBar
