const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
	name: { type: String, require: true },
<<<<<<< HEAD
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
=======
>>>>>>> c5bea406fed5d371065eba64def74ff14308c9a7
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	readyUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	decks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deck' }],
	active: { type: Boolean, default: true },

<<<<<<< HEAD
},
=======
	},
>>>>>>> c5bea406fed5d371065eba64def74ff14308c9a7
	{
		timestamps: true
	})

module.exports = mongoose.model('Room', RoomSchema)
