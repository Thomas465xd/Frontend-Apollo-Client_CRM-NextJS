import CreateProductForm from "@/components/home/products/CreateProductForm";
import Title from "@/components/ui/Title";
import Link from "next/link";

export default function ProductsNew() {
	return (
        <div className="">
            <Title>Register Product</Title>

            <div className="flex justify-between">
                <Link href="/home/products" className="bg-blue-500 text-white px-4 py-2 mx-4 mb-5 inline-block rounded-md hover:bg-blue-600 transition-colors duration-300">
                    Go Back
                </Link>

                <p className="text-gray-600 mt-2">
                    Complete the form to register a new Product.
                </p>
            </div>

            <CreateProductForm />
        </div>
	);
}
