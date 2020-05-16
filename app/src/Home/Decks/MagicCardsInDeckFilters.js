import { MagicCardsFilters } from '../MagicCards/MagicCardsFilterControllers'
import { uniqueFromDict } from '../../utils'

import React from 'react'

export default function MagicCardsInDeckFilters({ onChange, deck }) {

    const types = Object.keys(uniqueFromDict(deck.cards, 'types'))
    const subtypes = Object.keys(uniqueFromDict(deck.cards, 'subtypes'))
    const colors = deck.colors.map(el => el.color)

    return (
        <div>
            <MagicCardsFilters onChange={onChange} types={types} subtypes={subtypes} colors={colors}/>
        </div>
    )
}
