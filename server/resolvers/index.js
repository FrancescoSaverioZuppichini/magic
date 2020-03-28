const resolvers = {
    Query: {
      hello: () => 'world',
      quote(obj, {id}) {
              return Quote.findById(id)
          },
      author(source, {id}) {
              return Author.findById(id)
          },
      tag(source, {id}) {
              return Tag.findById(id)
      },
      quotes(source, { cursor }) {
              options = cursor ? { _id : { $gt: cursor} } : {}
              console.log(options)
              return Quote.find(options).limit(30)
          },
      authors() {
              return Author.find({})
      },
      tags() {
              return Tag.find({})
          }
    },
    Quote: {
      author(source, args) {
              return Author.findById(source.author)
      },
      tags(source, args) {
              return source.tags.map(id => Tag.findById(id))
      }
    },
    Author: {
      quotes(source, args) {
              return Quote.find({ author: source.id })
          }
      },
    Tag: {
        quotes(source) {
          return Quote.find({ tags: { $in: source.id } })
        }
    }
  }

  module.exports = resolvers