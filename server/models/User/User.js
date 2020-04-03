const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server-express')

const errors = {
  EMAIL_ALREADY_IN_USE: () => new AuthenticationError( "Email already used."),
  PASSWORD_NOT_VALID: () => new AuthenticationError('Password or Email not valid.'),
  USER_NOT_FOUND: () => new AuthenticationError('User not found.'),
  USER_NOT_ACTIVATED: () => new AuthenticationError('The user is registered but not activated yet!')

}

const UserSchema = new mongoose.Schema({ 
    username: { type: String, required: true },
    password: { type : String, required : true},
    email: {type : String, unique : true, required : true, index: true},
    decks: [ { type: mongoose.Schema.Types.ObjectId, ref : 'Deck' } ]
})

UserSchema.methods.passwordIsValid = (toCheck, valid) => bcrypt.compareSync(toCheck, valid)

/**
 * Check if the current use is unique or abort
 */
UserSchema.methods.isUniqueOrAbort = async function() {
    var user = await this.model('User').findOne({ email: this.email })
    if(user != null) throw errors.EMAIL_ALREADY_IN_USE()
    return user
}

/**
 * Generate a JWT using the user id
 */
UserSchema.methods.generateJWT = function() {
  return jwt.sign({ data: this._id }, process.env.TOKEN_SECRET || 'pazzo furioso', { expiresIn: '7d' })
}

/**
 * Hash the password before saving the user
 */
UserSchema.pre('save', function(next) {
    this._doc.password = bcrypt.hashSync(this._doc.password, parseInt(process.env.SALT_ROUNDS))
    next()
  })

/**
 * Utility method that get one user from email and password. 
 * User.find().ByEmailAndPassword({ email: foo, password: baa })
 */
UserSchema.query.byEmailAndPassword = async function({ email, password }){
  const user = await this.findOne({
    email: email
  })

  if(!user) throw errors.USER_NOT_FOUND()
  if(!user.activated) errors.USER_NOT_ACTIVATED()
  if (!user) throw errors.PASSWORD_NOT_VALID()
  if (!user.passwordIsValid(password, user.password)) throw errors.PASSWORD_NOT_VALID()
  
  return user
}


module.exports = mongoose.model('User', UserSchema)