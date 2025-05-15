"use client";
import { GET_RECENT_ACTIVITY } from "@/src/graphql/analytics";
import { useQuery } from "@apollo/client";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";
import { RecentActivityResume } from "@/src/types";
import { formatRelativeTime } from "@/src/utils/date";

type RecentActivityProps = {
    small?: boolean,
    medium?: boolean, 
    big?: boolean,
}

export default function RecentActivity() {
	const { data, error, loading } = useQuery<RecentActivityResume>(GET_RECENT_ACTIVITY);
	const recentActivity = data?.getRecentActivity || [];

	if (loading) return <Loader />;

	if (error) {
		toast.error("Error loading recent activity data");
		return null;
	}

	if(data) return (
		<div className="p-6 dark:bg-gray-800 bg-white rounded-lg shadow">
			<h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
			<div className="space-y-3 flex gap-10">
				{recentActivity.map((activity, index) => {
					// Order
					if ("total" in activity && "client" in activity) {
						return (
							<div key={index} className={`rounded`}>
								<p className="font-semibold">🧾 Order</p>
                                <p>Status: <span className={`text-sm ${activity.status === "COMPLETED" ? "text-blue-400" : "text-orange-400"}`}>{activity.status}</span></p>
								<p>Total: ${activity.total.toFixed(2)}</p>
								<p>Client: {activity.client?.name ?? "Unknown"}</p>
								<p className="text-xs text-gray-500">
									{formatRelativeTime(activity.createdAt)}
								</p>
							</div>
						);
					}

					// Product
					if ("price" in activity && !("client" in activity)) {
						return (
							<div key={index} className={`rounded`}>
								<p className="font-semibold">📦 Product</p>
								<p>Name: {activity.name}</p>
								<p>Price: ${activity.price.toFixed(2)}</p>
								<p className="text-xs text-gray-500">
									{formatRelativeTime(activity.createdAt)}
								</p>
							</div>
						);
					}

					// Client
					if ("email" in activity && !("price" in activity)) {
						return (
							<div key={index} className={`rounded`}>
								<p className="font-semibold">👤 Client</p>
								<p>Name: {activity.name}</p>
								<p>Email: {activity.email}</p>
								<p className="text-xs text-gray-500">
									{formatRelativeTime(activity.createdAt)}
								</p>
							</div>
						);
					}

                    return null;
				})}
			</div>
		</div>
	);
}
