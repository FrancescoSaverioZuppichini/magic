import React from 'react'
import { Flex } from 'theme-ui'
import { MagicCard, ZoomMagiCardAction, AddToDeckMagiCardAction, CardPage } from '../MagicCards/MagicCard'
import Deck from './Deck.js'
import MagicCards from '../MagicCards/MagicCards'
import MagicCardsInDeckFilters from './MagicCardsInDeckFilters'
import CloneDeckAction from './CloneDeckAction'

export default function OthersDeck({ deck, onClose }) {
    return (
        <Deck deck={deck} onClose={onClose}
            controllers={
                deck => <CloneDeckAction deck={deck} />
            }>
            {deck => <MagicCards cards={deck.cards}
                filters={onChange => <MagicCardsInDeckFilters onChange={onChange} deck={deck} />}
            >
                {(card, i) => <MagicCard key={i} card={card}
                    actions={props => (
                        // actions for the card
                        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <AddToDeckMagiCardAction {...props} />
                            <ZoomMagiCardAction {...props}>
                                {onClose => <CardPage {...props} onClose={onClose}>
                                    <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                        <AddToDeckMagiCardAction {...props} variant='primary' />
                                    </Flex>
                                </CardPage>}
                            </ZoomMagiCardAction>
                        </Flex>
                    )}
                ></MagicCard>}
            </MagicCards>
            }
        </Deck>
    )
}
