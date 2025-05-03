"use client"
import React, { useContext } from 'react'
import AsignOrderClient from './AsignOrderClient'
import OrderContext from '@/src/context/orders/OrderContext'
import AsignOrderProducts from './AsignOrderProducts';
import OrderResume from './OrderResume';
import OrderTotal from './OrderTotal';

export default function CreateOrderForm() {

    // Use the context & extract his functions and values
    const orderContext = useContext(OrderContext);
    const { client, products, total } = orderContext
    
    const validateOrder = () => {
        return (
            client.length === 0 ||
            products.length === 0 ||
            total === 0 ||
            !products.every(product => (product.quantity ?? 0) > 0)
        )
    }

    console.log(orderContext)

    return (
        <div className='flex justify-center mt-5'>
            <div className="w-full max-w-xl">
                <AsignOrderClient />
                <AsignOrderProducts />
                <OrderResume />
                <OrderTotal />

                <button 
                    className={`
                        ${validateOrder() 
                        ? 'bg-blue-500 cursor-not-allowed opacity-50' 
                        : 'bg-blue-500 hover:bg-blue-700 cursor-pointer'
                        } 
                        text-white font-semibold py-2 px-4 rounded mt-5 transition-colors duration-300
                    `}
                    disabled={validateOrder()}
                >
                    Register Order
                </button>
            </div>
        </div>
    )
}
