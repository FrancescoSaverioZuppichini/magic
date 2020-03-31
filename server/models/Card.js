const mongoose = require('mongoose')

const CardSchema = mongoose.Schema({
    name: { type: String, required: true },
    artist: String,
    colorIndicator:  [String],
    colors: [String],
    manaCost: [String],
    convertedManaCost: Number,
    text: String,
    power: Number
,   toughness: Number,
    type: String,
    types: [String],
    subtypes: [String],
    supertypes: [String],
    scryfallId: String,
    layout: String,
    life: String,
    loyalty: Number
})

module.exports = mongoose.model('Card', CardSchema)
