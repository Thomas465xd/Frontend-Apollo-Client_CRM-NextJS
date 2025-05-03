"use client";
import React, { useCallback, useReducer } from "react";
import OrderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";
import { ClientInput, Product } from "@/src/types";

type OrderState = {
    client: ClientInput[];
    products: Product[];
    total: number;
}

// Orders State
const initialState : OrderState = {
    client: [], 
    products: [], 
    total: 0, 
}

const OrderState = ({ children }: { children: React.ReactNode }) => {
    // Create context | state = lo que va cambiando | dispatch = evaluar acciones para modificar state
    const [state, dispatch] = useReducer(OrderReducer, initialState); 

    //! Actions

    // Asigns client to the Order
    const asignClient = useCallback((client: ClientInput) => {
        dispatch({
            type: "ADD_CLIENT", 
            payload: client
        });
    }, []);
    
    // Asigns products to the Order
    const asignProducts = useCallback((products: Product[]) => {
        dispatch({
            type: "ADD_PRODUCT",
            payload: products,
        });
    }, []);    

    // Updates the quantity for each product
    const productsQuantity = (newProduct: Product) => {
        dispatch({
            type: "UPDATE_QUANTITY", 
            payload: newProduct
        })
    }

    // Update Order Total
    const updateTotal = useCallback(() => {
        dispatch({
            type: "UPDATE_TOTAL", 
        })
    }, [dispatch]);

    return (
        <OrderContext.Provider
            value={{
                client: state.client, 
                products: state.products, 
                total: state.total, 
                asignClient,
                asignProducts, 
                productsQuantity, 
                updateTotal, 
                dispatch
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export default OrderState;