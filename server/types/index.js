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
    cards(filter: CardFilter, cursor: CursorInput!): CardConnection
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
    name: String!,
    artist: String,
    colorIndicator:  [String],
    colors: [String],
    manaCost: [String],
    convertedManaCost: Float,
    text: String,
    power: Float
,   toughness: Float,
    type: String,
    types: [String],
    subtypes: [String],
    supertypes: [String],
    scryfallId: String,
    layout: String,
    life: String,
    loyalty: Float
	}

  type CardConnection {
    cards: [Card]!
    hasMore: Boolean!
    cursor: Cursor
  }

  type Cursor {
    limit: Int!
    skip: Int!
  }

  input CursorInput {
    limit: Int!
    skip: Int!
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

  input UserInput{
    username: String!
    email: String!, 
    password: String!
  }

  input DeckInput { 
    id: ID!
    name: String!
    cards: [ID!]
  }

  input CardFilter {
    name: String
    type: String
    colors: [String]
    convertedManaCost: Int
    toughness: Int
    power: Int
  }
 

	type Mutation {
		newUser(input: UserInput!): User
		newAuth(email: String!, password: String!): Auth
    newDeck(deck: DeckInput): Deck @isAuthenticated
    newCard(card: CardFilter): Card
    updateDeck(deck: DeckInput): Deck @isAuthenticated
    newRoom(name: String!, user: ID!) : Room
    joinRoom(name: String!): Room
	}
`
module.exports = typeDefs
