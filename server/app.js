const { ApolloServer, gql } = require('apollo-server-express')
const mongoose = require('mongoose')
const express = require('express')
const { Author, Quote, Tag} = require('./models/index')
const morgan = require('morgan')
const jwt = require("express-jwt")

const typeDefs = require('./types/index.js')
const resolvers = require('./resolvers/index.js')
const { AuthDirective } = require('./directives/index.js')

const MONGO_URL = 'mongodb://localhost/test'
const PORT = process.env.PORT || 4000
const NODE_ENV = process.env.NODE_ENV || "development"
process.env.TOKEN_SECRET = process.env.TOKEN_SECRET || 'pazzofurioso'

process.env.SALT_ROUNDS = 10

mongoose.connect(MONGO_URL)
.then(() => console.log(`🚀 Mongodb connected at ${MONGO_URL}`))
.catch((e) => consolg.error(e))


const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
		isAuthenticated: AuthDirective
	},
	context: ({ req }) => ({
    // we store the request on the context in order to use them later inside the directives
		req 
	})
})

var app = express()
app.use(express.static('public'));

app.use(morgan('combined'))
app.use(jwt({ secret: process.env.TOKEN_SECRET, credentialsRequired: false }))

server.applyMiddleware({ app }) 

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
)