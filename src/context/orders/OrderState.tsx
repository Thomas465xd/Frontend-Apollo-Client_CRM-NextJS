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

    const asignClient = useCallback((client: ClientInput) => {
        dispatch({
            type: "ADD_CLIENT", 
            payload: client
        });
    }, []);
    
    const asignProducts = useCallback((product: Product[]) => {
        dispatch({
            type: "ADD_PRODUCT", 
            payload: product
        });
    }, []);

    return (
        <OrderContext.Provider
            value={{
                client: state.client, 
                products: state.products, 
                total: state.total, 
                asignClient,
                asignProducts, 
                dispatch
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export default OrderState;