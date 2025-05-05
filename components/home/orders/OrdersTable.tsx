"use client";
import Loader from "@/components/ui/Loader";
import { GET_ORDERS } from "@/src/graphql/orders";
import { Order } from "@/src/types";
import { useQuery } from "@apollo/client"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import OrderCard from "./OrderCard";

type OrderResponse = {
    getOrders: [Order]
}

export default function OrdersTable() {

    // Mount Router
    const router = useRouter(); 

    //? GraphQL Query
    const { loading, error, data } = useQuery<OrderResponse>(GET_ORDERS); 

    if (loading) return <Loader />;

    if(error) {
        toast.error("Error loading orders data")
        router.push("/home")
    }
    
    if(data) return (
        <div className="">
            {data.getOrders.length ? (
                <div className="">
                    {data.getOrders.map((order) => (
                        <OrderCard 
                            key={order.id} 
                            order={order} 
                        />
                    ))}
                </div>
            ) : (
                <div className="">
                    <p className="text-gray-700 text-center p-5">No orders found</p>
                </div>
            )}
        </div>
    )
}
