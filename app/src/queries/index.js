import gql from 'graphql-tag';

const queries = {
    GET_ME: gql`
        {
            me {
                username,
                decks {
                    name
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
        }`
}

export default queries