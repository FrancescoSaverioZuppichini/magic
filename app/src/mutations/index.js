import gql from 'graphql-tag';

const mutations = {
    NEW_AUTH: gql`
        mutation newAuth($username: String!, $password: String!) {
            newAuth(username: $username, password: $password) {
                token
                user {
                    id
                    username
                }
        }
    }`,
    NEW_USER : gql`
        mutation newUser($input: UserInput!) {
            newUser(input: $input) {
                    id
                    username
        }
    }`,
    NEW_DECK: gql`
        mutation newDeck($deck: DeckInput!) {
            newDeck(deck: $deck){
                    name
                }
            }
        
    `
}

export default mutations