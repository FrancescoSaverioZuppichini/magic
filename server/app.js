const express = require('express')
const graphqlHTTP = require('express-graphql')
const { GraphQLObjectType, 
    GraphQLString, 
    buildSchema, 
    GraphQLSchema,
    GraphQLID, 
    GraphQLList,
    GraphQLInt } = require('graphql')
const { Author, Quote, Tag} = require('./models/index')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')

// const Quote = require('./models/Quote.js')
// Construct a schema, using GraphQL schema language
// The root provides a resolver function for each API endpoint

const QuoteType = new GraphQLObjectType({
    name: 'Quote',
    fields: () => ({
        id: { type: GraphQLID },
        text: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve(source, args) {
                return Author.findById(source.author)
            }
        },
        tags: {
            type: new GraphQLList(TagType),
            resolve(source, args) {
                return source.tags.map(id => Tag.findById(id))
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        quotes : {
            type : new GraphQLList(QuoteType),
            resolve(source, args) {
                return Quote.find({ author: source.id })
            }
        }
    })
})

const TagType = new GraphQLObjectType({
    name: 'Tag',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        quotes : {
            type : new GraphQLList(QuoteType),
            resolve(source, args) {
                console.log(source.popu)
                return Quote.find({ tags: { $in: source.id } })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQuery',

    fields: {
        quote: {
            type: QuoteType,
            args: { id: { type : GraphQLID } },
            resolve(obj, {id}){
                return Quote.findById(id)
            }

        },
        author: {
            type: AuthorType,
            args: { id: { type : GraphQLID } },
            resolve(source, {id}){
                return Author.findById(id)
            }
        },
        tag : {
            type: TagType,
            args: { id: { type : GraphQLID } },
            resolve(source, {id}){
                return Tag.findById(id)
            }
        },
        quotes: {
            type: new GraphQLList(QuoteType),
            resolve(source, { limit, offset }) {
                console.log(limit, offset)
                return Quote.find({}).skip(offset).limit(limit)
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                return Author.find({})
            }
        },
        tags: {
            type: new GraphQLList(TagType),
            resolve() {
                return Tag.find({})
            }
        }
    }
})


const schema = new GraphQLSchema({
    query : RootQuery
})


var app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: RootQuery,
  graphiql: true,
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql');