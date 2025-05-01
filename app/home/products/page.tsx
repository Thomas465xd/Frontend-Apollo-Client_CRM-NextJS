import ProductTable from "@/components/home/products/ProductTable";
import Title from "@/components/ui/Title";
import Link from "next/link";

export default function Products() {

	return (
        <div className="">
            <Title>Manage your Products</Title>

            <div className="flex justify-between">
                <Link href="/home/products/new" className="bg-blue-500 text-white px-4 py-2 mx-4 mb-5 inline-block rounded-md hover:bg-blue-600 transition-colors duration-300">
                    <span className="block sm:hidden py-3 ">Create</span>
                    <span className="hidden sm:block">Create a new Product</span>
                </Link>

                <p className="text-gray-600 mt-2">
                    Complete the form to register a new Product.
                </p>
            </div>

            <ProductTable />
        </div>
	);
}
