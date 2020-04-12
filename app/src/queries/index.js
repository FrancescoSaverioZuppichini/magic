import gql from 'graphql-tag';

const queries = {
    GET_ME: gql`
        {
            me {
                username,
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
                    id
                    name
                    scryfallId
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
                name
                createdAt
                cards {
                    name
                    id
                    scryfallId
                }
            }
        }

    `

}

export default queries