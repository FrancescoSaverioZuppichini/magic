const quotes = require('./quotes.js')
const { Quote, Tag, Author } = require('./models/index')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')

async function storeAuthorIfDoesNotExist(quote){
    const name = quote.author
    var author = await Author.findOne({name})
    if(!author) {
        author = new Author({ name })
        await author.save()
    }
    return author
}

async function storeQuote(quote, author, tags) { 
    const authorId = author._id
    const { text } = quote
    var quote = new Quote({
        text,
        author: authorId,
        tags: tags.map(t => t._id)
     })

     return await quote.save()
}

async function storeTagsIfDontExist(quote) {
    var tags = []

    for(let name of quote.tags){
        var tag = await Tag.findOne({ name })
        if(!tag) {
            tag = new Tag({ name })
            await tag.save()
        }

        tags.push(tag)
    }

    return tags
}

async function populate(quotes) {
    for(let quote of quotes) {
        const author = await storeAuthorIfDoesNotExist(quote)
        const tags = await storeTagsIfDontExist(quote)
        await storeQuote(quote, author, tags)
        console.log('#')
    }
}

populate(quotes.quotes)