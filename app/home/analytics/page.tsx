import BestClients from "@/components/home/analytics/BestClients";
import BestSellers from "@/components/home/analytics/BestSellers";
import Title from "@/components/ui/Title";
import Link from "next/link";

export default function Analytics() {
	return (
		<div className="space-y-8 p-6">
			<Title>Your CRM Analytics</Title>
        
            <div className="flex justify-between">
                <Link href="/home" className="bg-blue-500 text-white px-4 py-2 mx-4 mb-5 inline-block rounded-md hover:bg-blue-600 transition-colors duration-300">
                    <span className="block md:hidden md:py-3 px-3 md:px-0 ">Home</span>
                    <span className="hidden md:block">Home</span>
                </Link>

                <p className="text-gray-600 mt-2">
                    Here you can see Next CRM best clients and best sellers.
                </p>
            </div>

			<div className="grid gap-8">
				<div className="rounded-xl overflow-hidden dark:bg-slate-900 border border-slate-800 shadow-lg">
					<div className="p-6 pb-2">
						<h3 className="text-2xl font-semibold text-slate-700 dark:text-white">
							Best Clients
						</h3>
					</div>
					<div className="px-6 pb-6">
						<BestClients />
					</div>
				</div>

				<div className="rounded-xl overflow-hidden dark:bg-slate-900 border border-slate-800 shadow-lg">
					<div className="p-6 pb-2">
						<h3 className="text-2xl font-semibold text-slate-700 dark:text-white">
							Best Sellers
						</h3>
					</div>
					<div className="px-6 pb-6">
						<BestSellers />
					</div>
				</div>
			</div>
		</div>
	);
}
