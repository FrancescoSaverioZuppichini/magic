const { gql } = require('apollo-server-express')

const typeDefs = gql`
	directive @isAuthenticated on FIELD_DEFINITION

	type Query {
		user: User
		secret: String @isAuthenticated
		hello: String
	}

	type User {
		id: ID!
		username: String!
		email: String!
		decks: [Deck]
	}

	type Deck {
    name: String!
    cards: [Card]
	}

	type Card {
    name: String!
	}

	type Room {
    name: String!,
    users: [User]
    active: Boolean
	}

	type Auth {
		token: String
		user: User
	}

	type Mutation {
		newUser(username: String!, email: String!, password: String!): User
		newAuth(email: String!, password: String!): Auth
	}
`
module.exports = typeDefs
