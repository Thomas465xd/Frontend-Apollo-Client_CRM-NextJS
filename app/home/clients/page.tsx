import ClientTable from "@/components/home/clients/ClientTable";
import Title from "@/components/ui/Title";
import Link from "next/link";

export default function Clients() {
	return (
        <div className="">
            <Title>Manage your Clients</Title>

            <div className="flex justify-between">
                <Link href="/home/clients/new" className="bg-blue-500 text-white px-4 py-2 mx-4 mb-5 inline-block rounded-md hover:bg-blue-600 transition-colors duration-300">
                <span className="block sm:hidden py-3">Add</span>
                <span className="hidden sm:block">Add New Client</span>
                </Link>

                <p className="text-gray-600 mt-2">
                    Complete the form to add a new client.
                </p>
            </div>

            <ClientTable />
        </div>
	);
}
