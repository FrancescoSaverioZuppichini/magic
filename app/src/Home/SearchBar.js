import React, { useRef } from 'react'
import { Input, IconButton, Box } from 'theme-ui'

function SearchBar({ onSearchClick}) {
    const input = useRef(null)


    return (
        <Box sx={{ position: 'relative' }}>
            <Input variant='searchbar' placeholder='{ "name" : "search me", "type": "creature" }' ref={input}></Input>
            <IconButton onClick={() => onSearchClick(input.current.value)}
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
