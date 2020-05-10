import React from 'react'
import { Card, Text, Flex, Box } from 'theme-ui'

export default function Snackbar({ title, text }) {
    return (
        <Box
            sx={{ position: 'absolute', bottom: 4, zIndex: 99, width: '100%' }}>
            <Flex sx={{ justifyContent: 'center' }}>
                <Card variant='tiny'
                    sx={{ minWidth: '150px', padding: 2,
                    boxShadow: '-4px -4px 8px rgba(0, 0, 0, 0.09), 0px 4px 4px rgba(0, 0, 0, 0.25)'
                    }}>
                    <Flex sx={{ flexDirection: 'column', textAlign:'center',  }}>
                        {title && <Text sx={{ fontSize: 2 }}>{title}</Text>}
                        {text && <Text pt={2} sx={{ fontSize: 1 }}>{text}</Text>}
                    </Flex>
                </Card>

            </Flex>
        </Box>
    )
}
