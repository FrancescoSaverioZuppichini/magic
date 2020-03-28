const mongoose = require('mongoose');
const Tag = require('./Tag.js')

const QuoteSchema = new mongoose.Schema({ 
    text: String,
    author :{type : mongoose.Schema.ObjectId, ref : 'Author'},
    tags: [{type : mongoose.Schema.ObjectId, ref : 'Tag'} ]
})

module.exports = mongoose.model('Quote', QuoteSchema)