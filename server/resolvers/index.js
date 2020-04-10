const { User, Card, Deck } = require('../models/index.js')
const CURSOR_BOUNDS = { limit: 200 }

const cards = async (ctx, { filter, cursor }) => {
	let { skip, limit } = cursor
	if (limit > CURSOR_BOUNDS.limit) throw new Error(`Limit cannot be greater than ${CURSOR_BOUNDS.limit}`)

	let cardFilter = { ...filter }

	if (filter.type) cardFilter.types = filter.type
	if (filter.name) cardFilter.name = { '$regex': filter.name }
	if (filter.colors) cardFilter.colors = { '$all': filter.colors }
	if (filter.ids) cardFilter.ids = { '$in': filter.ids }

	const cards = await Card.find(cardFilter).skip(skip).limit(limit)
	const hasMore = cards.length == limit
	cursor.skip += limit

	return { cards, hasMore, cursor }
}

const resolvers = {
	Query: {
		hello: () => 'world',
		user(ctx, { username }) {
			// should filder out some infos
			return User.findOne({ username })
		},
		me: async (ctx, { id }, { user }) => {
			return User.findById(user.id).populate('decks')
		},
		secret(ctx, { }, { user }) {
			return `Psssh ${user.email}`
		},
		cards,
		deck: (ctx, { id }) => Deck.findById(id),
		decks(ctx, { }) {
			return Deck.find().populate('owner')
		},
		async cardsInDeck(ctx, { filter, cursor, deckID }) {
			let deck = (await Deck.findById(deckID))
			filter.ids = deck.cards
			return cards({ filter, cursor })
		},
		card(ctx, { id }) {
			return Card.findById(id)
		}
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
		async createOrUpdateDeck(obj, { deck }, { user }) {
			deck = { ...deck, owner: user.id }
			let newDeck;
			if(deck.id) {
				console.log('update Deck')
				newDeck = await Deck.findByIdAndUpdate(deck.id, deck, {
					new: true
				})
			}else {
				newDeck =  await (new Deck(deck)).save()
				user.decks.push(newDeck)
				await user.save()
			}

			return Deck.findById(newDeck.id).populate('owner').populate('cards')
		},
		async newCard(obj, { card }) {
			const alreadyExist = Card.exists(card)
			if (alreadyExist) throw new Error(`Another card with the same name ${card.name} exists.`)
			const newCard = new Card(card)
			return newCard.save()
		}
	}
}

module.exports = resolvers
