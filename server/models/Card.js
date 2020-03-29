const mongoose = require('mongoose')

const CardSchema = mongoose.Schema({
    name: { type: String, required: true }
})

module.exports = mongoose.model('Card', CardSchema)
