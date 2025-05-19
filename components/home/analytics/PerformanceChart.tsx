"use client";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from "recharts";
import { useQuery } from "@apollo/client";
import { GET_GENERAL_ACTIVITY } from "@/src/graphql/analytics";
import { GeneralActivityResume } from "@/src/types";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";

const COLORS = {
	Completed: "#6366F1", // green-400
	Pending: "#8B5CF6", // yellow-400
	Cancelled: "#94A3B8", // red-400
};

export default function PerformanceOverviewChart() {
	const { data, loading, error } = useQuery<{
		getGeneralActivity: GeneralActivityResume;
	}>(GET_GENERAL_ACTIVITY);

	if (loading) return <Loader />;

	if (error || !data) {
		toast.error("Error loading performance data");
		return null;
	}

	const { completedOrders, pendingOrders, cancelledOrders } =
		data.getGeneralActivity;

	const chartData = [
		{ name: "Completed", value: completedOrders },
		{ name: "Pending", value: pendingOrders },
		{ name: "Cancelled", value: cancelledOrders },
	];

	return (
		<div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
			<h3 className="text-xl font-semibold mb-4">Orders Overview</h3>
			<ResponsiveContainer width="100%" height={250}>
				<BarChart data={chartData}>
					<XAxis dataKey="name" />
					<YAxis allowDecimals={false} />
					<Tooltip />
					<Bar dataKey="value">
						{chartData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[entry.name as keyof typeof COLORS]}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
