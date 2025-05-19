import EditClientForm from "@/components/home/clients/EditClientForm";
import Title from "@/components/ui/Title";
import Link from "next/link";

export default async function EditClient({params}: {params: Promise<{ clientId: string }>}) {
    const { clientId } = await params;

    return (
        <div className="">
            <Title>Edit Client</Title>

            <div className="flex justify-between">
                <Link href="/home/clients" className="bg-blue-500 text-white px-4 py-2 mx-4 mb-5 inline-block rounded-md hover:bg-blue-600 transition-colors duration-300">
                    Go Back
                </Link>

                <p className="text-gray-600 mt-2">
                    Complete the form to update your Client.
                </p>
            </div>

            <EditClientForm clientId={clientId} />
        </div>
    );
}