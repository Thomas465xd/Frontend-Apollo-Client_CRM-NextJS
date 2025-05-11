"use client"
import Loader from "@/components/ui/Loader";
import { GET_BEST_CLIENTS } from "@/src/graphql/analytics";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
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

export default function BestClients() {

    const router = useRouter();

    const { data, loading, error, startPolling, stopPolling } = useQuery(GET_BEST_CLIENTS)

    if(error) {
        toast.error("Error loading products data")
        router.push("/home")
    }

    if(loading) return <Loader />
    
    if(data) return (
        <div className="flex justify-center">
            <BarChart 
                className="mt-10"
                width={730} 
                height={250} 
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#3182CD" />
                <Bar dataKey="uv" fill="#3182CD" />
            </BarChart>
        </div>
    )
}
