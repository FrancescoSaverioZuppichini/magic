  
const pino = require("pino")

const levels = {
  development: "debug",
  test: "silent",
  production: "silent"
}

const logger = pino({
  prettyPrint: true,
  // level: levels[process.env.NODE_ENV || 'development']
})

module.exports = logger