import { useState } from "react";
import { Mail, Phone, Map, IdCard, CalendarArrowUp, PenLineIcon, XCircleIcon, BookCheck, User, ReceiptIcon } from "lucide-react";
import { Order } from "@/src/types";
import { copyToClipboard } from "@/src/utils/copy";
import Dialog from "@/components/ui/Dialog";
import { formatPriceToUSD } from "@/src/utils/price";
import { ApolloError, useMutation } from "@apollo/client";
import { DELETE_ORDER, GET_ORDERS, UPDATE_ORDER } from "@/src/graphql/orders";
import { toast } from "react-toastify";
import { formatUnixTimestamp } from "@/src/utils/date";
import Swal, { SweetAlertTheme } from "sweetalert2";

type OrderCardProps = {
	order: Order;
};

export default function OrderCard({ order }: OrderCardProps) {
	// Destructure order object
	const { id, total, client, status, order: orderItems, createdAt, updatedAt } = order;

	// State for order status
	const [orderStatus, setOrderStatus] = useState(status);

	//* Mutations

	const [updateOrder] = useMutation(UPDATE_ORDER);
	const [deleteOrder] = useMutation(DELETE_ORDER, {
        update(cache, { data }, { variables }) {
            if (!data || !variables?.id) return;
    
            // Read existing data
            const existing = cache.readQuery<{ getOrders: Order[] }>({
                query: GET_ORDERS,
            });
    
            if (existing) {
                // Write new data without the deleted client
                cache.writeQuery({
                    query: GET_ORDERS,
                    data: {
                        getOrders: existing.getOrders.filter(
                            (order) => order.id !== variables.id
                        ),
                    },
                });
            }
        },
    });

	//*

	// Derive the color class directly from orderStatus
	const statusColor = (() => {
		switch (orderStatus) {
			case "PENDING":
				return "bg-gradient-to-r from-orange-600 to-yellow-400";
			case "COMPLETED":
				return "bg-gradient-to-r from-green-500 to-blue-800";
			case "CANCELLED": // mind spelling consistency
				return "bg-gradient-to-r from-red-700 to-orange-600";
			default:
				return "bg-gray-500";
		}
	})();

	const handleStatusChange = async (newStatus: string) => {
		try {
			const { data } = await updateOrder({
				variables: {
					id,
					input: {
						status: newStatus,
						client: client.id,
					},
				},
			});

			if (data.updateOrder) {
				setOrderStatus(
					newStatus as "PENDING" | "COMPLETED" | "CANCELLED"
				);
				toast.success("Order status updated successfully", {
					theme: `${localStorage.getItem("theme")}`,
				});
			}
		} catch (error) {
			if (error instanceof ApolloError) {
				toast.error(error.message, {
					theme: `${localStorage.getItem("theme")}`,
				});
			} else {
				toast.error("Unexpected error", {
					theme: `${localStorage.getItem("theme")}`,
				});
			}
		}
	};

    // Function to handle the deletion of a client
    const handleDelete = async (id: string) => {
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
                        const { data } = await deleteOrder({
                            variables: {
                                id
                            }
                        })

                        Swal.fire({
                            title: "Deleted 🎉",
                            text: data.deleteOrder,
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
            toast.error("Error deleting order");
        }
    }

    return (
		<div className="my-6 rounded-md shadow-lg bg-gradient-to-br dark:from-blue-900 dark:via-slate-600 dark:to-blue-900 from-blue-500 via-slate-400 to-blue-500 dark:p-px p-0.5">
			<div className="bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 from-slate-300 via-slate-100 to-blue-100 rounded-md p-6 md:grid md:grid-cols-2 md:gap-8 h-full">
				{/* Client Information */}
				<div className="mb-6 md:mb-0 flex flex-col h-full">
					{/* Client details */}
					<div className="flex-grow">
						<h3 className="font-bold text-lg mb-2 flex items-center gap-2">
							Client:{" "}
							<span className="dark:text-blue-400 text-blue-500">
								{client.name} {client.surname}
							</span>
							<span className="text-xs dark:text-gray-400 text-gray-600">
								/ {client.businessName} {`${(client.role) ? `(${client.role})` : ""}`}
							</span>
						</h3>

						{client.email && (
							<div className="flex items-center gap-2 dark:text-gray-300 text-slate-800 mb-3">
								<Mail size={16} className="text-blue-400" />
								<span className="font-medium">Email:</span>
								<span
									className="dark:text-gray-400 text-blue-500 hover:text-blue-400 cursor-pointer transition-colors duration-200 group relative"
									onClick={() =>
										copyToClipboard(client.email || "")
									}
								>
									{client.email}
									<Dialog position="bottom">
										Copy Email
									</Dialog>
								</span>
							</div>
						)}

						{client.phone && (
							<div className="flex items-center gap-2 dark:text-gray-300 text-slate-800 mb-3">
								<Phone size={16} className="text-blue-400" />
								<span className="font-medium">Phone:</span>
								<span className="dark:text-gray-400 text-blue-500">
									{client.phone}
								</span>
							</div>
						)}

						{client.address && (
							<div className="flex items-center gap-2 dark:text-gray-300 text-slate-800 mb-3">
								<Map size={16} className="text-blue-400" />
								<span className="font-medium">Address:</span>
								<span className="dark:text-gray-400 text-blue-500">
									{client.address}
								</span>
							</div>
						)}

						<div className="flex items-center gap-2 dark:text-gray-300 text-slate-800 mb-3">
							<IdCard size={16} className="text-blue-400" />
							<span className="font-medium">Order ID:</span>
							<span
								className="dark:text-gray-400 text-blue-500 hover:text-blue-400 cursor-pointer transition-colors duration-200 group relative"
								onClick={() => copyToClipboard(id)}
							>
								{id}
								<Dialog position="bottom">Copy ID</Dialog>
							</span>
						</div>

                        <div className="mt-10 gap-2 dark:text-gray-300 text-slate-800">
                            <h3 className="font-bold mb-3 text-xl">Extra Order Info:</h3>

                            <div className="flex items-center gap-2">
                                <CalendarArrowUp size={16} className="text-blue-400" />
                                <span className="font-medium">Created at:</span>
                                <span className="dark:text-gray-400 text-blue-500">
                                    {formatUnixTimestamp(parseInt(createdAt))}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <PenLineIcon size={16} className="text-blue-400" />
                                <span className="font-medium">Updated at:</span>
                                <span className="dark:text-gray-400 text-blue-500">
                                    {formatUnixTimestamp(parseInt(updatedAt))}
                                </span>
                            </div>
                        </div>
					</div>

					{/* Order Status - Now at the bottom */}
					<div className="mt-auto pt-4">
						<h3 className="font-bold mb-3 text-center">
							Order Status:
						</h3>
						<div className="flex justify-center">
							<select
								title="Order Status"
								name="status"
								id="status"
								value={orderStatus}
								onChange={(e) =>
									handleStatusChange(e.target.value)
								}
								className={`appearance-none ${statusColor} 
                                py-2 px-4 rounded leading-tight text-white
                                focus:outline-none uppercase text-xs font-bold text-center
                                cursor-pointer transition-colors duration-200 w-full max-w-xs`}
							>
								<option value="PENDING" className="dark:bg-slate-800 bg-slate-500">Pending</option>
								<option value="COMPLETED" className="dark:bg-slate-800 bg-slate-500">Completed</option>
								<option value="CANCELLED" className="dark:bg-slate-800 bg-slate-500">Cancelled</option>
							</select>
						</div>
					</div>
				</div>

				{/* Order Details */}
				<div className="border-t pt-6 mt-6 md:border-t-0 md:pt-0 md:mt-0 md:border-l md:pl-8 md:border-gray-700 flex flex-col h-full">
					<div className="flex-grow">
                        <div className="flex items-center gap-2 mb-4">
                            <BookCheck size={16} className="text-blue-400"/>
                            <h3 className="font-bold text-lg">Order Summary:</h3>
                        </div>

						<div className="space-y-4">
							{orderItems.map((item) => (
								<div
									key={item.id}
									className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-md shadow-md"
								>
									<div className="text-gray-300 flex-1">
										Product:{" "}
										<span className="font-semibold text-blue-400">
											{item.name}
										</span>
									</div>

									<div className="grid grid-cols-2 gap-2">
										<div className="text-gray-300">
											Quantity:{" "}
											<span className="font-semibold ">
												{item.quantity}
											</span>
										</div>
										<div className="text-gray-300">
											Price:{" "}
											<span className="font-semibold ">
												{formatPriceToUSD(item.price)}
											</span>
										</div>
										<div className="text-gray-300">
											Discount:{" "}
											<span className="font-semibold ">
												{item.discount}%
											</span>
										</div>
										<div className="text-gray-300">
											Total:{" "}
											<span className="font-semibold ">
												{formatPriceToUSD(
													item.priceWithDiscount ?? 0
												)}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-6 font-bold text-lg flex items-center gap-2">
                            <ReceiptIcon size={16} className="text-blue-400"/>
							Total:{" "}
							<span className="text-blue-400">
								{formatPriceToUSD(total)} USD
							</span>
						</div>
					</div>

					{/* Delete button at the bottom of second column */}
					<div className="mt-auto pt-4">
						<div className="flex items-center justify-center">
							<button
								title="Delete Order"
								type="button"
								onClick={() => handleDelete(id)}
								className="flex gap-2 bg-red-800 hover:bg-red-900 px-6 py-2 text-white rounded font-bold text-xs uppercase transition-colors duration-200"
							>
								<XCircleIcon size={16} /> Delete Order
							</button>

							{/* Edit Order 
							<button
								title="Edit Order"
								type="button"
								onClick={() => redirect(`/home/orders/edit/${id}`)}
								className="bg-blue-500 hover:bg-blue-600 px-6 py-2 text-white rounded font-bold text-xs uppercase transition-colors duration-200"
							>
								Edit
							</button>
							*/}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
