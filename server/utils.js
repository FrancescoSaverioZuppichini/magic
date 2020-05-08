const { Card } = require('./models/index.js')

const getDeckColors = async ({ cards }) => {
    let colors = []
    for (let id of cards) {
        const card = await Card.findById(id)
        colors = colors.concat(card.colors)
    }

    let freq = {}
    let freqArray = []
    for (let el of colors) {
        freq[el] = freq[el] ? freq[el] + 1 :1
    }

    for(let color of Object.keys(freq)) {
        const count = freq[color]
        freqArray.push({ count, color})

    }

    freqArray.sort(( a,b ) => a.count > b.count ? -1 : 1 )    
    
    return freqArray
}

module.exports = { getDeckColors }