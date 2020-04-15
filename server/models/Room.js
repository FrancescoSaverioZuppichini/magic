const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
	name: { type: String, require: true },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	active: { type: Boolean, default: true },

	},
	{
		timestamps: true
	})

module.exports = mongoose.model('Room', RoomSchema)
