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
<<<<<<< HEAD
                        scryfallId
=======
>>>>>>> c5bea406fed5d371065eba64def74ff14308c9a7
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
<<<<<<< HEAD
                owner {
                    id
                }
=======
>>>>>>> c5bea406fed5d371065eba64def74ff14308c9a7
                users {
                    username
                }
                decks {
                    name
                }
            } 
        }
    `

<<<<<<< HEAD
=======

>>>>>>> c5bea406fed5d371065eba64def74ff14308c9a7
}

export default queries