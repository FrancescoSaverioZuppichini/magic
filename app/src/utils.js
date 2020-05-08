const ACTIONS = {
    NEW_DECK: 'NEW_DECK',
    NEW_ROOM: 'NEW_ROOM',
    NONE: 'NONE'
}

const COLORS = ['B', 'G', 'R', 'U', 'W']
const TYPES = ['Creature', 'Artifact', 'Enchantment',
    'Instant', 'Land', 'Sorcery', 'Planeswalker']

const DECK_TYPES = ['Advanced Deck',
'Advanced Pack',
'Archenemy Deck',
'Basic Deck',
'Brawl Deck',
'Challenger Deck',
'Clash Pack',
'Commander Deck',
'Duel Deck',
'Duel Of The Planeswalkers Deck',
'Event Deck',
'Game Night Deck',
'Guild Kit',
'Halfdeck',
'Intro Pack',
'MTGO Theme Deck',
'Planechase Deck',
'Planeswalker Deck',
'Premium Deck',
'Spellslinger Starter Kit',
'Starter Deck',
'Theme Deck',
'Welcome Deck']

const filterMagicCards = (cards, filter) => {
    let filteredCards = [...cards]
    if (filter.colors) filteredCards = cards.filter(c => c.colors.indexOf(filter.colors[0]) >= 0)
    if (filter.type) filteredCards = cards.filter(c => c.types.indexOf(filter.type) >= 0)
    if (filter.convertedManaCost) filteredCards = cards.filter(c => c.convertedManaCost === Number(filter.convertedManaCost))
    console.log(filter, 'filterMagicCards')

    return filteredCards
}
// const TYPES = ['Artifact', 'Conspiracy', 'Creature',
// 'Eaturecray', 'Elemental', 'Enchantment',
// 'Instant', 'Land', 'Phenomenon', 'Plane', 'Planeswalker',
// 'Scariest', 'Scheme', , 'Sorcery', 'Specter', 'Summon',
// 'Tribal', 'Vanguard']
const frequency = (array) => {
    let freq = {}
    let freqArray = []
    for (let el of array) {
        freq[el] = freq[el] ? freq[el] + 1 :1
    }

    for(let key of Object.keys(freq)) {
        const val = freq[key]
        freqArray.push({ key, val})

    }

    freqArray.sort(( a,b ) => a.val > b.val ? -1 : 1 )    
    
    return freqArray
}
export { ACTIONS, COLORS, TYPES, DECK_TYPES, filterMagicCards, frequency }