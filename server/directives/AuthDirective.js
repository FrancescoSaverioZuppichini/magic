const { SchemaDirectiveVisitor, AuthenticationError, ApolloError } = require('apollo-server')
const { defaultFieldResolver } = require("graphql")
const jwt = require('jsonwebtoken')
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'pazzofurioso'

const { User } = require('../models/index')

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
        const { resolve = defaultFieldResolver } = field
        field.resolve = async (...args) => {
            const ctx = args[2]
            // get the token from the request
            const token = ctx.req.headers['authorization'].split('Bearer ')[1]
            if(!token) throw new AuthenticationError('No token provided.', { code: 401 })

            try {
                jwt.verify(token, TOKEN_SECRET)
            } catch (err) {
                throw new AuthenticationError(err.message)
            }
            // the user id is stored in the token data
            const userId = jwt.verify(token, TOKEN_SECRET).data
            const user = await User.findById(userId)
                       if (user == null) throw new AuthenticationError('User does not exist.')
            ctx.user = user
            // apply default resolve
            return resolve.apply(this, args);
        }
    }
}

module.exports = AuthDirective