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
}

export default mutations