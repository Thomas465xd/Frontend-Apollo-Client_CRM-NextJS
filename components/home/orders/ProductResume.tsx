import OrderContext from "@/src/context/orders/OrderContext"
import { Product } from "@/src/types"
import { formatPriceToUSD } from "@/src/utils/price"
import { useContext, useEffect, useState } from "react"

type ProductResumeProps = {
    product : Product
}

export default function ProductResume({ product } : ProductResumeProps) {
    // States
    const [quantity, setQuantity] = useState<number>(0); 

    //? Order Context
    const orderContext = useContext(OrderContext); 
    const { productsQuantity, updateTotal } = orderContext;

    useEffect(() => {
        updateTotal();
    }, [quantity, updateTotal]);
    
    /** 
    const updateQuantity = () => {
        const newProduct = {
            ...product,
            quantity,
        }
        
        productsQuantity(newProduct);
    }
    **/

    const { name, stock, price, discount, priceWithDiscount } = product

    return (
        <div className="md:flex md:items-center md:justify-between mt-5">
            <div className="md:w-1/2 mb-2 md:mb-0">
                <p className="text-sm mb-1">
                    Product: <span className="font-semibold underline">{ name }</span>
                </p>
                <p className="text-sm">
                    Price: <span className="font-semibold">{formatPriceToUSD(price)}</span>
                </p>

                {discount && (
                    <>
                        <p className="text-sm">
                            Discount: <span className="font-semibold dark:text-green-300 text-green-600">{discount}%</span>
                        </p>

                        <p className="text-sm">
                            Subtotal: <span className="font-bold text-blue-500">{formatPriceToUSD(priceWithDiscount || 0)}</span>
                        </p>
                    </>
                )}
            </div>

            <input
                type="number"
                placeholder="Quantity"
                className="py-1 px-2 border-2 border-blue-600 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={quantity || ""}
                min={1}
                onChange={(e) => {
                    const value = e.target.value;
                
                    // Prevent non-digit characters
                    if (!/^\d*$/.test(value)) return;
                
                    const numeric = parseInt(value, 10);
                
                    // If value is empty
                    if (value === "") {
                        setQuantity(0);
                        productsQuantity({ ...product, quantity: 0 });
                        return;
                    }
                
                    // If numeric value exceeds stock
                    if (!isNaN(numeric)) {
                        const clamped = Math.min(numeric, stock);
                        setQuantity(clamped);
                        productsQuantity({ ...product, quantity: clamped });
                    }
                }}
                
            />
        </div>
    )
}
