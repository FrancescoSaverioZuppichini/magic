const mongoose = require('mongoose')
const express = require('express')
const jwt = require('express-jwt')
const logger = require('./logger')
const expressLogger = require('express-pino-logger')({ logger })
<<<<<<< HEAD
const { AuthenticationError } = require('apollo-server-express')
const PORT = process.env.PORT || 4000
const NODE_ENV = process.env.NODE_ENV || 'development'
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'pazzofurioso'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/magic'
=======

const PORT = process.env.PORT || 4000
const NODE_ENV = process.env.NODE_ENV || 'development'
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'pazzofurioso'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/tes'
>>>>>>> c5bea406fed5d371065eba64def74ff14308c9a7
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
app.use(jwt({ secret: TOKEN_SECRET, credentialsRequired: false }))
<<<<<<< HEAD
// app.use(function (err, req, res, next) {
// 	if (err.name === 'UnauthorizedError') {
// 	 throw new AuthenticationError('Token Expired')
	 
// 	}
//   })
=======
>>>>>>> c5bea406fed5d371065eba64def74ff14308c9a7

GraphQLserver.applyMiddleware({ app })
const server = app.listen({ port: PORT }, () => logger.info(`🚀 Server ready at http://localhost:${PORT}${GraphQLserver.graphqlPath}`))
const wsServer = new WSServer(server)
wsServer.start()
