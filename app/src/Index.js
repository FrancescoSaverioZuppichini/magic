import React, { useState, useRef } from 'react'
import { Flex, Box, Input, Text, Button, Card, Link } from 'theme-ui'
import { useLocation, useParams, Redirect } from "react-router-dom"
import queries from './queries/index'
import mutations from './mutations/index'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'

const Left = ({ active, doSignUp, doSignIn, onSignUpClick, onSignInClick }) => {
    const usernameInput = useRef(null)
    const emailInput = useRef(null)
    const passwordInput = useRef(null)

    const withUser = (func) => {
        let user = {}
        user.username = usernameInput.current.value
        if (!!emailInput.current) user.email = emailInput.current.value
        user.password = passwordInput.current.value
        return func(user)
    }

    return (
        <Card variant='viewport' sx={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <Flex sx={{ flexDirection: 'column', height: '100%' }}>
                <Box variant='spacer' />
                <Box px={[2, 2]} sx={{ maxWidth: '400px', width: '80%', alignSelf: 'center' }}>
                    <Input mb={3} placeholder='username' ref={usernameInput}></Input>
                    {active === 'signUp' && <Input mb={3} placeholder='email' ref={emailInput}></Input>}
                    <Input mb={3} type="password" placeholder='password' ref={passwordInput}></Input>
                    {active === 'signIn' && <Button onClick={() => withUser(doSignIn)} variant='primary' sx={{ width: '100%' }}>
                        Sign In
                    </Button>}
                    {active === 'signUp' && <Button onClick={() => withUser(doSignUp)} variant='primary' sx={{ width: '100%' }}>
                        Sign Up
                    </Button>}
                    <Box my={4} />
                    {active === 'signIn' && <Text>New? <Link variant='bold' onClick={onSignUpClick}>Sign up </Link> </Text>}
                    {active === 'signUp' && <Text>Have already an account? <Link variant='bold' onClick={onSignInClick}>Sign in! </Link> </Text>}
                </Box>
                <Box variant='spacer' />
            </Flex>
        </Card>
    )
}

const Right = ({ active, onSignUpClick, onSignInClick }) => (
    <Card variant='viewport' sx={{ flex: 1, backgroundColor: 'background' }}>
        <Flex sx={{ flexDirection: 'column', height: '100%' }}>
            <Box variant='spacer' />
            <Box>
                <Text sx={{ fontSize: 5, textAlign: 'center' }}>Play Magic <strong>effortless</strong></Text>
                <Flex py={[3, 3, 4]} sx={{ alignItems: 'center' }}>
                    <Box variant='spacer' />
                    <Text px={2} sx={{ fontSize: 4 }}>just</Text>
                    <Button
                        onClick={onSignUpClick}
                        variant={active === 'signUp' ? 'primary' : 'outline'}>
                        <Text>Sign up</Text>
                    </Button>
                    <Text px={2} sx={{ fontSize: 4 }}>or</Text>
                    <Button
                        onClick={onSignInClick}
                        variant={active === 'signIn' ? 'primary' : 'outline'}>
                        <Text>Sign In</Text>
                    </Button>
                    <Box variant='spacer' />
                </Flex>

            </Box>
            <Box variant='spacer' />
        </Flex>
    </Card>
)


function Index() {
    const client = useApolloClient()
    const [active, setActive] = useState('signUp')
    let currentInput

    const [newAuth, { newAuthError}] = useMutation(mutations.NEW_AUTH, {
        onCompleted({ newAuth }) {
            // update the local cache
            const token = newAuth.token
            localStorage.setItem("token", token)
            client.writeData({ data: { isAuthenticated: true } })
        }
    })

    const [newUser, { newUserError }] = useMutation(mutations.NEW_USER, {
        onCompleted({ newUser }) {
            console.log(`new User ${newUser.username} created`)
            setActive('signIn')
        }
    })

    const onSignInClick = () => setActive('signIn')
    const onSignUpClick = () => setActive('signUp')

    const doSignUp = (input) => newUser({ variables: { input } })
    const doSignIn = (user) => newAuth({ variables: { ...user } })


    return (
        <Flex sx={{ flexDirection: ['column-reverse', 'column-reverse', 'row'], height: '100%' }}>
            <Left
                onSignUpClick={onSignUpClick}
                onSignInClick={onSignInClick}
                doSignUp={doSignUp}
                doSignIn={doSignIn}
                active={active}
            />
            <Right
                onSignUpClick={onSignUpClick}
                onSignInClick={onSignInClick}
                active={active}
            />
            {/* {isAuthenticated && <Redirect to={{ pathname: '/home' }} />} */}
        </Flex>
    )
}

export default Index
