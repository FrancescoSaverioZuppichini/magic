import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import theme from './theme.js'
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import Index from './Index'
import { ThemeProvider } from 'theme-ui'
import { Box } from 'theme-ui'

const client = new ApolloClient({
  uri: '/graphql',
})

function App() {
  const [isAuthenticated, _] = useState(false)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Box variant='app'>
        <BrowserRouter>
          <Route path="/">
            <Index />
          </Route>
          <Route path="/home">
            home
          </Route>
          {isAuthenticated && <Redirect to={{ pathname: '/home' }} />}
        </BrowserRouter>
        </Box>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
