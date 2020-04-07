import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import theme from './theme.js'
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import Index from './Index'
import Home from './Home/Home'
import { ThemeProvider } from 'theme-ui'
import { Box } from 'theme-ui'
import queries from './queries/index'
import gql from 'graphql-tag';


const typeDefs = gql`
  extend type Query {
    isAuthenticated: Boolean!
    searchIput: Object
  }
`;

const resolvers = {};

const client = new ApolloClient({
  uri: '/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token')
    console.log(`token = ${token}`)
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
},
  typeDefs,
  resolvers)

// should check if a token exist in the local storage
client.writeData({ data: { isAuthenticated: !!localStorage.getItem('token') } })

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
              <Index />
            </Route>
            <Route path="/home" >
              <Home />
            </Route>
            {isAuthenticated && <Redirect to={{ pathname: '/home' }} />}
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
