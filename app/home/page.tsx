import { BarChart2, Info, PackagePlus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col space-y-6">
			{/* Welcome Header */}
			<div className="p-6 m-4 dark:border dark:border-gray-700 border-b border-gray-400 dark:rounded-lg">
				<h2 className="text-3xl font-bold text-center">
					Welcome to Client CRM{" "}
					<span className="text-blue-500">Next</span>
				</h2>
			</div>

			{/* Dashboard Overview */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
				{/* Quick Stats */}
				<div className="p-6 dark:bg-gray-800 bg-white rounded-lg shadow">
					<h3 className="text-xl font-semibold mb-4">At a Glance</h3>
					<div className="space-y-3">
						<div className="flex justify-between">
							<span>Active Clients</span>
							<span className="font-bold">24</span>
						</div>
						<div className="flex justify-between">
							<span>Pending Orders</span>
							<span className="font-bold">7</span>
						</div>
						<div className="flex justify-between">
							<span>Monthly Revenue</span>
							<span className="font-bold">$12,450</span>
						</div>
					</div>
				</div>

				{/* Recent Activity */}
				<div className="p-6 dark:bg-gray-800 bg-white rounded-lg shadow">
					<h3 className="text-xl font-semibold mb-4">
						Recent Activity
					</h3>
					<div className="space-y-3">
						<div className="text-sm">
							<p className="font-medium">
								New order from Acme Corp
							</p>
							<p className="text-gray-500 dark:text-gray-400">
								10 minutes ago
							</p>
						</div>
						<div className="text-sm">
							<p className="font-medium">
								Client profile updated: TechSolutions
							</p>
							<p className="text-gray-500 dark:text-gray-400">
								2 hours ago
							</p>
						</div>
						<div className="text-sm">
							<p className="font-medium">
								New client added: Global Ventures
							</p>
							<p className="text-gray-500 dark:text-gray-400">
								Yesterday
							</p>
						</div>
					</div>
				</div>

                {/* Quick Actions */}
                <div className="p-6 dark:bg-gray-800 bg-white rounded-2xl shadow-lg">

                </div>
			</div>

			{/* Tasks and Reminders */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4">
				{/* Upcoming Tasks */}
				<div className="p-6 dark:bg-gray-800 bg-white rounded-lg shadow">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-y-16 gap-x-4">
                        <Link
                            href="/home/clients/new"
                            className="flex items-center justi gap-2 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-transform hover:scale-[1.02] shadow-sm"
                        >
                            <Plus size={18} />
                            <span className="text-sm font-medium">Add Client</span>
                        </Link>
                        <Link
                            href="/home/orders/new"
                            className="flex items-center gap-2 p-4 bg-slate-600 hover:bg-slate-700 text-white rounded-xl transition-transform hover:scale-[1.02] shadow-sm"
                        >
                            <ShoppingCart size={18} />
                            <span className="text-sm font-medium">Create Order</span>
                        </Link>
                        <Link
                            href="/home/products/new"
                            className="flex items-center gap-2 p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-transform hover:scale-[1.02] shadow-sm"
                        >
                            <PackagePlus size={18} />
                            <span className="text-sm font-medium">Add Product</span>
                        </Link>
                        <Link
                            href="/home/analytics"
                            className="flex items-center gap-2 p-4 bg-indigo-800 hover:bg-indigo-900 text-white rounded-xl transition-transform hover:scale-[1.02] shadow-sm"
                        >
                            <BarChart2 size={18} />
                            <span className="text-sm font-medium">View Reports</span>
                        </Link>
                    </div>
				</div>

				{/* Performance Overview */}
				<div className="p-6 dark:bg-gray-800 bg-white rounded-lg shadow">
					<h3 className="text-xl font-semibold mb-4">
						Performance Overview
					</h3>
					<div className="h-48 flex items-center justify-center">
						<p className="text-center text-gray-500 dark:text-gray-400">
							[Sales Chart Visualization]
						</p>
					</div>
					<p className="text-sm text-center mt-2">
						Sales are up 12% compared to last month
					</p>
				</div>
			</div>

			{/* Tips and Help */}
			<div className="mx-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
				<div className="flex items-start">
                    <Info
                        size={24}
                        className="text-blue-800 dark:text-blue-400 mr-2"
                    />
					<div>
						<h4 className="font-medium text-blue-800 dark:text-blue-300">
							Tip
						</h4>
						<p className="text-sm text-blue-700 dark:text-blue-200">
                            Remember to complete your profile with your latest info to keep your account up to date
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
