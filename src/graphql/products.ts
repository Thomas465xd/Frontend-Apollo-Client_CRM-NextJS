import { gql } from "@apollo/client";


// Get Products by Seller
export const GET_PRODUCTS = gql`
	query getProductsBySeller {
		getProductsBySeller {
			id
			name
			stock
			price
			discount
			description
			priceWithDiscount
		}
	}
`;

export const CREATE_PRODUCT = gql`
    mutation createProduct($input: ProductInput) {
        createProduct(input: $input) {
            id
            name
            stock
            price
            discount
            description
            createdAt
        }
    }
`

export const DELETE_PRODUCT = gql`
	mutation deleteProduct($id: ID!) {
		deleteProduct(id: $id)
	}
`;