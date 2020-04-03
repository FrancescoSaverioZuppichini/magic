const { User, Card, Deck } = require('../models/index.js')
const CURSOR_BOUNDS = { limit: 200 }
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
		deck: (ctx, { id }) => Deck.findById(id),
		decks(ctx, { }) {
			return Deck.find().populate('owner')
		},
		async cards(ctx, { filter, cursor }) {
			let { skip, limit } = cursor
			if(limit > CURSOR_BOUNDS.limit) throw new Error(`Limit cannot be greater than ${CURSOR_BOUNDS.limit}`)

			let cardFilter = {...filter}

			if(filter.type) cardFilter.types =  filter.type
			if(filter.name) cardFilter.name = { '$regex' : filter.name}
			if(filter.colors) cardFilter.colors = { '$all' : filter.colors} 
						
			const cards =  await Card.find(cardFilter).skip(skip).limit(limit)
			const hasMore = cards.length == limit
			cursor.skip += limit 

			return { cards, hasMore, cursor }
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
		async newAuth(obj, { email, password }, ctx) {
			const user = await User.find().byEmailAndPassword({ email, password })
			const token = user.generateJWT()
			return { user, token }
		},
		async newDeck(obj, { deck }, { user }) {
			deck = { ...deck, owner: user }
			// check if the current user has already a deck
			const alreadyExist = await Deck.exists(deck)

			if (alreadyExist) throw new Error(`Deck with name ${deck.name} already exists.`)
			const newDeck = new Deck(deck)

			user.decks = [newDeck]
			await user.save()

			return await newDeck.save()
		},
		async updateDeck(obj, { deck }, { user }) {
			deck = { ...deck, owner: user }

			const updatedDeck = Deck.findOneAndUpdate(deck.id, deck, { new: true })

			return updatedDeck.populate('owner').populate('cards')
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
