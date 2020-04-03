import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import theme from './theme.js'
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

const client = new ApolloClient({
  uri: '/graphql',
})

function App() {
  const [isAuthenticated, _] = useState(false)

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route path="/" exact={true}>
          index
          </Route>
        <Route path="/home">
          home
          </Route>
        {isAuthenticated && <Redirect to={{ pathname: '/home' }} />}
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App;
