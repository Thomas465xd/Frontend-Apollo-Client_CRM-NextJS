import Loader from "@/components/ui/Loader"
import OrderContext from "@/src/context/orders/OrderContext"
import { GET_PRODUCTS } from "@/src/graphql/products"
import { Product } from "@/src/types"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import Select, { MultiValue } from "react-select"
import { toast } from "react-toastify"

// GraphQL query response type
interface GetProductsBySellerData {
    getProductsBySeller: Product[];
}

export default function AsignOrderProducts() {
    // Initialize router
    const router = useRouter(); 

    //~ State for Selected Product(s)
    const [products, setProducts] = useState<Product[]>([])
    
    // Add state to track theme changes
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light');

    //? Order Context | Products
    const orderContext = useContext(OrderContext)
    const { asignProducts } = orderContext

    //* Get Products by Seller (the current user)
    const { data, loading, error } = useQuery<GetProductsBySellerData>(GET_PRODUCTS)

    const productsBySeller = data?.getProductsBySeller || [];

    // Add theme change listener
    useEffect(() => {
        // Function to handle theme changes
        const handleThemeChange = () => {
            setCurrentTheme(localStorage.getItem('theme') || 'light');
        };

        // Check for theme changes periodically
        const themeCheckInterval = setInterval(handleThemeChange, 1);
        
        // Clean up interval when component unmounts
        return () => {
            clearInterval(themeCheckInterval);
        };
    }, []);

    useEffect(() => {
        asignProducts(products);
    }, [products, asignProducts]);

    // Handler for client selection
    const selectProducts = (selectedOption: MultiValue<Product>) => {
        setProducts([...selectedOption]);
    };

    if (loading) return <Loader />;

    if (error) {
        toast.error("Error loading client data");
        router.push("/home/orders");
        return null; // Added explicit return to handle this case
    }

    if(data) return (
        <div className="mt-5">
            <p>Asign your Products to the Order</p>
            <Select
                isMulti
                options={productsBySeller}
                onChange={selectProducts}
                getOptionValue={(option) => option.id ?? ""}
                getOptionLabel={(option) => `${option.name} $ ${option.priceWithDiscount} | ${option.stock} units left`}
                placeholder="Select the order products"
                noOptionsMessage={() => "No results found"}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: currentTheme === 'dark' ? '#333' : '#fff',
                        color: currentTheme === 'dark' ? '#fff' : '#333',
                        borderColor: state.isFocused 
                            ? (currentTheme === 'dark' ? '#4c9aff' : '#2684FF') 
                            : (currentTheme === 'dark' ? '#555' : '#ccc')
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: currentTheme === 'dark' ? '#333' : '#fff'
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused 
                            ? (currentTheme === 'dark' ? '#555' : '#f0f0f0') 
                            : (currentTheme === 'dark' ? '#333' : '#fff'),
                        color: currentTheme === 'dark' ? '#fff' : '#333'
                    }),
                    singleValue: (baseStyles) => ({
                        ...baseStyles,
                        color: currentTheme === 'dark' ? '#fff' : '#333'
                    }),
                    input: (baseStyles) => ({
                        ...baseStyles,
                        color: currentTheme === 'dark' ? '#fff' : '#333'
                    }),
                    placeholder: (baseStyles) => ({
                        ...baseStyles,
                        color: currentTheme === 'dark' ? '#aaa' : '#757575'
                    }),
                    multiValue: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: currentTheme === 'dark' ? '#555' : '#e2e8f0'
                    }),
                    multiValueLabel: (baseStyles) => ({
                        ...baseStyles,
                        color: currentTheme === 'dark' ? '#fff' : '#333'
                    }),
                    multiValueRemove: (baseStyles) => ({
                        ...baseStyles,
                        color: currentTheme === 'dark' ? '#fff' : '#333',
                        ':hover': {
                            backgroundColor: currentTheme === 'dark' ? '#777' : '#cbd5e0',
                            color: currentTheme === 'dark' ? '#fff' : '#333'
                        }
                    })
                }}
            />
        </div>
    )
}
