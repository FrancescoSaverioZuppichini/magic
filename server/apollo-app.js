const { ApolloServer, gql } = require('apollo-server-express')
const mongoose = require('mongoose')
const express = require('express')
const { Author, Quote, Tag} = require('./models/index')
var morgan = require('morgan')

const MONGO_URL = 'mongodb://localhost/test'
mongoose.connect(MONGO_URL)
.then(() => console.log(`🚀 Mongodb connected at ${MONGO_URL}`))
.catch((e) => consolg.error(e))

const typeDefs = require('./schemas/schema.js')

const resolvers = {
  Query: {
    hello: () => 'world',
    quote(obj, {id}) {
            return Quote.findById(id)
        },
    author(source, {id}) {
            return Author.findById(id)
        },
    tag(source, {id}) {
            return Tag.findById(id)
    },
    quotes(source, { cursor }) {
            options = cursor ? { _id : { $gt: cursor} } : {}
            console.log(options)
            return Quote.find(options).limit(30)
        },
    authors() {
            return Author.find({})
    },
    tags() {
            return Tag.find({})
        }
  },
  Quote: {
    author(source, args) {
            return Author.findById(source.author)
    },
    tags(source, args) {
            return source.tags.map(id => Tag.findById(id))
    }
  },
  Author: {
    quotes(source, args) {
            return Quote.find({ author: source.id })
        }
    },
  Tag: {
      quotes(source) {
        return Quote.find({ tags: { $in: source.id } })
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
var app = express()
app.use(express.static('public'));

app.use(morgan('combined'))
server.applyMiddleware({ app }) 

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)