const ACTIONS = {
    NEW_DECK : 'NEW_DECK',
    NEW_ROOM: 'NEW_ROOM',
    NONE: 'NONE'
}

const COLORS = ['B', 'G', 'R', 'U', 'W']
const TYPES = ['Creature', 'Artifact', 'Enchantment',
'Instant', 'Land',  'Sorcery', 'Planeswalker']


const filterMagicCards = (cards, filter) => {
    let filteredCards = [...cards]
    if(filter.colors) filteredCards = cards.filter(c => c.colors.indexOf(filter.colors[0]) >= 0)
    if(filter.type) filteredCards = cards.filter(c => c.types.indexOf(filter.type) >= 0)
    if(filter.convertedManaCost) filteredCards = cards.filter(c => c.convertedManaCost === Number(filter.convertedManaCost))
    console.log(filter, 'filterMagicCards')

    return filteredCards
}
// const TYPES = ['Artifact', 'Conspiracy', 'Creature',
// 'Eaturecray', 'Elemental', 'Enchantment',
// 'Instant', 'Land', 'Phenomenon', 'Plane', 'Planeswalker',
// 'Scariest', 'Scheme', , 'Sorcery', 'Specter', 'Summon',
// 'Tribal', 'Vanguard']

export { ACTIONS, COLORS, TYPES, filterMagicCards }