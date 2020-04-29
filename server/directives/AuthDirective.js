const { SchemaDirectiveVisitor, AuthenticationError, } = require('apollo-server-express')
const { defaultFieldResolver } = require("graphql")
const jwt = require('jsonwebtoken')

const { User } = require('../models/index')
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'pazzofurioso'

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
        const { resolve = defaultFieldResolver } = field
        field.resolve = async(...args) => {
            const ctx = args[2]
            let tokenRaw = ctx.req.headers['x-access-token'] || ctx.req.headers['authorization']; // Express headers are auto converted to lowercase
            let [, token] = tokenRaw.split('Bearer ')
            console.log(token)
            if(!token) throw new AuthenticationError('No token provided.')
            // check the token, data will hold the user id
            const { data } = await jwt.verify(token, TOKEN_SECRET)
            // we get the id from the token
            const user = await User.findById(data)
            if(user == null) throw new AuthenticationError('User does not exist.')
            ctx.user = user
            // apply default resolve
            return resolve.apply(this, args);
        }
      }
}

module.exports = AuthDirective