import React from 'react'
import theme from './theme.js'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { onError } from "@apollo/client/link/error";
import { from, HttpLink } from '@apollo/client';
import { ApolloLink } from 'apollo-link'
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import Landing from './Landing'
import Home from './Home/Home'
import { ThemeProvider } from 'theme-ui'
import { Box } from 'theme-ui'
import queries from './queries/index'
import gql from 'graphql-tag'


const typeDefs = gql`
  extend type Query {
    isAuthenticated: Boolean!
    searchIput: Object
    action: String
  }
`

const resolvers = {}

const myOnErrorLink = onError(({ graphQLErrors, networkError, response }) => {
  console.log(response)
  if (graphQLErrors)
  console.log(graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )

  if (networkError) console.log(`[Network error]: ${networkError}`, 'PORCODIOOOOOOOOO')
})

const myHttpLink = new HttpLink({
  uri: '/graphql',
})

const link = from([myOnErrorLink, myHttpLink])


const client = new ApolloClient({
  link: link,
  request: (operation) => {
    const token = localStorage.getItem('token')
    if (token) {
      console.log(`token = ${token}`)
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      })
    }
  }
},
  typeDefs,
  resolvers)

// should check if a token exist in the local storage
client.writeData({ data: { isAuthenticated: localStorage.getItem('token') !== null } })

// I could use ApolloConsumer and check for isAuthenticated
// https://www.apollographql.com/docs/react/data/local-state/
function App() {
  const { error, data } = useQuery(queries.IS_AUTHENTICATED, { client })
  const { isAuthenticated } = data

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Box variant='app'>
          <BrowserRouter>
            <Route path="/" exact={true}>
              <Landing />
            </Route>
            <Route path="/home" >
              <Home />
            </Route>
            {isAuthenticated && <Redirect to={{ pathname: window.location.pathname == '/' ? '/home/preview' : window.location.pathname }} />}
            {!isAuthenticated && <Redirect to={{ pathname: '/' }} />}

          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
