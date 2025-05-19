import EditProductForm from "@/components/home/products/EditProductForm";
import Title from "@/components/ui/Title";
import Link from "next/link";

export default async function EditProduct({params}: {params: Promise<{ productId: string }>}) {
    const { productId } = await params;

    return (
        <div className="">
            <Title>Edit Product</Title>

            <div className="flex justify-between">
                <Link href="/home/products" className="bg-blue-500 text-white px-4 py-2 mx-4 mb-5 inline-block rounded-md hover:bg-blue-600 transition-colors duration-300">
                    Go Back
                </Link>

                <p className="text-gray-600 mt-2">
                    Complete the form to update your Registered Product.
                </p>
            </div>

            <EditProductForm productId={productId} />
        </div>
    );
}