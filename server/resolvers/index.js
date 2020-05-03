const { User, Card, Deck, Room } = require('../models/index.js')
const CURSOR_BOUNDS = { limit: 200 }

const cards = async (ctx, { filter, cursor }) => {
	let { skip, limit } = cursor
	if (limit > CURSOR_BOUNDS.limit) throw new Error(`Limit cannot be greater than ${CURSOR_BOUNDS.limit}`)

	let cardFilter = {}

	if (filter.type) cardFilter.types = { '$in': [filter.type] }
	if (filter.name) cardFilter.name = { '$regex': filter.name, '$options': 'i' }
	if (filter.colors) cardFilter.colors = { '$all': filter.colors }
	if (filter.convertedManaCost) {
		const convertedManaCost = filter.convertedManaCost.split(' ') // we can also pass 10 + 
		const symb2op = { '+': '$gte' }
		if (convertedManaCost.length == 1) cardFilter.convertedManaCost = Number(convertedManaCost[0])
		else if (convertedManaCost.length == 2) {
			const key = symb2op[convertedManaCost[1]]
			cardFilter.convertedManaCost = {}
			cardFilter.convertedManaCost[key] = Number(convertedManaCost[0])
		}
	}
	if (filter.ids) cardFilter.ids = { '$in': filter.ids }

	const cards = await Card.find(cardFilter).skip(skip).limit(limit)
	const hasMore = cards.length >= limit || cards.length === 0
	cursor.skip += limit
	return { cards, hasMore, cursor }
}

const decks = async( ctx, { filter, cursor }) => {
	let { skip, limit } = cursor
	let deckFilder = {}

	if (filter.name) deckFilder.name = { '$regex': filter.name, '$options': 'i' }

	const decks = await Deck.find(deckFilder).skip(skip).limit(limit)
	const hasMore = decks.length >= limit || decks.length === 0
	cursor.skip += limit
	return { decks, hasMore, cursor }
}

const resolvers = {
	Query: {
		hello: () => 'world',
		user(ctx, { username }) {
			// should filder out some infos
			return User.findOne({ username })
		},
		me: async (ctx, { id }, { user }) => {
			return User.findById(user.id).populate({
				path: 'decks', populate: {
					path: 'cards', model: 'Card'
				},
				options: {
					sort: { createdAt: -1 }
				}
			}).populate({
				path: 'rooms',
				options: {
					sort: { createdAt: -1 }
				}
			})
		},
		secret(ctx, { }, { user }) {
			return `Psssh ${user.email}`
		},
		cards,
		deck: (ctx, { id }) => Deck.findById(id).populate('cards'),
		decks,
		async cardsInDeck(ctx, { filter, cursor, deckID }) {
			let deck = (await Deck.findById(deckID))
			filter.ids = deck.cards
			return cards({ filter, cursor })
		},
		card(ctx, { id }) {
			return Card.findById(id)
		},
		room: (ctx, { id }) => Room.findById(id).populate('users').populate('decks').populate('owner')
	},
	Mutation: {
		async newUser(obj, { input }) {
			const { username, email, password } = input
			const user = await User({ username, email, password })
			await user.isUniqueOrAbort(email)
			user.save()
			return user
		},
		async newAuth(obj, { username, password }, ctx) {
			const user = await User.find().byUsernameAndPassword({ username, password })
			const token = user.generateJWT()
			return { user, token }
		},
		async newDeck(obj, { deck }, { user }) {
			deck = { ...deck, owner: user.id }
			let newDeck
			if (deck.id) {
				newDeck = await Deck.findByIdAndUpdate(deck.id, deck, {
					new: true
				})
			} else {
				console.log(deck)
				newDeck = await (new Deck(deck)).save()
				user.decks.push(newDeck)
				await user.save()
			}
			return newDeck.populate('owner').populate('cards').execPopulate()
		},
		async deleteDeck(obj, { id }, { user }) {
			const deck = await Deck.findById(id)

			if (deck) {
				await deck.remove()

				const userDeckIdx = user.decks.indexOf(id)
				user.decks.splice(userDeckIdx, 1)

				await user.save()
			}
			return deck
		},
		async newCard(obj, { card }) {
			const alreadyExist = Card.exists(card)
			if (alreadyExist) throw new Error(`Another card with the same name ${card.name} exists.`)
			const newCard = new Card(card)
			return newCard.save()
		},
		async newRoom(obj, { room }, { user }) {
			// TODO should check if the room alrays exist for a single user
			// add the master to the room creation
			let roomWithOwner = { ...room, ...{ users: [user.id], active: true, owner: user } }
			const newRoom = new Room(roomWithOwner)
			const savedRoom = await newRoom.save()

			user.rooms.push(savedRoom)
			await user.save()

			return savedRoom.populate('users').execPopulate()
		},
		async deleteRoom(obj, { id }, { user }) {
			const room = await Room.findById(id)

			if (room) {
				await room.remove()

				const userRoomIdx = user.rooms.indexOf(id)
				user.rooms.splice(userRoomIdx, 1)

				await user.save()
			}
			return room
		},
	}
}

module.exports = resolvers
