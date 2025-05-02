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

export const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id)
    }
`;