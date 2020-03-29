const { gql } = require('apollo-server-express')

const typeDefs = gql`
	directive @isAuthenticated on FIELD_DEFINITION

	type Query {
		user: User
    me: User
		secret: String @isAuthenticated
		hello: String
    deck: Deck
    decks: [Deck]
    card: Card
    cards: [Cards]
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
    newDeck(name: String!): Deck
    updateDeck(name: String!, cards: [Card]): Deck
    newRoom(name: String!, users: [Users]) : Room
    joinRoom(name: String!): Room
	}
`
module.exports = typeDefs
