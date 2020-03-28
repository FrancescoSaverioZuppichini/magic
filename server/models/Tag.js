const mongoose = require('mongoose');
const Quote = require('./Quote')

const TagSchema = new mongoose.Schema({ 
    name: String
})

module.exports = mongoose.model('Tag', TagSchema)