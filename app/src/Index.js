import React from 'react'
import { Flex, Box, Input, Text, Button, Card } from 'theme-ui'

function Index() {
    return (
        <Flex sx={{ flexDirection: ['column', 'column', 'row'], height: '100%' }}>
            <Card variant='viewport' sx={{
                flex: 1,
                backgroundColor: 'white',
            }}>
                  <Flex sx={{ flexDirection: 'column', height: '100%' }}>
                    <Box variant='spacer'/>
                    <Box px={[2,2]} sx={{maxWidth: '400px', width: '80%', alignSelf: 'center'}}>
                        <Input mb={3}></Input>
                        <Input mb={3}></Input>
                        <Input ></Input>
                    </Box>
                    <Box variant='spacer' />
                </Flex>
            </Card>
            <Card variant='viewport' sx={{ flex: 1, backgroundColor: 'background' }}>
                <Flex sx={{ flexDirection: 'column', height: '100%' }}>
                    <Box variant='spacer' />
                    <Box>
                        <Text sx={{ fontSize: 5, textAlign: 'center' }}>Play Magic <strong>effortless</strong></Text>
                        <Flex py={[2, 2, 4]} sx={{ alignItems: 'center' }}>
                            <Box variant='spacer' />
                            <Text px={2} sx={{ fontSize: 4 }}>just</Text>
                            <Button variant='primary'><Text>Sing Up</Text></Button>
                            <Text px={2} sx={{ fontSize: 4 }}>or</Text>
                            <Button variant='outline'><Text>Sing In</Text></Button>
                            <Box variant='spacer' />
                        </Flex>

                    </Box>
                    <Box variant='spacer' />
                </Flex>
            </Card>
        </Flex>
    )
}

export default Index
