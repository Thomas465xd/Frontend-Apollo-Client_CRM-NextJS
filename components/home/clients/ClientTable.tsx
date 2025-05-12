"use client";
import { Fragment, useState } from "react";
import Loader from "@/components/ui/Loader";
import { copyToClipboard } from "@/src/utils/copy";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import {
	Search,
	ChevronDown,
	ChevronUp,
	Clipboard,
	Info,
	User,
	AtSign,
	Building,
	UserCheck,
	Pen,
    MapPin,
    Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Dialog from "@/components/ui/Dialog";
import Swal, { SweetAlertTheme } from "sweetalert2";
import { toast } from "react-toastify";
import { DELETE_CLIENT, GET_SELLER_CLIENTS } from "@/src/graphql/clients";
import { ClientTableResume } from "@/src/types";

export default function ClientTable() {
	// Router
	const router = useRouter();

	// State for Search term
	const [searchTerm, setSearchTerm] = useState("");

	// State for expanded rows
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>(
		{}
	);

	//? Get clients
	const { loading, error, data } = useQuery(GET_SELLER_CLIENTS);

	//! Delete Client
	// Mutation to delete a client
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		update(cache, { data }, { variables }) {
			if (!data || !variables?.id) return;

			// Read existing data
			const existing = cache.readQuery<{ getSellerClients: ClientTableResume[] }>({
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

	// Filter Clients based on search term
	const filteredClients =
		data?.getSellerClients?.filter(
			(client: ClientTableResume) =>
				client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				client.surname
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				client.businessName
					?.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
                client.id?.toLowerCase().includes(searchTerm.toLowerCase())
		) || [];

	// Toggle row expansion
    const toggleRowExpansion = (clientId: ClientTableResume["id"]) => {
        setExpandedRows((prev) => ({
            ...prev,
            [clientId as string]: !prev[clientId as string],
        }));
    };

	// Handle delete client
	const handleDeleteClient = async (id: string) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this action!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete client!",
				theme: `${localStorage.getItem("theme") as SweetAlertTheme}`,
			}).then(async (result) => {
				try {
					if (result.isConfirmed) {
						const { data } = await deleteClient({
							variables: {
								id,
							},
						});

						Swal.fire({
							title: "Client Deleted 🎉",
							text: data.deleteClient,
							icon: "success",
							theme: `${
								localStorage.getItem("theme") as SweetAlertTheme
							}`,
						});
					}
				} catch (error) {
					if (error instanceof ApolloError) {
						toast.error(error.message);
					} else {
						toast.error("Unexpected error");
					}
				}
			});
		} catch {
			toast.error("Error deleting client");
		}
	};

	if (loading) return <Loader />;

	if (error) {
		toast.error("Error loading clients data");
		router.push("/home/clients");
	}

	if (data)
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
							placeholder="Search client by Name, Email, businessName or ID..."
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
								<th className="w-8 px-2 py-4"></th>
								<th className="px-6 py-4 font-medium">
									<div className="flex items-center gap-2">
										<User size={16} />
										<span>Name</span>
									</div>
								</th>
								<th className="px-6 py-4 font-medium">
									<div className="flex items-center gap-2">
										<User size={16} />
										<span>Surname</span>
									</div>
								</th>
								<th className="px-6 py-4 font-medium">
									<div className="flex items-center gap-2">
										<Building size={16} />
										<span>businessName</span>
									</div>
								</th>
								<th className="px-6 py-4 font-medium">
									<div className="flex items-center gap-2">
										<AtSign size={16} />
										<span>Email</span>
									</div>
								</th>
								<th className="px-6 py-4 font-medium">
									<div className="flex items-center gap-2">
										<Pen size={16} />
										<span>Actions</span>
									</div>
								</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
							{filteredClients.length > 0 ? (
								filteredClients.map((client: ClientTableResume) => (
									<Fragment key={client.id}>
										<tr
											key={`row-${client.id}`}
											className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-300 cursor-pointer"
										>
											<td
												className="px-3 py-4 text-center"
												onClick={() =>
													toggleRowExpansion(
														client.id
													)
												}
											>
												{expandedRows[client.id] ? (
													<div className="group relative">
														<ChevronUp
															size={16}
															className="text-slate-500"
														/>
														<Dialog position="right-top">
															Less Info
														</Dialog>
													</div>
												) : (
													<div className="group relative">
														<ChevronDown
															size={16}
															className="text-slate-500"
														/>
														<Dialog position="right-top">
															More Info
														</Dialog>
													</div>
												)}
											</td>
											<td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
												{client.name}
											</td>
											<td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
												{client.surname}
											</td>
											<td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
												{client.businessName || "N/A"}
											</td>
											<td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
												<div className="flex items-center">
													<span className="mr-2">
														{client.email}
													</span>
													<button
														onClick={() =>
															copyToClipboard(
																client.email
															)
														}
														className="text-slate-400 hover:text-blue-500 transition-colors duration-200 group relative"
														title="Copy email"
													>
														<Dialog position="right-top">
															Copy
														</Dialog>
														<Clipboard size={14} />
													</button>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
												<div className="flex items-center gap-5">
													<button
														className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
														onClick={() =>
															router.push(
																`/home/clients/edit/${client.id}`
															)
														}
													>
														Edit
													</button>

													<button
														className="text-red-700 hover:text-red-900 transition-colors duration-300"
														onClick={() =>
															handleDeleteClient(
																client.id as string
															)
														}
													>
														Delete
													</button>
												</div>
											</td>
										</tr>
										{/* Expanded Details Row */}
										{expandedRows[client.id] && (
											<tr
												key={`details-${client.id}`}
												className="bg-slate-50 dark:bg-slate-700/50"
											>
												<td
													colSpan={6}
													className="px-6 py-4"
												>
													<div className="flex items-start gap-2 text-sm">
														<Info
															size={18}
															className="text-slate-400 mt-0.5"
														/>
														<div className="space-y-2 w-full">
															<div className="flex flex-col">
																<span className="text-xs text-slate-500 dark:text-slate-400">
																	Client ID:
																</span>
																<div className="flex items-center">
																	<span className="font-mono text-slate-800 dark:text-slate-200 mr-2">
																		{
																			client.id ||
                                                                            "Not provided"
																		}
																	</span>
																	<button
																		title="Copy client ID"
																		onClick={() =>
																			copyToClipboard(
																				client.id || ""
																			)
																		}
																		className="text-slate-400 hover:text-blue-500 transition-colors duration-200"
																	>
																		<Clipboard
																			size={
																				14
																			}
																		/>
																	</button>
																</div>
															</div>

															<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
																<div>
																	<span className="text-xs text-slate-500 dark:text-slate-400">
																		Phone:
																	</span>
																	<div className="flex items-center gap-2">
                                                                        <Phone
                                                                                size={
                                                                                    16
                                                                                }
                                                                                className="text-blue-500"
                                                                        />
																		<p className="font-medium text-slate-800 dark:text-slate-200">
																			{client.phone || "Not provided"}
																		</p>
																		{client.phone && (
																			<button
																				title="Copy phone number"
																				onClick={() =>
																					copyToClipboard(
																						client.phone || ""
																					)
																				}
																				className="text-slate-400 hover:text-blue-500 transition-colors duration-200"
																			>
																				<Clipboard
																					size={
																						14
																					}
																				/>
																			</button>
																		)}
																	</div>
																</div>

																<div>
																	<span className="text-xs text-slate-500 dark:text-slate-400">
																		Role:
																	</span>
																	<div className="flex items-center">
																		<p className="font-medium text-slate-800 dark:text-slate-200">
																			<span className="inline-flex items-center gap-1">
																				<UserCheck
																					size={
																						16
																					}
																					className="text-blue-500"
																				/>
																				{client.role || "Not provided"}
																			</span>
																		</p>
																	</div>
																</div>

																<div>
																	<span className="text-xs text-slate-500 dark:text-slate-400">
                                                                        Address;
																	</span>
                                                                    <p className="font-medium text-slate-800 dark:text-slate-200">
                                                                        <span className="inline-flex items-center gap-1">
                                                                            <MapPin
                                                                                size={
                                                                                    16
                                                                                }
                                                                                className="text-blue-500"
                                                                            />
                                                                            {client.address || "Not provided"}
                                                                        </span>
                                                                    </p>
																</div>
															</div>
														</div>
													</div>
												</td>
											</tr>
										)}
									</Fragment>
								))
							) : (
								<tr>
									<td
										colSpan={6}
										className="px-6 py-8 text-center text-slate-500 dark:text-slate-400"
									>
										No clients found
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
						{data.getSellerClients.length} clients
					</p>
				</div>
			</div>
		);
}
