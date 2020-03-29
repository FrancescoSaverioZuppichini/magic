const mongoose = require('mongoose')

const DeckSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		cards: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Card', default: [] } ],
		owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Deck', DeckSchema)
