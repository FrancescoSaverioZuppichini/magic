const mongoose = require('mongoose')
const express = require('express')
const jwt = require('express-jwt')
const logger = require('./logger')
const expressLogger = require('express-pino-logger')({ logger })
const { AuthenticationError } = require('apollo-server-express')
const PORT = process.env.PORT || 4000
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'pazzofurioso'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/magic'
const GraphQLserver = require('./GraphQLserver')
const WSServer = require('./WSServer')
process.env.SALT_ROUNDS = 10


mongoose
	.connect(MONGO_URI)
	.then(() => console.log(`🚀 Mongodb connected at ${MONGO_URI}`))
	.catch((e) => logger.error(e))

// Deck.collection.drop()


var app = express()
app.use(express.static('public'))
app.use(expressLogger)
// app.use(jwt({ secret: TOKEN_SECRET, credentialsRequired: false }))
// app.use(function (err, req, res, next) {
// 	if (err.name === 'UnauthorizedError') {
// 		next(new AuthenticationError('Token Expired'))
// 	}
//   })

GraphQLserver.applyMiddleware({ app })
const server = app.listen({ port: PORT }, () => logger.info(`🚀 Server ready at http://localhost:${PORT}${GraphQLserver.graphqlPath}`))
const wsServer = new WSServer(server)
wsServer.start()
