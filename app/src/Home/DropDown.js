import React from 'react'
import { Box, Card } from 'theme-ui'

export default function DropDown({ children, open, width }) {
    /**
     * An easy peasy dropdown.
     */
    return (
        <Box>
            {open && <Card sx={{
                position: 'absolute',
                left: -width + 24, 
                top: 24,
                width: width
            }} variant='tiny' p={3}>
                {children}
            </Card>}
        </Box>
    )
}
