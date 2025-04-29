"use client";
import Loader from "@/components/ui/Loader";
import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Search, UserCircle, Building, Mail, Edit } from "lucide-react";
import { copyToClipboard } from "@/src/utils/copy";
import { ClientInput, RegisterClientForm } from "@/src/types";
import { toast } from "react-toastify";
import Swal, { SweetAlertTheme } from "sweetalert2";
import { redirect } from "next/navigation";
import Dialog from "@/components/ui/Dialog";

const GET_SELLER_CLIENTS = gql`
	query getSellerClients {
		getSellerClients {
			id
			name
			surname
			businessName
			email
		}
	}
`;

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id)
    }
`;

export default function ClientTable() {
	// Query to get all clients
	const { data, loading, error } = useQuery(GET_SELLER_CLIENTS);

    // Mutation to delete a client
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        update(cache, { data }, { variables }) {
            if (!data || !variables?.id) return;
    
            // Read existing data
            const existing = cache.readQuery<{ getSellerClients: ClientInput[] }>({
                query: GET_SELLER_CLIENTS,
            });
    
            if (existing) {
                // Write new data without the deleted client
                cache.writeQuery({
                    query: GET_SELLER_CLIENTS,
                    data: {
                        getSellerClients: existing.getSellerClients.filter(
                            (client) => client.id !== variables.id
                        ),
                    },
                });
            }
        },
    });
    

	const [searchTerm, setSearchTerm] = useState("");

	if (loading) return <Loader />;

	if (error)
		return (
			<div className="bg-red-50 text-red-500 p-4 rounded-lg shadow">
				Error loading clients: {error.message}
			</div>
		);

	// Filter clients based on search term
	const filteredClients =
		data?.getSellerClients.filter(
			(client: RegisterClientForm) =>
				client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				client.surname
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				client.businessName
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				client.email.toLowerCase().includes(searchTerm.toLowerCase())
		) || [];

    // Function to handle the deletion of a client
    const handleDeleteClient = async (id: string) => {
        try {
            Swal.fire({
                title: "Are you sure?", 
                text: "You won't be able to revert this action!", 
                icon: "warning",
                showCancelButton: true, 
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
                theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
            }).then(async (result) => {
                try {
                    if(result.isConfirmed) {
                        const { data } = await deleteClient({
                            variables: {
                                id
                            }
                        })

                        Swal.fire({
                            title: "Deleted 🎉",
                            text: data.deleteClient,
                            icon: "success",
                            theme: `${localStorage.getItem("theme") as SweetAlertTheme}`  
                        })
                    }
                } catch (error) {
                    if (error instanceof ApolloError) {
                        toast.error(error.message);
                    } else {
                        toast.error("Unexpected error");
                    }
                }
            })
        } catch {
            toast.error("Error deleting client");
        }
    }

	return (
		<div className="overflow-hidden rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
			{/* Search bar */}
			<div className="bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Search size={18} className="text-slate-400" />
					</div>
					<input
						type="text"
						placeholder="Search clients..."
						className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-left text-sm text-white">
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<UserCircle size={16} />
									<span>Name</span>
								</div>
							</th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<UserCircle size={16} />
									<span>Surname</span>
								</div>
							</th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<Building size={16} />
									<span>Company</span>
								</div>
							</th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<Mail size={16} />
									<span>Email</span>
								</div>
							</th>

							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<Edit size={16} />
									<span>Actions</span>
								</div>
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
						{filteredClients.length > 0 ? (
							filteredClients.map(
								(client: RegisterClientForm) => (
									<tr
										key={client.id}
										className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
									>
										<td 
                                            className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-200 group relative"
                                        >
											<span
												className="hover:text-blue-500 hover:underline cursor-pointer transition-colors duration-200"
												onClick={() =>
													copyToClipboard(client.name)
												}
											>
												{client.name}
                                                <Dialog>More Info</Dialog>
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-200">
											{client.surname}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-200">
											{client.businessName || "—"}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-200 group relative">
											<span
												className="hover:text-blue-500 hover:underline cursor-pointer transition-colors duration-200"
												onClick={() =>
													copyToClipboard(client.email)
												}
											>
												{client.email}
                                                <Dialog>Copy To Clipboard</Dialog>
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
											<div className="flex items-center gap-5">
												<button 
                                                    className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                                                    onClick={() => redirect(`/home/clients/edit/${client.id}`)}
                                                >
													Edit
												</button>

												<button 
                                                    className="text-red-700 hover:text-red-900 transition-colors duration-300"
                                                    onClick={() => handleDeleteClient(client.id ?? "")}
                                                >
													Delete
												</button>
											</div>
										</td>
									</tr>
								)
							)
						) : (
							<tr>
								<td
									colSpan={4}
									className="px-6 py-8 text-center text-slate-500 dark:text-slate-400"
								>
									No clients found matching your search
									criteria.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Table footer with count */}
			<div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 border-t border-slate-200 dark:border-slate-700">
				<p className="text-xs text-slate-500 dark:text-slate-400">
					Showing {filteredClients.length} of{" "}
					{data?.getSellerClients.length || 0} clients
				</p>
			</div>
		</div>
	);
}
