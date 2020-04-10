const { gql } = require('apollo-server-express')
const { createTestClient } = require("apollo-server-testing")
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('../types/index.js')
const resolvers = require('../resolvers/index.js')
const { expect, assert } = require("chai")
const mongoose = require('mongoose')
const { User } = require('../models/index.js')

const server = new ApolloServer({
    typeDefs,
    resolvers,
})
const { query, mutate } = createTestClient(server)

const MONGO_URI = 'mongodb://localhost/magic-test'


let connection
let user = { username: 'test', email: 'test', password: 'test ' }
const deck = { name: 'test', cards: ["5e838d72cf03cc9263886fe0"] }

const NEW_USER = gql`
    mutation newUser($input: UserInput!){
        newUser(input: $input){
            id
            username
            email
        }
    }
`

const NEW_AUTH = gql`
    mutation newAuth($username: String!, $password: String!) {
        newAuth(username: $username, password: $password){
            token 
            user {
                email
                username
            }
        }
    }
`

const CREATE_OR_UPDATE_DECK = gql`
    mutation createOrUpdateDeck($deck: DeckInput!) {
        createOrUpdateDeck(deck: $deck){
            name
            cards {
                id
            }
            owner {
                username
            }
        }
    }
`


describe("Auth", () => {
    before(async () => {
        connection = await mongoose.connect(MONGO_URI)
        await connection.connection.db.dropDatabase()
        console.log(`🚀 Mongodb connected at ${MONGO_URI}`)
    })
    describe('Auth', () => {
        it('Should create a new user', async () => {
            const res = await mutate({
                mutation: NEW_USER,
                variables: { input: user }
            })
            const newUser = res.data.newUser
            assert.equal(newUser.email, user.email)
            assert.equal(newUser.username, user.username)

            user.id = res.data.newUser.id

        })
        it('Should return error if user already exist', async () => {
            const res = await mutate({
                mutation: NEW_USER,
                variables: { input: user }
            })

            assert.equal(res.errors[0].message, 'Email already used.')
        })

        it('Should return a new JWT', async () => {
            const res = await mutate({
                mutation: NEW_AUTH,
                variables: { username: user.username, password: user.password }
            })

            assert.exists(res.data.newAuth.token)
            assert.isString(res.data.newAuth.token)
            assert.equal(res.data.newAuth.user.username, user.username)
            assert.equal(res.data.newAuth.user.email, user.email)

            //    assert.equal(res.errors[0].message, 'Email already used.')
        })

        it('Should not return a new JWT if no user', async () => {
            const res = await mutate({
                mutation: NEW_AUTH,
                variables: { username: 'foo', password: 'foo' }
            })

            assert.equal(res.errors[0].message, 'User not found.')
        })
    })
    describe("API", async () => {
        const userStored = await (new User(user)).save()
        const AuthServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: async () => ({ user: userStored })
        })

        const testServer = createTestClient(AuthServer)
        const AuthMutate = testServer.mutate
        const AuthQuery = testServer.query
        // before(async () => {
        //     connection = await mongoose.connect(MONGO_URI)
        //     console.log(`🚀 Mongodb connected at ${MONGO_URI}`)
        // })
        describe('Deck', () => {
            it('should create a new deck if does not exist', async () => {
                const res = await AuthMutate({
                    mutation: CREATE_OR_UPDATE_DECK,
                    variables: { deck }
                })
                console.log(res)
            })
        })
    })



    after(async () => {
        await connection.connection.db.dropDatabase()
    })

})

