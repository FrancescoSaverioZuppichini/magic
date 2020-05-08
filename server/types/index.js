const { gql } = require('apollo-server-express')

const typeDefs = gql`
	directive @isAuthenticated on FIELD_DEFINITION

	type Query {
		user: User
    me: User @isAuthenticated
		secret: String @isAuthenticated
		hello: String
    deck(id: ID!): Deck @isAuthenticated
    decks(filter: DeckFilter, cursor: CursorInput!): DeckConnection
    card(id: ID!): Card 
    cards(filter: CardFilter, cursor: CursorInput!): CardConnection
    cardsInDeck(filter: CardFilter, cursor: CursorInput!, deck: ID!): CardConnection
    room(id: ID!): Room
	}

	type User {
		id: ID!
		username: String!
		email: String!
		decks: [Deck]
    rooms: [Room]
	}

  type DeckColor{
    count: Int
    color: String
  }

	type Deck {
    id: ID!
    name: String!
    cards: [Card]
    owner: User
    createdAt: String
    default: Boolean
    colors: [DeckColor]

	}

	type Card {
    id: ID
    name: String!,
    artist: String,
    colorIndicator:  [String],
    colors: [String],
    manaCost: [String],
    convertedManaCost: Float,
    text: String,
    power: Float,
    toughness: Float,
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

  type DeckConnection {
    decks: [Deck]!
    hasMore: Boolean!
    cursor: Cursor
  }

  type Cursor {
    limit: Int!
    skip: Int!
  }

	type Room {
    id: ID!
    name: String!
    owner: User
    users: [User]
    readyUsers: [User]
    decks: [Deck]
    active: Boolean
    createdAt: String

	}

	type Auth {
		token: String
		user: User
	}

  input DeckInput { 
    id: ID
    name: String!
    cards: [ID!]
  }

  input CardFilter {
    name: String
    type: String
    colors: [String]
    convertedManaCost: String
    toughness: Int
    power: Int
  }

  input DeckFilter {
    name: String
    type: String
    colors: [String]
    convertedManaCost: String
    toughness: Int
    power: Int
  }

  input CursorInput {
    limit: Int!
    skip: Int!
  }

  input UserInput {
    id: ID
    email: String!
    username: String!
    password: String!
  }

  input RoomInput {
    name: String!
  }

	type Mutation {
		newUser(input: UserInput): User
		newAuth(username: String!, password: String!): Auth
    newDeck(deck: DeckInput): Deck @isAuthenticated
    deleteDeck(id: ID!): Deck @isAuthenticated
    newCard(card: CardFilter): Card @isAuthenticated
    newRoom(room: RoomInput) : Room @isAuthenticated
    deleteRoom(id: ID!): Room @isAuthenticated
    joinRoom(name: String!): Room
	}
`
module.exports = typeDefs
