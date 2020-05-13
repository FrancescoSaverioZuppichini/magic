import React from 'react'
import { Card, Text, Flex, Box } from 'theme-ui'

export default function Snackbar({ title, text }) {
    return (
        <Box
            sx={{ position: 'absolute', bottom: 4, zIndex: 999, width: '100%' }}>
            <Flex sx={{ justifyContent: 'center' }}>
                <Card variant='tiny'
                    sx={{ minWidth: '150px', padding: 2,
                    borderWidth:  '0px',
                    backgroundColor: 'primary',
                    }}>
                    <Flex sx={{ flexDirection: 'column', textAlign:'center', color:'white' }}>
                        {title && <Text sx={{ fontSize: 2 }}>{title}</Text>}
                        {text && <Text py={1} sx={{ fontSize: 1 }}>{text}</Text>}
                    </Flex>
                </Card>
            </Flex>
        </Box>
    )
}
