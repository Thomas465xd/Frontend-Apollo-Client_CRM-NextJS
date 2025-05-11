import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation AuthUser($input: AuthInput) {
        authenticateUser(input: $input) {
            token
        }
    }
`

export const GET_PROFILE = gql`
    query getUser {
        getUser {
            name
        }
    }
`;