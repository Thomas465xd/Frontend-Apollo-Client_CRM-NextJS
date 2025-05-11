import BestClients from "@/components/home/analytics/BestClients";
import BestSellers from "@/components/home/analytics/BestSellers";
import Title from "@/components/ui/Title";

export default function Analytics() {
	

	return (
		<div className="">
			<Title>Your CRM Analytics</Title>

            <BestClients />
            <BestSellers />
		</div>
	);
}
