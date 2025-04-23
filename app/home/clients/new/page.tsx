import CreateClientForm from "@/components/home/clients/CreateClientForm";
import Title from "@/components/ui/Title";
import Link from "next/link";

export default function ClientsNew() {
	return (
        <div className="">
            <Title>Register Client</Title>

            <div className="flex justify-between">
                <Link href="/home/clients" className="bg-blue-500 text-white px-4 py-2 mx-4 mb-5 inline-block rounded-md hover:bg-blue-600 transition-colors duration-300">
                    Go Back
                </Link>

                <p className="text-gray-600 mt-2">
                    Complete the form to register a new Client.
                </p>
            </div>

            <CreateClientForm />
        </div>
	);
}
