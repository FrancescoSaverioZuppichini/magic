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
    NEW_USER: gql`
        mutation newUser($input: UserInput!) {
            newUser(input: $input) {
                    id
                    username
        }
    }`,
    NEW_DECK: gql`
        mutation newDeck($deck: DeckInput!) {
            newDeck(deck: $deck){
                id
                name
                colors {
                    count
                    color
                }
                cards {
                    id
                }   
            }
        }
        
    `,
    DELETE_DECK: gql`
        mutation deleteDeck($id: ID!) {
            deleteDeck(id: $id){
                    id
            }
        }
    `,
    NEW_ROOM: gql`
    mutation newRoom($room: RoomInput!) {
        newRoom(room: $room){
                name
                id
            }
        }`,

    DELETE_ROOM: gql`
     mutation deleteRoom($id: ID!) {
            deleteRoom(id: $id){
                    id
            }
        }
    `

    
}

export default mutations