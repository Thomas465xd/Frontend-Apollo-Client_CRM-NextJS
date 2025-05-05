import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
    query getOrders {
        getOrders {
            id
            client {
                id
                name
                surname
                businessName
                role
                email
                phone
                address
            }
            order {
                id
                quantity
                name
                price
                discount
                priceWithDiscount
            }
            status
            total
            totalWithDiscount
            createdAt
            updatedAt
        }
    }
`

export const CREATE_ORDER = gql`
    mutation createOrder($input: OrderInput) {
        createOrder(input: $input) {
            id
        }
    }
`;

export const UPDATE_ORDER = gql`
mutation updateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
        id
        status
    }
}
`;

export const DELETE_ORDER = gql`
    mutation deleteOrder($id: ID!) {
        deleteOrder(id: $id)
    }
`;