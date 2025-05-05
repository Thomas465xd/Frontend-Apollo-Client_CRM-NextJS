import OrderContext from "@/src/context/orders/OrderContext";
import { useContext } from "react"
import ProductResume from "./ProductResume";


export default function OrderResume() {

    //? Order Context
    const orderContext = useContext(OrderContext);
    const { products } = orderContext; 

    //console.log(products)

    return (
        <div className="my-5">
            <p className="border-l-3 pl-3 py-2 border-blue-600">Adjust the Products of your Order: </p>

            <div className="mt-5">
                {products.length > 0 ? products.map((product) => (
                    <ProductResume
                        key={product.id} 
                        product={product}
                    />
                )) : (
                    <p className="text-gray-600">Your Order is Empty</p>
                )}
            </div>
        </div>
    )
}