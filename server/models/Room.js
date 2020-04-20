const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
	name: { type: String, require: true },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	readyUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	decks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deck' }],
	active: { type: Boolean, default: true },

	},
	{
		timestamps: true
	})

module.exports = mongoose.model('Room', RoomSchema)
