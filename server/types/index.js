const { gql } = require('apollo-server-express')

const typeDefs = gql`
	directive @isAuthenticated on FIELD_DEFINITION

	type Query {
		user: User
    me: User @isAuthenticated
		secret: String @isAuthenticated
		hello: String
    deck: Deck @isAuthenticated
    decks: [Deck]
    card(id: ID!): Card
    cards(filter: CardInput): [Card]
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
    owner: User
	}

	type Card {
    id: ID!
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

  input DeckInput { 
    name: String!
    cards: [CardInput]
  }

  input CardInput {
    id: ID
    name: String
  }

  input UserInput {
    id: ID!
  }

	type Mutation {
		newUser(username: String!, email: String!, password: String!): User
		newAuth(email: String!, password: String!): Auth
    newDeck(deck: DeckInput): Deck @isAuthenticated
    newCard(card: CardInput): Card
    updateDeck(deck: DeckInput): Deck @isAuthenticated
    newRoom(name: String!, user: UserInput) : Room
    joinRoom(name: String!): Room
	}
`
module.exports = typeDefs
