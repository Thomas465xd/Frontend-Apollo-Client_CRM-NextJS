"use client"
import { ClientInput, Product } from "@/src/types";
import { createContext, Dispatch } from "react";

// Define the action type
export type OrderAction =
    | { type: "ADD_CLIENT"; payload: ClientInput }
    | { type: "ADD_PRODUCT"; payload: Product[] }
    | { type: "UPDATE_QUANTITY"; payload: Product }
    | { type: "UPDATE_TOTAL" };

// Define the state type
export type OrderState = {
    client: ClientInput[];
    products: Product[]; 
    total: number;
};

// Define the context type
type OrderContextType = OrderState & {
    asignClient: (client: ClientInput) => void;
    asignProducts: (products: Product[]) => void;
    productsQuantity: (newProduct: Product) => void;
    updateTotal: () => void;
    dispatch: Dispatch<OrderAction>;
};

// Create the context with initial values
const OrderContext = createContext<OrderContextType>({
    client: [],
    products: [],
    total: 0,
    asignClient: () => {},
    asignProducts: () => {},
    productsQuantity: () => {}, 
    updateTotal: () => {},
    dispatch: () => null, // This is just a placeholder that will be replaced by the actual dispatch function
});

export default OrderContext;