import gql from 'graphql-tag';

const queries = {
    GET_ME: gql`
        {
            me {
                username
            }
        }`,

    IS_AUTHENTICATED: gql`
        query isAuthenticated {
          isAuthenticated @client
    }`
}

export default queries