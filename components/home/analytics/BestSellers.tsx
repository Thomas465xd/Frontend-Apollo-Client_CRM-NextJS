"use client";
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
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	XAxis,
	YAxis,
} from "recharts";

interface SellerGraphData {
	name: string;
	email: string;
	totalOrders: number;
	totalSales: number;
}

const CustomTooltip = ({
	active,
	payload,
	label,
}: TooltipProps<number, string> & { payload?: { value: number } }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-slate-900 p-3 border border-slate-700 rounded shadow-lg">
				<p className="font-medium text-white">{label}</p>
				<p className="text-blue-400">Orders: {payload[0].value}</p>
				<p className="text-indigo-400">Sales: ${payload[1].value}</p>
			</div>
		);
	}
	return null;
};

export default function BestSellers() {
	const router = useRouter();
	const { data, loading, error, startPolling, stopPolling } = useQuery<{
		getBestSellers: BestSeller[];
	}>(GET_BEST_SELLERS);

	useEffect(() => {
		startPolling(1000);
		return () => {
			stopPolling();
		};
	}, [startPolling, stopPolling]);

	if (error) {
		toast.error("Error loading sellers data");
		router.push("/home");
	}

	if (loading)
		return (
			<div className="flex justify-center items-center h-64">
				<Loader />
			</div>
		);

	const getBestSellers = data?.getBestSellers || [];

	const sellerGraph: SellerGraphData[] = getBestSellers.map((seller) => ({
		name: seller.seller.name + " " + seller.seller.surname,
        //surname: seller.seller.surname,
		email: seller.seller.email,
		totalOrders: seller.totalOrders,
		totalSales: seller.totalSales,
	}));

	if (data)
		return (
			<ResponsiveContainer width="100%" height={350}>
				<BarChart
					data={sellerGraph}
					margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
				>
					<defs>
						<linearGradient
							id="colorOrders"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor="#3b82f6"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="#3b82f6"
								stopOpacity={0.2}
							/>
						</linearGradient>
						<linearGradient
							id="colorSales"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor="#4f46e5"
								stopOpacity={0.8}
							/>
							<stop
								offset="95%"
								stopColor="#4f46e5"
								stopOpacity={0.2}
							/>
						</linearGradient>
					</defs>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="#1e293b"
						vertical={false}
						className="dark:stroke-slate-700"
					/>
					<XAxis
						dataKey={"name"}
						tick={{ fill: "currentColor" }}
						axisLine={{ stroke: "#334155" }}
						className="text-slate-400 dark:text-slate-300"
					/>
					<YAxis
						yAxisId="left"
						tick={{ fill: "currentColor" }}
						axisLine={{ stroke: "#334155" }}
						className="text-slate-400 dark:text-slate-300"
					/>
					<YAxis
						yAxisId="right"
						orientation="right"
						tick={{ fill: "currentColor" }}
						axisLine={{ stroke: "#334155" }}
						className="text-slate-400 dark:text-slate-300"
					/>
					<Tooltip content={<CustomTooltip />} />
					<Legend wrapperStyle={{ paddingTop: "15px" }} />
					<Bar
						yAxisId="left"
						dataKey="totalOrders"
						name="Total Orders"
						fill="url(#colorOrders)"
						radius={[4, 4, 0, 0]}
					/>
					<Bar
						yAxisId="right"
						dataKey="totalSales"
						name="Total Sales ($)"
						fill="url(#colorSales)"
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		);
}
