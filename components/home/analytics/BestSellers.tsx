"use client"
import Loader from "@/components/ui/Loader";
import { GET_BEST_SELLERS } from "@/src/graphql/analytics";
import { BestSeller } from "@/src/types";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function BestSellers() {

    const router = useRouter();

    const { data, loading, error, startPolling, stopPolling } = useQuery<{getBestSellers: BestSeller[]}>(GET_BEST_SELLERS)

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])

    if(error) {
        toast.error("Error loading sellers data")
        router.push("/home")
    }

    if(loading) return <Loader />

    const getBestSellers = data?.getBestSellers || [];

    // 🔁 Flatten sellers into chart data format
    const sellerGraph = getBestSellers.map((seller) => ({
        name: seller.seller.name, // or seller.seller[0].name if it's an array
        email: seller.seller.email,
        totalOrders: seller.totalOrders,
        totalSales: seller.totalSales,
    }));
    
    if(data) return (
        <div className="flex justify-center">
            <BarChart
                className="mt-10"
                width={730}
                height={300}
                data={sellerGraph}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="totalOrders" fill="#82ca9d" name="Total Orders" />
                <Bar yAxisId="right" dataKey="totalSales" fill="#8884d8" name="Total Sales ($)" />
            </BarChart>
        </div>
    )
}