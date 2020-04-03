const { ApolloServer, gql } = require('apollo-server-express')
const mongoose = require('mongoose')
const express = require('express')
const jwt = require('express-jwt')
const logger = require('./logger')
const expressLogger = require('express-pino-logger')({ logger })
const typeDefs = require('./types/index.js')
const resolvers = require('./resolvers/index.js')
const { AuthDirective } = require('./directives/index.js')
const { Deck } = require('./models')
const PORT = process.env.PORT || 4000
const NODE_ENV = process.env.NODE_ENV || 'development'
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'pazzofurioso'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/tes'
process.env.SALT_ROUNDS = 10

mongoose
	.connect(MONGO_URI)
	.then(() => console.log(`🚀 Mongodb connected at ${MONGO_URI}`))
	.catch((e) => logger.error(e))

// Deck.collection.drop()

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
app.use(express.static('public'))
app.use(expressLogger)
app.use(jwt({ secret: TOKEN_SECRET, credentialsRequired: false }))

server.applyMiddleware({ app })

app.listen({ port: PORT }, () => logger.info(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`))
