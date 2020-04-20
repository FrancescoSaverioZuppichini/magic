import React  from 'react'
import { Card, Text } from 'theme-ui'

export default function DeckRow({ deck, onClick, isSelected }) {
    /**
     * Display decks in a row.
     */
    return (
        <Card
            sx={{ borderColor: isSelected ? 'primary': 'cardBg'  }}
            variant='tiny'
            onClick={() => onClick(deck)}>
            <Text sx={{ fontSize: 2 }}>{deck.name}</Text>
            <Text sx={{ fontSize: 0 }}>{`${deck.cards.length} cards`}</Text>
        </Card>
    )
}
