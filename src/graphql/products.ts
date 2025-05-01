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

export const GET_PRODUCT_BY_ID = gql`
    query getProductById($id: ID!) {
        getProductById(id: $id) {
            name
            stock
            price
            discount
            description
            priceWithDiscount
        }
    }
`

export const CREATE_PRODUCT = gql`
    mutation createProduct($input: ProductInput) {
        createProduct(input: $input) {
            id
            name
            stock
            price
            discount
            description
        }
    }
`

export const UPDATE_PRODUCT = gql`
    mutation updateProduct($id: ID!, $input: ProductInput) {
        updateProduct(id: $id, input: $input) {
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

export const DELETE_PRODUCT = gql`
	mutation deleteProduct($id: ID!) {
		deleteProduct(id: $id)
	}
`;