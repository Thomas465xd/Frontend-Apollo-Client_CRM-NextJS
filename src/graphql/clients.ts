import { gql } from "@apollo/client";

export const GET_SELLER_CLIENTS = gql`
	query getSellerClients {
		getSellerClients {
			id
			name
			surname
			businessName
			email
		}
	}
`;

export const GET_CLIENT_BY_ID = gql`
	query getClientById($id: ID!) {
		getClientById(id: $id) {
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

export const CREATE_CLIENT = gql`
    mutation createClient($input: ClientInput) {
        createClient(input: $input) {
            id
            name
            surname
            businessName
            role
            email
            phone
            address
        }
    }
`

export const UPDATE_CLIENT = gql`
    mutation updateClient($id: ID!, $input: ClientInput) {
        updateClient(id: $id, input: $input) {
            id
            name
            surname
            businessName
            role
            email
            phone
            address
        }
    }
`;

export const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id)
    }
`;