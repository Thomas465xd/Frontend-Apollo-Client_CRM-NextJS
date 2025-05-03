import OrderContext from "@/src/context/orders/OrderContext"
import { formatPriceToUSD } from "@/src/utils/price";
import { useContext, useEffect } from "react"

export default function OrderTotal() {

    //? Order Context
    const orderContext = useContext(OrderContext);
    const { total, products, updateTotal } = orderContext;

    useEffect(() => {
        updateTotal();
    }, [products, updateTotal]); // 👈 Trigger when products change

    //console.log(total)

    return (
        <div className="flex items-center mt-5 justify-between dark:bg-slate-800 p-3 border-solid border-2 border-gray-400 rounded">
            <h2 className="">Order Total: </h2>
            <p className="font-semibold dark:text-blue-300 text-blue-600">{formatPriceToUSD( total )}</p>
        </div>
    )
}
