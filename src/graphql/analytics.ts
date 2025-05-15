import { gql } from "@apollo/client";

export const GET_BEST_CLIENTS = gql`
    query getBestClients {
        getBestClients {
            client {
                name
                surname
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
                surname
                email
            }
            totalOrders
            totalSales
        }
    }
`

export const GET_RECENT_ACTIVITY = gql`
query getRecentActivity {
    getRecentActivity {
            ... on Order {
                createdAt
                total
                status
                client {
                    name
                }
            }
            ... on Product {
                name
                createdAt
                price
            }
            ... on Client {
                name
                createdAt
                email
            }
        }
    }
`

export const GET_GENERAL_ACTIVITY = gql`
    query getGeneralActivity {
        getGeneralActivity {
            totalClients
            totalProducts
            totalOrders
            pendingOrders
            monthlyRevenue
            totalRevenue
        }
    }
`