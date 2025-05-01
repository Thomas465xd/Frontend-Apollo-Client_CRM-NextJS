"use client";
import { Fragment, useState } from "react";
import Loader from "@/components/ui/Loader";
import { Product } from "@/src/types";
import { copyToClipboard } from "@/src/utils/copy";
import { formatPriceToUSD } from "@/src/utils/price";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import {
	Box,
	Coins,
	Package,
	Pen,
	Percent,
	Search,
	ChevronDown,
	ChevronUp,
	Clipboard,
	AlertCircle,
	Info,
} from "lucide-react";
import { redirect } from "next/navigation";
import Dialog from "@/components/ui/Dialog";
import Swal, { SweetAlertTheme } from "sweetalert2";
import { toast } from "react-toastify";
import { DELETE_PRODUCT, GET_PRODUCTS } from "@/src/graphql/products";

export default function ProductTable() {
	// State for Search term
	const [searchTerm, setSearchTerm] = useState("");

    // State for expanded rows
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

	//? Get products by seller
	const { loading, error, data } = useQuery(GET_PRODUCTS);

    //! Delete Product
    // Mutation to delete a client
    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        update(cache, { data }, { variables }) {
            if (!data || !variables?.id) return;
    
            // Read existing data
            const existing = cache.readQuery<{ getProductsBySeller: Product[] }>({
                query: GET_PRODUCTS,
            });
    
            if (existing) {
                // Write new data without the deleted client
                cache.writeQuery({
                    query: GET_PRODUCTS,
                    data: {
                        getProductsBySeller: existing.getProductsBySeller.filter(
                            (product) => product.id !== variables.id
                        ),
                    },
                });
            }
        },
    });

	if (error) return <p className="text-red-500">Error: {error.message}</p>;

	if (loading) return <Loader />;

	// Filter Products based on search term
	const filteredProducts =
		data?.getProductsBySeller?.filter(
			(product : Product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.id.toLowerCase().includes(searchTerm.toLowerCase())
		) || [];

    // Toggle row expansion
    const toggleRowExpansion = (productId: Product["id"]) => {
        setExpandedRows(prev => ({
        ...prev,
        [productId]: !prev[productId]
        }));
    };

	// Handle delete product
    const handleDeleteProduct = async (id: string) => {
        try {
            Swal.fire({
                title: "Are you sure?", 
                text: "You won't be able to revert this action!", 
                icon: "warning",
                showCancelButton: true, 
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete product!",
                theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
            }).then(async (result) => {
                try {
                    if(result.isConfirmed) {
                        const { data } = await deleteProduct({
                            variables: {
                                id
                            }
                        })

                        Swal.fire({
                            title: "Product Deleted 🎉",
                            text: data.deleteProduct,
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
            toast.error("Error deleting product");
        }
    }

	if(data) return (
		<div className="overflow-hidden rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
			{/* Search bar */}
			<div className="bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Search size={18} className="text-slate-400" />
					</div>
					<input
						type="text"
						placeholder="Search Product by Name or ID..."
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
									<Package size={16} />
									<span>Name</span>
								</div>
							</th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<Coins size={16} />
									<span>Price</span>
								</div>
							</th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<Percent size={16} />
									<span>Discount</span>
								</div>
							</th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<Box size={16} />
									<span>Stock</span>
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
						{filteredProducts.map((product : Product) => (
							<Fragment key={product.id}>
								<tr
									key={`row-${product.id}`}
									className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-300 cursor-pointer"
								>
									<td 
                                        className="px-3 py-4 text-center"
                                        onClick={() =>
                                            toggleRowExpansion(product.id)
                                        }
                                    >
										{expandedRows[product.id] ? (
                                            <div className="group relative">
                                                <ChevronUp
                                                    size={16}
                                                    className="text-slate-500"
                                                />
                                                <Dialog position="right-top">Less Info</Dialog>
                                            </div>
										) : (
                                            <div className="group relative">
                                                <ChevronDown
                                                    size={16}
                                                    className="text-slate-500"
                                                />
                                                <Dialog position="right-top">More Info</Dialog>
                                            </div>
										)}
									</td>
									<td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
										<div className="flex items-center">
											<span className="mr-2">
												{product.name}
											</span>
											<button
												onClick={() => copyToClipboard(product.name)}
												className="text-slate-400 hover:text-blue-500 transition-colors duration-200 group relative"
												title="Copy product name"
											>
                                                <Dialog position="right-top">Copy</Dialog>
												<Clipboard size={14} />
											</button>
										</div>
									</td>
									<td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
										{formatPriceToUSD(product.price)}
										{product.discount !== 0 && (
											<span className="ml-2 text-xs text-green-500 font-medium">
												{formatPriceToUSD(
													product.priceWithDiscount || 0
												)}
											</span>
										)}
									</td>
									<td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
										{product.discount ? (
											<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-200 text-green-800">
												{product.discount}%
											</span>
										) : (
											<span className="text-slate-400">
												N/A
											</span>
										)}
									</td>
									<td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
										{product.stock > 10 ? (
											<span className="text-green-600 dark:text-green-400">
												{product.stock}
											</span>
										) : product.stock > 0 ? (
											<span className="text-orange-500 flex items-center">
												<AlertCircle
													size={14}
													className="mr-1"
												/>
												{product.stock}
											</span>
										) : (
											<span className="text-red-500">
												Out of stock
											</span>
										)}
									</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                                        <div className="flex items-center gap-5">
                                            <button 
                                                className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                                                onClick={() => redirect(`/home/products/${product.id}`)}
                                            >
                                                Edit
                                            </button>

                                            <button 
                                                className="text-red-700 hover:text-red-900 transition-colors duration-300"
                                                onClick={() => handleDeleteProduct(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
								</tr>
								{/* Expanded Details Row */}
								{expandedRows[product.id] && (
									<tr
										key={`details-${product.id}`}
										className="bg-slate-50 dark:bg-slate-700/50"
									>
										<td colSpan={6} className="px-6 py-4">
											<div className="flex items-start gap-2 text-sm">
												<Info
													size={18}
													className="text-slate-400 mt-0.5"
												/>
												<div className="space-y-2 w-full">
													<div className="flex flex-col">
														<span className="text-xs text-slate-500 dark:text-slate-400">
															Product ID:
														</span>
														<div className="flex items-center">
															<span className="font-mono text-slate-800 dark:text-slate-200 mr-2">
																{product.id}
															</span>
															<button
                                                                title="Copy product ID"
																onClick={() =>
																	copyToClipboard(
																		product.id
																	)
																}
																className="text-slate-400 hover:text-blue-500 transition-colors duration-200"
															>
																<Clipboard
																	size={14}
																/>
															</button>
														</div>
													</div>

													<div>
														<span className="text-xs text-slate-500 dark:text-slate-400">
															Description:
														</span>
														<p className="text-slate-800 dark:text-slate-200 whitespace-normal">
															{product.description ||
																"No description available"}
														</p>
													</div>

													<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
														<div>
															<span className="text-xs text-slate-500 dark:text-slate-400">
																Original Price:
															</span>
															<p className="font-medium text-slate-800 dark:text-slate-200">
																{formatPriceToUSD(
																	product.price
																)}
															</p>
														</div>

														{product.discount !== 0 ? (
															<div>
																<span className="text-xs text-slate-500 dark:text-slate-400">
																	Price with
																	Discount:
																</span>
																<p className="font-medium text-green-600 dark:text-green-400">
																	{formatPriceToUSD(
																		product.priceWithDiscount || 0
																	)}
																</p>
															</div>
														) : (
                                                            <div>
                                                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                                                    Price with
                                                                    Discount:
                                                                </span>
                                                                <p className="font-medium text-slate-400 dark:text-slate-500">
                                                                    N/A
                                                                </p>
                                                            </div>
                                                        )}

														<div>
															<span className="text-xs text-slate-500 dark:text-slate-400">
																Stock Status:
															</span>
															<p
																className={`font-medium ${
																	product.stock >
																	10
																		? "text-green-600 dark:text-green-400"
																		: product.stock >
																		    0
																		? "text-orange-500"
																		: "text-red-500"
																}`}
															>
																{product.stock >
																10
																	? "In Stock"
																	: product.stock >
																	    0
																	? "Low Stock"
																	: "Out of Stock"}
															</p>
														</div>
													</div>
												</div>
											</div>
										</td>
									</tr>
								)}
							</Fragment>
						))}
					</tbody>
				</table>
			</div>

			{/* Table footer with count */}
			<div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 border-t border-slate-200 dark:border-slate-700">
				<p className="text-xs text-slate-500 dark:text-slate-400">
					Showing {filteredProducts.length} of{" "}
					{data.getProductsBySeller.length} products
				</p>
			</div>
		</div>
	);
}
