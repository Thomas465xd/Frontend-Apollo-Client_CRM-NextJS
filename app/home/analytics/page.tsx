import BestClients from "@/components/home/analytics/BestClients";
import BestSellers from "@/components/home/analytics/BestSellers";
import Title from "@/components/ui/Title";

export default function Analytics() {
	return (
		<div className="space-y-8 p-6">
			<Title>Your CRM Analytics</Title>

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
