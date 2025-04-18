import ClientTable from "@/components/home/clients/ClientTable";
import Title from "@/components/ui/Title";

export default function Clients() {
	return (
        <div className="">
            <Title>Your Clients</Title>

            <ClientTable />
        </div>
	);
}
