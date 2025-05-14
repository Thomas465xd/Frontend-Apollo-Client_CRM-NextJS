import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
    query getUser {
        getUser {
            name
            surname
            email
            role
            businessName
            phone
            address
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($input: UserInput) {
        createUser(input: $input) {
            id
            name
            surname
            email
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($input: UpdateUserInput) {
        updateUser(input: $input) {
            id
            name
            surname
            email
            role
            businessName
            phone
            address
        }
    }
`;

export const UPDATE_PASSWORD = gql`
    mutation changePassword($input: PasswordInput) {
        changePassword(input: $input)
    }
`

export const LOGIN_USER = gql`
    mutation AuthUser($input: AuthInput) {
        authenticateUser(input: $input) {
            token
        }
    }
`

export const  RESET_PASSWORD = gql`
    mutation resetPassword($input: ResetPasswordInput) {
        resetPassword(input: $input) {
            token
        }
    }
`