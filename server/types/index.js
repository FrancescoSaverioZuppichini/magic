const { gql } = require('apollo-server-express')

const typeDefs = gql`
directive @isAuthenticated on FIELD_DEFINITION

type Query {
    book: Book
    user: User
    secret: String @isAuthenticated
    hello: String
}

type User {
    id: ID!
    email: String,
    books: [Book]
  }

type Book {
    cursor: String
    id: ID!
    text: String!
    author: User
}

type Auth {
    token: String
    user: User
  }

type Mutation {
    newUser(email: String!, password: String!): User
    newAuth(email: String!, password: String!): Auth
  }
`
module.exports = typeDefs