import React from 'react';
import logo from './logo.svg';
import './App.css';
import theme from './theme.js'
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter, Route, Link } from "react-router-dom";

const client = new ApolloClient({
  uri: '/graphql',
})


function App() {
  return (
    <ApolloProvider client={client}>
        <BrowserRouter>
          <Route path="/" exact={true}>
            index
          </Route>
          <Route path="/home">
            home
          </Route>
        </BrowserRouter>
    </ApolloProvider>
  )
}

export default App;
