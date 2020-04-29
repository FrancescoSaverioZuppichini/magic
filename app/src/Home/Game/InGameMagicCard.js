import React from 'react'

export default function InGameMagicCard({ scryfallId, onClick, selected }) {

    const selectedStyle = {

            borderColor: '#6A66F2',
            borderWidth: '4px',
            borderStyle: 'solid',
            borderRadius: '12px'
    }
    return (
        <img width='100%' src={`/cards/${scryfallId}.jpg`} onClick={onClick} style={selected ? selectedStyle : {}} />
    )
}
