import gql from 'graphql-tag';

const mutations = {
    NEW_AUTH: gql`
        mutation newAuth($email: String!, $password: String!) {
            newAuth(email: $email, password: $password) {
                token
                user {
                    username
                }
        }
    }`
}

export default mutations