const { SchemaDirectiveVisitor, AuthenticationError, } = require('apollo-server-express')
const { defaultFieldResolver } = require("graphql")

const { User } = require('../models/index')

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
        const { resolve = defaultFieldResolver } = field
        field.resolve = async(...args) => {
            const ctx = args[2]
            // express-jwt stored the payload of the jwt into req.user.data
            if(!ctx.req.user) throw new AuthenticationError('No token provided.')
            // we get the id from the token
            const userId = ctx.req.user.data
            const user = await User.findById(userId)
            if(user == null) throw new AuthenticationError('User does not exist.')
            ctx.user = user
            // apply default resolve
            return resolve.apply(this, args);
        }
      }
}

module.exports = AuthDirective