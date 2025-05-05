import OrdersTable from "@/components/home/orders/OrdersTable";
import Title from "@/components/ui/Title";
import Link from "next/link";

export default function Orders() {
	return (
        <div className="">
            <Title>Manage your Orders</Title>

            <div className="flex justify-between">
                <Link href="/home/orders/new" className="bg-blue-500 text-white px-4 py-2 mx-4 mb-5 inline-block rounded-md hover:bg-blue-600 transition-colors duration-300">
                    <span className="block lg:hidden lg:py-3">Register</span>
                    <span className="hidden lg:block">Register new Order</span>
                </Link>

                <p className="text-gray-600 mt-2">
                    Complete the register order form to create a new order in the system.
                </p>
            </div>

            <OrdersTable />
        </div>
	);
}
