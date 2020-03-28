const { ApolloServer, gql } = require('apollo-server-express')
const mongoose = require('mongoose')
const express = require('express')
const { Author, Quote, Tag} = require('./models/index')
const morgan = require('morgan')

const typeDefs = require('./types/index.js')
const resolvers = require('./resolvers/index.js')

const MONGO_URL = 'mongodb://localhost/test'
const PORT = process.env.PORT || 4000

mongoose.connect(MONGO_URL)
.then(() => console.log(`🚀 Mongodb connected at ${MONGO_URL}`))
.catch((e) => consolg.error(e))


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

var app = express()
app.use(express.static('public'));

app.use(morgan('combined'))
server.applyMiddleware({ app }) 

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
)