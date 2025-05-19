"use client";
import { GET_GENERAL_ACTIVITY } from "@/src/graphql/analytics";
import { GeneralActivityResume } from "@/src/types";
import { useQuery } from "@apollo/client";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";
import { formatPriceToUSD } from "@/src/utils/price";

export default function GeneralActivity() {
    const { data, error, loading } = useQuery<{ getGeneralActivity: GeneralActivityResume }>(GET_GENERAL_ACTIVITY);

    if (loading) return <Loader />;
    if (error) {
        toast.error("Error loading general activity data");
        return null;
    }

    const stats = [
        { label: "Total Products", value: data?.getGeneralActivity.totalProducts || 0 },
        { label: "Total Clients", value: data?.getGeneralActivity.totalClients || 0 },
        { label: "Total Orders", value: data?.getGeneralActivity.totalOrders || 0},
        { label: "Monthly Revenue", value: `${formatPriceToUSD(data?.getGeneralActivity.monthlyRevenue || 0)}` },
    ];

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">At a Glance</h3>
            <div className="space-y-3">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">{stat.label}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
