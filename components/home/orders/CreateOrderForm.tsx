"use client"
import React, { useContext } from 'react'
import AsignOrderClient from './AsignOrderClient'
import OrderContext from '@/src/context/orders/OrderContext'
import AsignOrderProducts from './AsignOrderProducts';

export default function CreateOrderForm() {

    // Use the context & extract his functions and values
    const orderContext = useContext(OrderContext);
    

    console.log(orderContext)

    return (
        <div>
            <AsignOrderClient />
            <AsignOrderProducts />
        </div>
    )
}
