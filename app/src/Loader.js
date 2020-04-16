import React from 'react'
import { Box } from 'theme-ui'

export default function Loader() {
    return (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100vh' }}>
            <Box sx={{
                backgroundColor: '#A29FFF',
                height: '6px',
                zIndex: 9999,
                width: '33%',
                position: 'relative',
                animation: 'progress-indeterminate 2s linear infinite'
            }}></Box>
        </Box>
    )
}
