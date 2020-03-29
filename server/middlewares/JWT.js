const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

const errors = { TOKEN_NOT_PROVIDED: { message: "Token not provided" }}
/**
 * @deprecated We used a directive instead, see 'ROOT/directives/AuthDirective.js
 */
async function JWTProtected(req, res, next) {
  try {
    if (!req.token) throw errors.TOKEN_NOT_PROVIDED

    jwt.verify(req.token, process.env.TOKEN_SECRET);

    var userId = jwt.decode(req.token, { complete: true })
    var user = await User.findById(userId)
    req.user = user
    
    delete req.user.password
    
    return next()
  } catch (err) {
    err.status = 401
    next(err)
  }
}

module.exports = JWTProtected