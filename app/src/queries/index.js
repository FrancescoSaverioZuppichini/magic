import gql from 'graphql-tag';

const queries = {
    GET_ME: gql`
        {
            me {
                id
                username,
                rooms {
                    name
                    id
                }
                decks {
                    id
                    name
                    cards {
                        id
                    }
                }
            }
        }`,

    IS_AUTHENTICATED: gql`
        query isAuthenticated {
          isAuthenticated @client
    }`,
    GET_ACTION: gql`
        query getAction {
            aciton @client
        }
    `,
    GET_CARDS: gql`
        query cards($filter: CardFilter!, $cursor: CursorInput!){
            cards(filter: $filter, cursor: $cursor) @connection(key: "cards"){
                cards {
                    name
                    id
                    scryfallId
                    colors
                    convertedManaCost
                    manaCost
                    artist
                    types
                    subtypes
                    text
                    power
                    colorIndicator
                    toughness
                    life
                },
                hasMore
                cursor {
                    limit
                    skip
                }
            }
        }`,

    GET_DECK: gql`
        query deck($id: ID!){
            deck(id: $id){
                id
                name
                createdAt
                cards {
                    name
                    id
                    scryfallId
                    colors
                    convertedManaCost
                    manaCost
                    artist
                    types
                    subtypes
                    text
                    colorIndicator
                    toughness
                    life
                }
            }
        }

    `,

    GET_ROOM: gql`
        query room($id: ID!) {
            room(id: $id) {
                id
                name
                users {
                    username
                }
                decks {
                    name
                }
            } 
        }
    `


}

export default queries