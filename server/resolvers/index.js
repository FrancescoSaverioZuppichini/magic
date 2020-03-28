const { User } = require("../models/index.js")


const resolvers = {
    Query: {
      hello: () => 'world',
      user(ctx, { id }) {
        return User.findById(id)
      },
      book(ctx, { id }) { 
          return { }
      },
      secret(ctx, { }, { user }) {

          return `Psssh ${user.email}`
      }
    },
    Mutation: {
        async newUser(obj, { email, password }) {
          const user = await User({ email, password })
          await user.isUniqueOrAbort(email)
          user.save()
          return user
        },
        async newAuth(obj, { email, password }, ctx) {
          const user = await User.find().byEmailAndPassword({ email, password })
          const token = user.generateJWT()
          return { user, token }
        }
      }
  }

  module.exports = resolvers