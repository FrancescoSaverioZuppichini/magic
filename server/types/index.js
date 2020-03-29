const { gql } = require('apollo-server-express')

const typeDefs = gql`
	directive @isAuthenticated on FIELD_DEFINITION

	type Query {
		user: User
    me: User @isAuthenticated
		secret: String @isAuthenticated
		hello: String
    deck(id: ID!): Deck @isAuthenticated
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
    id: ID!
    name: String!
    cards: [Card]
    owner: User
	}

	type Card {
    id: ID!
    name: String!
    artist: String!
    colorIdentity: [String]!
    colors: [String]!
    convertedManaCost: Int!
    faceConvertedManaCost: Int!
    hand: String
    hasNoDeckLimit: Boolean
    layout: String!
    life: String
    loyalty: String
    manaCost: String!
    power: Int!
    subtypes: [String!]
    supertypes: [String!]
    text: String!
    toughness: Int!
    types: [String!]
    scryfallOracleId: String!
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
