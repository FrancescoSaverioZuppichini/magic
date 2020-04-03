const { gql } = require('apollo-server-express')
const { createTestClient } = require("apollo-server-testing")
const server = require('../server')
const { expect, assert } = require("chai")
const mongoose = require('mongoose')
const { query, mutate } = createTestClient(server)

const MONGO_URI = 'mongodb://localhost/magic-test'


let connection
const user = { username: 'test', email: 'test', password: 'test ' }

const NEW_USER = gql`
    mutation newUser($input: UserInput!){
        newUser(input: $input){
            username
            email
        }
    }
`

const NEW_AUTH = gql`
    mutation newAuth($email: String!, $password: String!) {
        newAuth(email: $email, password: $password){
            token 
            user {
                email
            }
        }
    }
`



describe("API", () => {
    before(async () => {
        connection = await mongoose.connect(MONGO_URI)
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
                variables: { email: user.email, password: user.password }
            })  

            assert.exists(res.data.newAuth.token)
            assert.isString(res.data.newAuth.token)
            assert.equal(res.data.newAuth.user.email, user.email)

        //    assert.equal(res.errors[0].message, 'Email already used.')
        })

        it('Should not return a new JWT if no user', async () => {
            const res = await mutate({
                mutation: NEW_AUTH, 
                variables: { email: 'foo', password: 'foo' }
            })  

           assert.equal(res.errors[0].message, 'User not found.')
        })
    })

    after(async () => {
        await connection.connection.db.dropDatabase()
    })
})
