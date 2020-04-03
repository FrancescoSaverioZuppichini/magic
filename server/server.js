const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./types/index.js')
const resolvers = require('./resolvers/index.js')
const { AuthDirective } = require('./directives/index.js')
const { Deck } = require('./models')

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

module.exports = server