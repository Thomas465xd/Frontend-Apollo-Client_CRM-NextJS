"use client"
import React, { useContext } from 'react'
import OrderContext from '@/src/context/orders/OrderContext'
import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_ORDER, GET_ORDERS } from '@/src/graphql/orders';
import { toast } from 'react-toastify';
import Swal, { SweetAlertTheme } from 'sweetalert2';
import { useRouter } from 'next/navigation';
import AsignOrderClient from './AsignOrderClient';
import AsignOrderProducts from './AsignOrderProducts';
import OrderResume from './OrderResume';
import OrderTotal from './OrderTotal';
import { Order } from '@/src/types';

export default function CreateOrderForm() {

    // router
    const router = useRouter();

    // Use the context & extract his functions and values
    const orderContext = useContext(OrderContext);
    const { client, products, total } = orderContext

    //! Create Order Mutation
    const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
        refetchQueries: [{ query: GET_ORDERS }]
    });

    //! END
    
    const validateOrder = () => {
        return (
            client.length === 0 ||
            products.length === 0 ||
            total === 0 ||
            !products.every(product => (product.quantity ?? 0) > 0)
        )
    }

    const handleRegister = async () => {

        // Get the client id
        const { id } = client[0]; 

        // Get the total with discount
        const totalWithDiscount = products.reduce((total, product) => total + (product.priceWithDiscount ?? 0) * (product.quantity ?? 0), 0);

        // Remove not necessary values from the order input
        const order = products.map( product => ({
            product: product.id, 
            quantity: product.quantity, 
            name: product.name,
            price: product.price,
            discount: product.discount,
            priceWithDiscount: product.priceWithDiscount
        }))

        try {
            Swal.fire({
                title: "Are you sure?", 
                text: "You won't be able to edit this order later!", 
                icon: "info",
                showCancelButton: true, 
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, create!",
                cancelButtonText: "Cancel",
                theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
            }).then(async (result) => {
                if(result.isConfirmed) {
                    try {
                        const { data } = await createOrder({
                            variables: {
                                input: {
                                    total, 
                                    totalWithDiscount,
                                    client: id,
                                    status: "PENDING",
                                    order
                                },
                            }
                        })
    
                        if(data.createOrder) Swal.fire({
                            title: "Order Registered successfully 🎉",
                            text: "You will be redirected to the orders page...",
                            icon: "success",
                            confirmButtonText: "Continue",
                            theme: `${localStorage.getItem("theme") as SweetAlertTheme}`,
                        }).then(() => {
                            router.push("/home/orders");
                        })
                    } catch (error) {
                        if (error instanceof ApolloError) {
                            toast.error(error.message, {
                                theme: `${localStorage.getItem("theme")}`,
                            });
                        } else {
                            toast.error("Unexpected error", {
                                theme: `${localStorage.getItem("theme")}`,
                            });
                        }
                    }
                }
            })
        } catch {
            toast.error("Error submitting order");
        }
    }

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
                        text-white font-semibold py-2 px-4 rounded mt-5 transition-colors duration-300 disabled:opacity-50
                    `}
                    disabled={validateOrder() || loading}
                    onClick={handleRegister}
                >
                    Register Order
                </button>
            </div>
        </div>
    )
}
