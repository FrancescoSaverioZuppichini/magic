const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    quote: Quote
    author: Author
    tag: Tag
    quotes(cursor: String): [Quote]
    authors: [Author]
    tags: [Tag]
    hello: String

}

type Quote {
    cursor: String
    id: ID!
    text: String!
    tags: [Tag]
    author: Author
}

type Author {
    id: ID!
    name: String!
    quotes: [Quote]
}

type Tag{
    id: ID!
    name: String!
    quotes: [Quote]
}
`
module.exports = typeDefs