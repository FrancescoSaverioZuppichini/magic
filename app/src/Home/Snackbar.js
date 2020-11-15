import React from 'react'
import { Card, Text, Flex, Box } from 'theme-ui'

export default function Snackbar({ title, text }) {
    return (
        <Box
            sx={{ position: 'absolute', top: 6, zIndex: 999, width: '100%' }}>
            <Flex>
                <Box variant='spacer'/>
                <Card variant='tiny'
                    mr={4}
                    sx={{ minWidth: '150px', padding: 3,
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
