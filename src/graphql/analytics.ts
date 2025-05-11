import { gql } from "@apollo/client";

export const GET_BEST_CLIENTS = gql`
    query getBestClients {
        getBestClients {
            client {
                name
                email
            }
            totalOrders
            totalSpent
        }
    }
`

export const GET_BEST_SELLERS = gql`
    query getBestSellers {
        getBestSellers {
            seller {
                name
                email
            }
            totalOrders
            totalSales
        }
    }
`